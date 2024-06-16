'use client';

import Logo from "../../ui/logo";
import { Button } from "@/app/ui/button";
import { ViewProducts } from "@/app/ui/products/buttons";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:mt-32">
                <div className="flex h-16 w-full items-end rounded-lg bg-blue-500 p-3 md:h-20">
                    <div className="w-32 text-white md:w-36">
                        <Logo />
                    </div>
                </div>
                <ViewProducts text="Go Back to Products" />
                <LogoutButton />
            </div>
        </main>
    )
}

function LogoutButton() {
    const router = useRouter();

    function handleLogout() {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <Button className="mt-4 w-full" onClick={handleLogout}>
            Log Out <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}

