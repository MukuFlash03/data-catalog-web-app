// This file contains a form component for creating products.

'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { validateProductForm } from '@/app/lib/validation/products';
import { State } from '@/app/lib/validation/products';

export default function Form() {
  const initialState: State = {
    errors: {},
    message: '',
  };

  // Handles form submission and calls function to validate data before insertion
  const [state, dispatch] = useFormState(validateProductForm, initialState);

  // Redirect to products home page on successful product creation
  useEffect(() => {
    if (state.redirectUrl) {
      window.location.href = state.redirectUrl;
    }
  }, [state.redirectUrl]);

  return (
    <form action={dispatch} className="space-y-3">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter Product ID
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="id"
                name="id"
                type="string"
                placeholder="Enter product id"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='id-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='id-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.id &&
              state.errors?.id.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter Product Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter product name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='name-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='name-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.product_name &&
              state.errors?.product_name.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter Data Category
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="data_category"
                name="data_category"
                type="string"
                placeholder="Enter data category"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='data_category-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='data_category-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.data_category &&
              state.errors?.data_category.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter Record Count
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="record_count"
                name="record_count"
                type="string"
                placeholder="Enter record count"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='record_count-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='record_count-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.record_count &&
              state.errors?.record_count.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Enter Fields
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fields"
                name="fields"
                type="string"
                placeholder="Enter fields (comma-separated)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='fields-error'
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id='fields-error' aria-live='polite' aria-atomic='true'>
            {
              state.errors?.fields &&
              state.errors?.fields.map((error: string) => (
                <p className='mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <div aria-live='polite' aria-atomic='true'>
          {
            state.message ?
              (
                <p className='mt-2 text-sm text-red-500'>
                  {state.message}
                </p>
              ) :
              null
          }
        </div>
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
