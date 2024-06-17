import { UUID } from "crypto";

export type User = {
    _id: UUID,
    email: string,
    password: string,
};