"use server"

import axios from "axios";
import { api } from "./school";
import { ContactProps } from "@/components/frontend/contact-us";
import { ok } from "assert";
import { Contact, DepartmentCreateProps } from "@/types/types";

export async function createDepartment(data:DepartmentCreateProps){
    try {
        const response = await api.post('/departments',data);
        return response.data;
    }catch (error){
        if (axios.isAxiosError(error)){
            const message = error.response?.data.message||'failed to create contact';
            throw new Error(message);
        }
        throw error;
    }
}

export async function deleteDepartment(id:string){
    console.log("deleted", id);
    return{
        ok:true
    }
}
export async function getAllDepartments(){
    try {
        const response = await api.get('/departments',);
        const departments = response.data;
        return departments as DepartmentCreateProps[];
    } catch (error) {
        console.log(error)
    }
}