"use server"

import { User } from "@/types/types";
import { api } from "./school";
import { cookies } from "next/headers";

export async function loginUser(data:{
    email:string;
    password:string;
}){
    try {
        const response = await api.post("/login", data);
        const{user,accessToken,refreshToken}=response.data.data;
        const userData = response.data.data
        await createServerSession(userData)
        return response.data.data as SessionData;
    } catch (error) {
        console.log(error)
    }
}

interface SessionData {
    user:User,
    accessToken:string,
    refreshToken:string
};

export async function createServerSession(
    data : SessionData
){
    try {
        const cookieStore = await cookies()
        cookieStore.set("user", JSON.stringify(data.user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour
        });

        cookieStore.set("accessToken", data.accessToken, {
             httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour
        });

         cookieStore.set("refreshToken", data.refreshToken, {
             httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60, // 1 hour
        });
        return {success:true};
    } catch (error) {
        console.error("session creation error", error);
        return {success:false, error: "invalid session data"}
    }
}

export async function logout(){
    try {
        const cookieStore = await cookies()

        cookieStore.delete("user");
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return {success:true};

    } catch (error) {
        console.error("logout error", error);
         return {success:false, error: "logout failed"}
    }
}

export async function getServerUser(){
    const cookieStore = await cookies()
    const userCookie = cookieStore.get("user");
    if(!userCookie) return null;
    try {
        const user = JSON.parse(userCookie.value);
return  user as User;
        

    } catch{
     
         return null;
    }
}

