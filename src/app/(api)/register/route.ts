import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
import prisma from "../../../../server/db";


export async function POST(req: NextRequest) {

    try {
        const { username, email, password } = await req.json();

        // console.log(username, email, password)

        if (!username || !password || !email) {
            throw new Error("All fields are required")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword);

        // check user present or not
        const userPreent = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (userPreent) {
            return Response.json({
                message: "user is already Signed Up . Please Login to continue"
            }, {
                status: 401
            })
        }

        console.log("creating user ")
        // insert user in the db
        const user = await prisma.user.create({
            data: {
                email: email,
                userName: username,
                password: hashedPassword,
                lastACtive: new Date(),
                Status: "Active",
                updatedAt: new Date()
            }
        })

        console.log("created user")
        if (!user) {
            throw new Error("user not created")
        }

        return Response.json({
            message: "User created successfully",
            user
        }, {
            status: 200
        })

    } catch (error) {
        return Response.json({
            success: false,
            message: error,
        }, {
            status: 500
        })
    }

}