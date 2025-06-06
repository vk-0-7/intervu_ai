import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json(
    { success: true, data: "Hello, World!" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();
  try {
    const { text } = await generateText({
      model: google("models/gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.also,try to create that are most of the times unique and not repetitive . also focus on the most important questions that are asked in interviews for this role.please check the role as well as the level and techstack before generating the questions.also test some deep understanding of user about the role and techstack.dont ask only basic questions like about facing challenges or what is your strength or weakness etc. focus on the role and techstack and level of the user.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const intervue = {
      userId: userid,
      questions: JSON.parse(text),
      role: role,
      level,
      techstack: techstack.split(","),
      finalized: true,
      type,
    };

    await db.collection("interview").add(intervue);

    return Response.json({ success: true, data: intervue }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
