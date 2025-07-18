import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, lastName, firstName, middleName, role } = body;

    if (!email || !phone || !firstName || !lastName || !middleName || !role) {
      return NextResponse.json({success: false, message: 'Всі поля обовязкові' }, { status: 400 });
    }

    if (!Object.values(Role).includes(role as Role)) {
      return NextResponse.json({success: false, message: 'Такої ролі не існує' }, { status: 400 });
    }

    const existingEmailUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmailUser) {
      return NextResponse.json({
        success: false,
        errors: { email: 'Користувач з таким емейлом вже існує' }
      }, { status: 409 });
    }

    const existingPhoneUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingPhoneUser) {
      return NextResponse.json({
        success: false,
        errors: { phone: 'Користувач з таким телефоном вже існує' }
      }, { status: 409 }); 
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        lastName,
        firstName,
        middleName,
        role: role as Role, 
      },
    });

    const token = randomUUID();
    const tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); 

    await prisma.verificationToken.create({
      data: {
        token,
        email,
        expires: tokenExpires,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/set-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Створення пароля",
      html: `
        <h1>Вас вітає агрологістика.</h1>
        <p> Щоб завершити рейстрацію створіть пароль, перейдіть за посиланням нижче:</p>
        <p><a href="${resetLink}">Створити пароль</a></p>
        <p>Посилання дійсне протягом 24 годин.</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Користувач успішно створений', user: newUser }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Failed to create user', error: (error as Error).message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}