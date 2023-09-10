import { CodeSnippet } from "./codesnippet.interface";
import { Codetag } from "./codetag.interface";

export interface Note {
    id?: number;
    title: string;
    description: string;
    // image?: string;
    creationDate?: Date;
    codes: CodeSnippet[];
    codetags: Codetag[];
}