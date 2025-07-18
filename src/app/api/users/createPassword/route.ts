import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password, token } = await request.json();

    if (!password || !token) {
      return NextResponse.json({ error: "Missing password or token" }, { status: 400 });
    }

    const verified = await fetch(`${process.env.NEXTAUTH_URL}/api/verify-token?token=${token}`);
    const tokenData = await verified.json();

    if (!tokenData.valid || !tokenData.id) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: tokenData.id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Set password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}