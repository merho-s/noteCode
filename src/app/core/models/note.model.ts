import { Tag } from "./tag.model";

export class Note {
    id!: number;
    title!: string;
    content!: string;
    image?: string;
    code?: string;
    tags?: Tag[];
    userId!: number;
}