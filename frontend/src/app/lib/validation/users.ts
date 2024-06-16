'use server';

import { z } from "zod";
import { User } from "@/app/lib/definitions/users";
import { authenticateUser, createUser } from '../actions/users';

const FormSchema = z.object({
    email: z.string()
        .email({
            message: 'Invalid email address',
        }),
    password: z.string()
        .min(6, {
            message: 'Password must be at least 6 characters long'
        }),
});

export type State = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message: string,
    redirectUrl?: string,
};

export async function validateUserForm(
    prevState: State,
    formData: FormData
): Promise<State> {
    try {
        const userCredentials: Partial<User> = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const credentialsParser = FormSchema.safeParse(userCredentials);

        if (!credentialsParser.success) {
            return {
                errors: credentialsParser.error.flatten().fieldErrors,
                message: "Invalid fields.",
            };
        }

        const { email, password } = credentialsParser.data;
        const parsedCredentials: Partial<User> = {
            email: email,
            password: password,
        };

        const response = await authenticateUser(parsedCredentials);
        if (response && response.ok) {
            return {
                message: 'User authenticated successfully',
                redirectUrl: '/products',
            };
        } else {
            return { message: 'Authentication failed' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        } else {
            return {
                message: "An error occurred while authenticating the user.",
            };
        }
    }
}

export async function validateUserForm2(
    prevState: State,
    formData: FormData
): Promise<State> {
    try {
        const userCredentials: Partial<User> = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        const credentialsParser = FormSchema.safeParse(userCredentials);

        if (!credentialsParser.success) {
            return {
                errors: credentialsParser.error.flatten().fieldErrors,
                message: "Invalid fields.",
            };
        }

        const { email, password } = credentialsParser.data;
        const parsedCredentials: Partial<User> = {
            email: email,
            password: password,
        };

        const response = await createUser(parsedCredentials);
        if (response && response.ok) {
            return {
                message: 'User created successfully. Please login.',
                redirectUrl: '/',
            };
        } else {
            return { message: 'Signup failed' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                message: error.message,
            };
        } else {
            return {
                message: "An error occurred while creating the user.",
            };
        }
    }
}