import { Tag } from "./tag.model";
import { User } from "./user.model";

export class Note {
    id!: number;
    title!: string;
    content!: string;
    image?: string;
    code?: string;
    tags?: Tag[];
    user!: User;
}