import { NextRequest } from "next/server";
import prisma from "../../../../server/db";
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    try {

        const { username, password } = await req.json()

        if (!username || !password) {
            throw new Error("All fields are required");
        }

        // check if user prenset or not 
        const user = await prisma.user.findUnique({
            where: {
                email: username
            }
        })

        if (!user) {
            return Response.json({
                success: false,
                message: "User is not present , Please sign up"
            }, { status: 404 })
        }

        // compare the password if user is present

        const userPassword = user.password;
        const passwordMatched = await bcrypt.compare(password, userPassword)

        if (!passwordMatched) {
            return Response.json({
                success: false,
                message: "Password is incorrect"
            }, {
                status: 401
            })
        }

        return Response.json({
            message: "Logged in successfully",
            user: user,
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Error while logging in"
        }, {
            status: 500
        })
    }
}