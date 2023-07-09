import { CodeSnippet } from "./codesnippet.model";
import { Codetag } from "./codetag.model";
import { User } from "./user.model";

export class Note {
    id!: number;
    title!: string;
    description!: string;
    // image?: string;
    codes?: CodeSnippet[];
    codetags?: Codetag[];
}