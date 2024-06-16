'use client';

import { useState, useEffect } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { Product } from '@/app/lib/definitions/products';
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import { handleProductSearch } from '@/app/lib/actions/products';

export default function ProductsTable({
  query,
}: {
  query: string;
}) {
  noStore();

  // // console.log("Table:", query);
  // const products = await handleProductSearch(query);
  // // console.log(products);

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await handleProductSearch(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [query]);

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.id}</p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>{product.product_name}</p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>{product.data_category}</p>
                    </div>
                    <div>
                      <p className="text-xl font-medium">{product.record_count}</p>
                    </div>
                    <div>
                      <p>{product.fields}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateProduct _id={product._id} />
                      <DeleteProduct _id={product._id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Record Count
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fields
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{product.product_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.data_category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.record_count}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.fields.map((field, index) => (
                      <p key={index}>{field}</p>
                    ))}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct _id={product._id} />
                      <DeleteProduct _id={product._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
