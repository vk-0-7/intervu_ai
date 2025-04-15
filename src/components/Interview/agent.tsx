"use client";

import { vapi } from "@/lib/vapi.sdk";
import { Message } from "ai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  username: string;
  userid: string;
  type: string;
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

const Agent = ({ username, userid, type }: Props) => {
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

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.push("/");
  }, [messages, callStatus, userid, type]);

  const handleCall = async () => {
    try {
      const call = await vapi.start(
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID as string,
        { variableValues: { userid: userid, username: username } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };
  const lastMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = CallStatus.INACTIVE || CallStatus.FINISHED;

  return (
    <>
      <h1 className="mb-5 text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">
        Intervu
      </h1>
      <h2 className="mb-12 text-2xl font-medium text-gray-300">
        Interview Generation
      </h2>

      {/* Cards */}
      <div className="flex gap-8 mb-12 w-[50%] ">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center  shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl w-[50%] aspect-[3/2]">
          <div className="mb-4">
            <img
              src="/ai-interviewer-icon.png"
              alt="AI Interviewer"
              className="w-28 h-28 rounded-full mx-auto shadow-md"
            />
          </div>
          <p className="text-lg font-semibold text-gray-200">AI Interviewer</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl w-[50%] aspect-[3/2]">
          <div className="mb-4">
            <img
              src="/user-icon.png"
              alt="You"
              className="w-28 h-28 rounded-full mx-auto shadow-md"
            />
          </div>
          <p className="text-lg font-semibold text-gray-200">You</p>
        </div>
      </div>

      {/* Footer */}
      <p className="mb-6 text-gray-400 italic text-center">
        My name is John Doe, nice to meet you!
      </p>
      {callStatus !== CallStatus.ACTIVE ? (
        <button
          className="bg-gradient-to-r from-green-400 to-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
          onClick={handleCall}
        >
          {isCallInactiveOrFinished ? "Call" : "..."}
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-red-400 to-white text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform transition-transform hover:scale-105"
          onClick={() => handleDisconnect()}
        >
          End
        </button>
      )}
    </>
  );
};

export default Agent;
