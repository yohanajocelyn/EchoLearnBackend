import { User } from "@prisma/client";

export interface RegisterUserRequest{
    email: string;
    username: string;
    password: string;
    profilePicture: string;
}

export interface UserResponse {
    token?: string;
    username: string;
}

export function toUserResponse(user: User): UserResponse {
    return {
        token: user.token ?? "",
        username: user.username
    }
}

export interface LoginUserRequest {
    email: string;
    password: string;
}


