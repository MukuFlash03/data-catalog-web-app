// This file defines a React component for displaying a page of products with search functionality.

import ProductsTable from "@/app/ui/products/table";
import Search from "@/app/ui/search";
import { CreateProduct } from "@/app/ui/products/buttons";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string,
  };
}) {

  const query = searchParams?.query || '';

  return (
    <div className="w-full pt-16">
      <div className="flex w-full items-center justify-between">
        {/* <h1 className="text-2xl">Products</h1> */}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateProduct />
      </div>
      <ProductsTable query={query} />
    </div>
  );
}