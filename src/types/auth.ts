export interface SignIn {
    username: string | undefined
    password: string | undefined
    loading?: boolean
}

export interface SignUp {
    username: string | undefined
    password: string | undefined
    email: string | undefined
    loading?: boolean
}