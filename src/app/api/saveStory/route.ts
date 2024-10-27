import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"; // Importe NextRequest
import uuid4 from 'uuid4';

export async function POST(req: NextRequest) { // Altere para NextRequest
    const { userId } = getAuth(req);

    const { story, subject, type, ageGroup, imageStyle } = await req.json();

    const recordId = uuid4();
    const storyData = await db.storyData.create({
        data: {
            storyId: recordId,
            storySubject: subject,
            storyType: type,
            ageGroup: ageGroup,
            imageStyle: imageStyle,
            output: JSON.parse(story),
            createdBy: userId?.toString() || ""
        }
    });

    return NextResponse.json({ status: "Good", storyData });
}
