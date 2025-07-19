"use server"

import axios from "axios";
import { api } from "./school";

import { ManagementProps } from "@/components/dashboard/forms/users/management-form";
import { User } from "@/types/types";

export async function createUser(data:User){
    try {
        const response = await api.post('/register',data);
        return response.data;
    }catch (error){
        if (axios.isAxiosError(error)){
            const message = error.response?.data.message||'failed to create user';
            throw new Error(message);
        }
        throw error;
    }
}

