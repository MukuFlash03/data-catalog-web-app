'use client';

import Link from 'next/link';
import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { FormEvent, ChangeEvent, useState } from 'react';
import { createProduct } from '@/app/lib/action';

export default function Form() {
    const [fields, setFields] = useState<string[]>([]);

    const handleFieldsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fieldsValue = event.target.value;
        const fieldsArray = fieldsValue.split(',').map((field: string) => field.trim());
        setFields(fieldsArray);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const productData = {
            id: Number(formData.get('id')),
            product_name: formData.get('name') as string,
            data_category: formData.get('data_category') as string,
            record_count: Number(formData.get('record_count')),
            fields: fields,
        };
        // const newProduct = await createProduct(productData);
        await createProduct(productData);
        window.location.href = '/products';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Enter Product ID
                    </label>
                    <div className="relative">
                        <input
                            id="id"
                            name="id"
                            type="string"
                            placeholder="Enter product id"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Enter Product Name
                    </label>
                    <div className="relative">
                        <input
                            id="name"
                            name="name"
                            type="string"
                            placeholder="Enter product name"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Enter Data Category
                    </label>
                    <div className="relative">
                        <input
                            id="data_category"
                            name="data_category"
                            type="string"
                            placeholder="Enter data category"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Enter Record Count
                    </label>
                    <div className="relative">
                        <input
                            id="record_count"
                            name="record_count"
                            type="string"
                            placeholder="Enter record count"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Enter Fields
                    </label>
                    <div className="relative">
                        <input
                            id="fields"
                            name="fields"
                            type="string"
                            placeholder="Enter fields (comma-separated)"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            onChange={handleFieldsChange}
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>


            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/products"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Create Product</Button>
            </div>
        </form>
    );
}
