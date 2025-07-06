import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {User} from "@/types/types";
import { logout } from '@/actions/auth';

export interface SessionData{
    user:User;
    accessToken:string;
    refreshToken:string;
}

interface userSessionStore{
    user: User|null;
    setUser: (userdata:User) =>Promise<void>;
    clearSession:() =>Promise<void>;
}

export const useUserSession = create<userSessionStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: async (userData) => {
                try {


                    set({ user: userData });

                } catch (error) {
                    console.error("session creation error")
                }
            },
            clearSession: async ()=> {
                try {
                    const result = await logout();
                    if (result.success){
                        set({user:null});
                    }else{
                        throw new Error("logout failed");
                    }
                } catch (error) {
                    console.error("logout error",error);
                }
            },
            
        }),
        {
            name:"user-session",
            partialize:(state) =>({user:state.user})
        }
    )
);
