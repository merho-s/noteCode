import { Codetag } from "./codetag.model";
import { User } from "./user.model";

export class Note {
    id!: number;
    title!: string;
    description!: string;
    image?: string;
    code?: string;
    tags?: Codetag[];
    user!: User;
}