import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const tokenRecord = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!tokenRecord) {
      return NextResponse.json({ valid: false, error: "Invalid token" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { email: tokenRecord.email },
    });

    if (!user) {
      return NextResponse.json({ valid: false, error: "Invalid user" }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      id: user.id,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}