"use server"

import axios from "axios";
import { api } from "./school";
import { ContactProps } from "@/components/frontend/contact-us";
import { ok } from "assert";
import { Contact, Parent } from "@/types/types";
import { ParentProps } from "@/components/dashboard/forms/users/parent-form";
import { ManagementProps } from "@/components/dashboard/forms/users/management-form";

export async function createManagement(data:ManagementProps){
    try {
        const response = await api.post('/managements',data);
        return response.data;
    }catch (error){
        if (axios.isAxiosError(error)){
            const message = error.response?.data.message||'failed to create parents';
            throw new Error(message);
        }
        throw error;
    }
}

export async function deleteManagement(id:string){
    console.log("deleted", id);
    return{
        ok:true
    }
}
export async function getAllManagements(){
    try {
        const response = await api.get('/managements',);
        const parents = response.data;
        return parents as ManagementProps[];
    } catch (error) {
        console.log(error)
    }
}