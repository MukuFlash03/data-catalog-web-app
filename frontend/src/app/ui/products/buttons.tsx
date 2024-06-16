'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { removeProduct } from '@/app/lib/action';
import { FormEvent, useState } from 'react';

export function CreateProduct() {
    return (
        <Link
            href="/products/create"
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
            <span className="hidden md:block">Create Product</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateProduct({ _id }: { _id: string }) {
    return (
        <Link
            href={`/products/${_id}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            <PencilIcon className="w-5" />
        </Link>
    );
}

export function DeleteProduct({ _id }: { _id: string }) {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await removeProduct(_id);
        window.location.href = '/products';
    };

    const handleConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <main>

            <button
                className="rounded-md border p-2 hover:bg-gray-100"
                onClick={handleConfirmation}
            >
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg border-4 border-red-400">
                        <p className="mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-200 rounded-md mr-2"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <form onSubmit={handleSubmit}>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main >
    );
}
