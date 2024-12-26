export interface RegisterUserRequest {
    username: string
    email: string
    password: string
}

export interface UserResponse {
    token?: string
    username: string
}

export interface LoginUserRequest {
    email: string
    password: string
}
