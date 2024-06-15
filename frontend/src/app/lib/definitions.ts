import { UUID } from "crypto";

export type Product = {
    [key: string]: any;
    [index: number]: any;
    _id: UUID
    id: number;
    product_name: string;
    data_category: string;
    record_count: number;
    fields: string[];
};