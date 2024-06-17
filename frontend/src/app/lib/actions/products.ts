import { Product } from '@/app/lib/definitions/products';

export async function handleProductSearch(
    query: string,
) {
    try {
        // const url = query ? `http://localhost:8080/api/products?query=${query}` : 'http://localhost:8080/api/products';
        const url = query ?
            `https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products?query=${query}`
            : 'https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch any products');
        }
        const fetchedProducts: Product[] = await response.json();
        return fetchedProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export async function testProduct() {
    return {
        name: "test",
    };
}

export async function getProductById(
    name: string,
) {
    try {
        // const url = `http://localhost:8080/api/products/${name}`;
        const url = `https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products/${name}`;
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
        const fetchedProduct: Product | null = await response.json();
        return fetchedProduct;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

export async function createProduct(
    productData: Partial<Product>,
) {
    try {
        // const url = 'http://localhost:8080/api/products';
        const url = 'https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        // const url = `http://localhost:8080/api/products/${_id}`;
        const url = `https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products/${_id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
        // const url = `http://localhost:8080/api/products/${_id}`;
        const url = `https://data-catalog-web-app-5161a8376316.herokuapp.com/api/products/${_id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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