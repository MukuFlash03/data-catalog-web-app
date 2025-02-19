// - This file contains the Page component for the signup page, which includes a logo and a signup form.

import Logo from "../../ui/logo";
import SignupForm from "../../ui/signup-form";

export default function Page() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:mt-32">
                <div className="flex h-16 w-full items-end rounded-lg bg-blue-500 p-3 md:h-20">
                    <div className="w-32 text-white md:w-36">
                        <Logo />
                    </div>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}