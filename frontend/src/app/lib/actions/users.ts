import { User } from '@/app/lib/definitions/users';

export async function createUser(
    userCredentials: Partial<User>,
) {
    try {
        const url = 'http://localhost:8080/api/auth/signup';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        else {
            console.log(responseData.message);
            return response;
        }
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function authenticateUser(
    userCredentials: Partial<User>
) {
    try {
        const url = 'http://localhost:8080/api/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCredentials),
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        else {
            console.log(responseData.message);
            return response;
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw error;
    }
}