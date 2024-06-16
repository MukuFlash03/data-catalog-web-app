import { Product } from '@/app/lib/definitions/products';

export async function handleProductSearch(query: string) {
    try {
        const url = query ? `http://localhost:8080/api/products?query=${query}` : 'http://localhost:8080/api/products';
        // console.log("Table:", url);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const fetchedProducts: Product[] = await response.json();
        return fetchedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export async function getProductById(_id: string) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

export async function createProduct(productData: Partial<Product>) {
    try {
        const url = 'http://localhost:8080/api/products';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        // const createdProduct: Product = await response.json();
        await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

export async function updateProduct(productData: Partial<Product>, _id: string) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        // const updatedProduct: Product = await response.json();
        await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

export async function removeProduct(_id: string) {
    try {
        const url = `http://localhost:8080/api/products/${_id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }

        await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
    }
}