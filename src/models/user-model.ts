import { Attempt, User } from "@prisma/client";

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
  token: string;
  totalScore: number;
}

export interface LeaderboardResponse {
  id: number;
  username: string;
  totalScore: number;
  profilePicture: string;
}

export function toLeaderboardResponse(user: User): LeaderboardResponse {
  return {
    id: user.id,
    username: user.username,
    totalScore: user.totalScore,
    profilePicture: user.profilePicture ?? ""
  };
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

export function toGetUserResponse(user: (User & {attempts: Attempt[]})): GetUserResponse {

  const totalScore = user.attempts.reduce((acc, attempt) => acc + attempt.score, 0);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture ?? "",
    token: user.token ?? "",
    totalScore: totalScore,
  };
}

export interface UpdateUserRequest{
  id: number,
  username: string,
  email: string,
  profilePicture: string,
  password: string
}
