// This file contains validation logic for product forms using Zod schema.

'use server';

import { z } from "zod";
import { Product } from "@/app/lib/definitions/products";
import { createProduct, updateProduct } from '../actions/products';

const FormSchema = z.object({
    id: z.number({
        message: 'Must be a numeric value',
    })
        .min(1, {
            message: "Please enter an ID."
        }),
    product_name: z.string()
        .min(1, {
            message: "Please enter an Product Name."
        }),
    data_category: z.string()
        .min(1, {
            message: "Please enter a Data Category."
        }),
    record_count: z.number({
        message: 'Must be a numeric value'
    })
        .min(1, {
            message: "Please enter a Record Count."
        }),
    fields: z.array(z.string())
        .min(1, {
            message: "Please enter at least one field."
        }),
});

export type State = {
    errors?: {
        id?: string[];
        product_name?: string[];
        data_category?: string[];
        record_count?: string[];
        fields?: string[];
    };
    message: string,
    redirectUrl?: string,
};

// Validation function for Product create form before creating product
export async function validateProductForm(
    prevState: State,
    formData: FormData,
): Promise<State> {
    try {
        // Extract and parse form data for product creation
        const fieldsValue = formData.get("fields") as string | null;
        const fieldsArray = fieldsValue ? fieldsValue.split(",").map((field: string) => field.trim()) : [];

        const productData: Partial<Product> = {
            id: Number(formData.get('id')),
            product_name: formData.get('name') as string,
            data_category: formData.get('data_category') as string,
            record_count: Number(formData.get('record_count')),
            fields: fieldsArray,
        };

        const productDataParser = FormSchema.safeParse(productData);

        if (!productDataParser.success) {
            return {
                errors: productDataParser.error.flatten().fieldErrors,
                message: "Invalid fields.",
            };
        }

        const { id, product_name, data_category, record_count, fields } = productDataParser.data;
        const parsedProductData: Partial<Product> = {
            id: id,
            product_name: product_name,
            data_category: data_category,
            record_count: record_count,
            fields: fields,
        };
        const response = await createProduct(parsedProductData);
        if (response && response.ok) {
            return {
                message: 'Product created successfully',
                redirectUrl: '/products',
            };
        } else {
            return { message: 'Product creation failed' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        } else {
            return {
                message: "An error occurred while creating the product.",
            };
        }
    }
}

// Validation function for Product edit form before updating product
export async function validateProductForm2(
    _id: string,
    prevState: State,
    formData: FormData,
): Promise<State> {
    try {
        // Parse and validate the product data
        const fieldsValue = formData.get("fields") as string | null;
        const fieldsArray = fieldsValue ? fieldsValue.split(",").map((field: string) => field.trim()) : [];

        const productData: Partial<Product> = {
            id: Number(formData.get('id')),
            product_name: formData.get('name') as string,
            data_category: formData.get('data_category') as string,
            record_count: Number(formData.get('record_count')),
            fields: fieldsArray,
        };

        const productDataParser = FormSchema.safeParse(productData);

        if (!productDataParser.success) {
            return {
                errors: productDataParser.error.flatten().fieldErrors,
                message: "Invalid fields.",
            };
        }

        const { id, product_name, data_category, record_count, fields } = productDataParser.data;
        const parsedProductData: Partial<Product> = {
            id: id,
            product_name: product_name,
            data_category: data_category,
            record_count: record_count,
            fields: fields,
        };
        const response = await updateProduct(parsedProductData, _id);
        if (response && response.ok) {
            return {
                message: 'Product updated successfully',
                redirectUrl: '/products',
            };
        } else {
            return { message: 'Product update failed' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        } else {
            return {
                message: "An error occurred while updating the product.",
            };
        }
    }
}