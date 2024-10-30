import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from 'uuid4';

export async function POST(req: NextRequest) {
    const { userId } = getAuth(req);
    const { story, subject, type, ageGroup, imageStyle, imageUrl } = await req.json();
    console.log(imageUrl);

    // Verifique se story é válido antes de fazer o parse
    let storyOutput;
    if (story && typeof story === 'string') {
        try {
            storyOutput = JSON.parse(story);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ status: "Error", message: "Invalid JSON format in story" }, { status: 400 });
        }
    } else {
        return NextResponse.json({ status: "Error", message: "Story is missing or not a valid string" }, { status: 400 });
    }

    const recordId = uuid4();
    const storyData = await db.storyData.create({
        data: {
            storyId: recordId,
            storySubject: subject,
            storyType: type,
            ageGroup: ageGroup,
            imageStyle: imageStyle,
            output: storyOutput,
            createdBy: userId?.toString() || "",
            coverImage: imageUrl
        }
    });

    return NextResponse.json({ status: "Good", storyData });
}
