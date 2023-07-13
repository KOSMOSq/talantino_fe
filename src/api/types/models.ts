import { Role } from "./authData";

export interface LoggedUserData {
    avatar: string;
    id: number;
    name: string;
    surname: string;
    token: string;
}

export interface AuthMeData {
    avatar: string;
    balance: number;
    description: string | null;
    email: string;
    experience: number;
    id: number;
    kind: string;
    links: string[];
    location: string | null;
    name: string;
    nextId: number | null;
    prevId: number | null;
    role: Role;
    skills: string[]; //create interface for this
    surname: string;
}
