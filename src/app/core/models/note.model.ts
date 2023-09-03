import { CodeSnippet } from "./codesnippet.model";

export interface Note {
    id: number;
    title: string;
    description: string;
    // image?: string;
    codes: CodeSnippet[];
    codetags: string[];
}