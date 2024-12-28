import { User } from "@prisma/client";

export interface RegisterUserRequest {
  email: string;
  username: string;
  password: string;
  profilePicture: string;
}

export interface UserResponse {
  token?: string;
  username: string;
}

export interface GetUserResponse {
  id: number;
  username: string;
  email: string;
  profilePicture: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    token: user.token ?? "",
    username: user.username,
  };
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export function toGetUserResponse(user: User): GetUserResponse {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture ?? "",
  };

}
