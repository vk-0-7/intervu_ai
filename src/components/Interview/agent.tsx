"use client";

import { updateUserById } from "@/lib/actions/auth.action";
import { createFeedback } from "@/lib/actions/interview.action";
import { interviewer } from "@/lib/constants";
import { vapi } from "@/lib/vapi.sdk";
import { Message } from "ai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  username: string;
  userid: string;
  credits?: number;
  type: string;
  interviewid?: string;
  questions?: string[];
};

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

type SavedMessages = {
  role: "user" | "assistant" | "system";
  content: string;
}[];

const Agent = ({
  username,
  userid,
  credits,
  type,
  interviewid,
  questions,
}: Props) => {
  const [isSpeaking, setisSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessages>([]);
  const router = useRouter();

  useEffect(() => {
    const onCallstart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: {
      type: string;
      transcriptType?: string;
      role: "user" | "assistant" | "system";
      transcript?: string;
    }) => {
      if (
        message?.type === "transcript" &&
        message?.transcriptType === "final"
      ) {
        setMessages((prev) => [
          ...prev,
          { role: message.role, content: message.transcript },
        ]);
      }
    };

    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);
    const onError = (e: Error) => {
      console.error("Error: ", e);
    };

    vapi.on("call-start", onCallstart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallstart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const updateUser = async () => {
    await updateUserById({ userId: userid, data: { credits: credits - 1 } });
  };

  useEffect(() => {
    
    if (type == "generate") {
      if (callStatus === CallStatus.FINISHED) router.push("/");
    } else {
      if (callStatus === CallStatus.FINISHED) {
        createFeedback({
          interviewId: interviewid as string,
          userId: userid,
          transcript: messages,
        });
        router.push(`/interview/${interviewid}/feedback`);
      }
      if (callStatus == CallStatus.ACTIVE) {
        updateUser();
      }
    }
  }, [messages, callStatus, userid, type]);

  const handleCall = async () => {
    if (type == "generate") {
      try {
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID as string, {
          variableValues: { userid: userid, username: username },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      let formattedQuestion = "";
      formattedQuestion = questions
        ?.map((question: string) => `- ${question}`)
        .join("\n");

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestion,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);

    vapi.stop();
  };
  const lastMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = CallStatus.INACTIVE || CallStatus.FINISHED;

  // console.log(messages);

  return (
    <>
      <h1 className="mb-5 text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
        {type == "interview" ? "" : "Intervu"}
      </h1>
      <h2 className="mb-12 text-2xl font-medium text-gray-300">
        {type == "interview" ? "" : "Interview Generation"}
      </h2>

      {/* Cards */}
      <div className="flex gap-8 mb-12 w-[50%] justify-center items-center">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center  shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl w-[50%] aspect-[3/2] flex flex-col justify-center items-center">
          <div className="z-10 flex items-center justify-center blue-gradient rounded-full size-[120px] relative ">
            <img
              src="/interviewer.png"
              alt="AI Interviewer"
              className={`w-28 h-28 rounded-full mx-auto shadow-md `}
            />
            {isSpeaking && (
              <span className="absolute inline-flex size-5/6 animate-ping rounded-full bg-white opacity-75"></span>
            )}
          </div>
          <p className="text-lg font-semibold text-gray-200">AI Interviewer</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl w-[50%] aspect-[3/2] flex flex-col justify-center items-center">
          <div className="mb-4">
            <img
              src="/user.png"
              alt="You"
              className="w-28 h-28 rounded-full mx-auto shadow-md"
            />
          </div>
          <p className="text-lg font-semibold text-gray-200">You</p>
        </div>
      </div>

      {/* Footer */}
      <p className="mb-6 text-gray-400 italic text-center">{lastMessage}</p>
      {callStatus !== CallStatus.ACTIVE ? (
        <button
          className="bg-gradient-to-r from-green-400 to-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
          onClick={handleCall}
        >
          {isCallInactiveOrFinished ? "Call" : "..."}
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-red-400 to-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
          onClick={() => handleDisconnect()}
        >
          End
        </button>
      )}
    </>
  );
};

export default Agent;
