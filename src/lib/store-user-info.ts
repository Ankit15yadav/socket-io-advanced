import { User } from "@/types/user";

export async function StoreUserLocalInfo(user: User) {

    if (typeof window !== 'undefined') {

        localStorage.setItem("user-info", JSON.stringify(user));

    }
}

export async function getStoredUser(): Promise<User | null> {
    const userinfo = localStorage.getItem("user-info");
    if (userinfo) {
        return JSON.parse(userinfo) as User;
    }

    return null
}