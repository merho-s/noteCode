import { CodeSnippet } from "./codesnippet.model";
import { Codetag } from "./codetag.model";
import { IUser } from "./user.interface";

export class Note {
    id!: number;
    title!: string;
    description!: string;
    // image?: string;
    codes?: CodeSnippet[];
    codetags?: Codetag[];
}