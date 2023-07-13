export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    name: string;
    surname: string;
    password: string;
    kind?: string;
}

export type Role = "TALENT" | "SPONSOR" | "ADMIN";
export type ConfirmResponse = { token: string };
