'use client';
import { Product } from '@/app/lib/definitions/products';

export async function handleProductSearch(
    query: string,
) {
    let token: string | null = '';
    try {
        const url = query ? `http://localhost:8080/api/products?query=${query}` : 'http://localhost:8080/api/products';
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
            console.log("Token before response in if window: ", token);
        } else {
            // throw new Error('LocalStorage is not available');
            console.log("LocalStorage is not available");
        }
        console.log("Token before response in handleSearch: ", token);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            console.log("L: Token after response in if in handleSearch: ", token);
            console.error("E: Token after response in if in handleSearch: ", token);
            throw new Error('Failed to fetch any products');
        }
        const fetchedProducts: Product[] = await response.json();
        return fetchedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function getProductById(
    _id: string,
) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        const fetchedProduct: Product | undefined = await response.json();
        return fetchedProduct;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

export async function createProduct(
    productData: Partial<Product>,
) {
    try {
        const url = 'http://localhost:8080/api/products';
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
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
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function updateProduct(
    productData: Partial<Product>,
    _id: string,
) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(productData),
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
        console.error('Error updating product:', error);
        throw error;
    }
}

export async function removeProduct(_id: string) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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
        console.error('Error updating product:', error);
        throw error;
    }
}