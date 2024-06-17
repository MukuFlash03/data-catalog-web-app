// Define data types for the User object

import { UUID } from "crypto";

export type User = {
    _id: UUID,
    email: string,
    password: string,
};