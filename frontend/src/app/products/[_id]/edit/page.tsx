import Form from "@/app/ui/products/edit-form";
import { notFound } from "next/navigation";
import { getProductById } from "@/app/lib/action";
import { Product } from "@/app/lib/definitions";

export default async function Page({ params }: { params: { _id: string } }) {
    const _id = params._id;
    const product = await getProductById(_id);
    if (!product) {
        notFound();
    }

    return (
        <main>
            <h1>Edit Product</h1>
            <Form product={product[0]} />
        </main>
    )
}