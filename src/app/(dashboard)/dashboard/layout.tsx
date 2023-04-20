import { Icons } from "@/components/Icons";
import { authOptions } from "@/lib/auth";
import { Link } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

const Layout = async ({ children }: LayoutProps) => {
    const session = await getServerSession(authOptions)
    
    // To protect sensitive data, should never be called but good to keep
    if (!session) notFound()

    return (
        <div className='w-full flex h-screen'>
            <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
                <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
                    <Icons.Logo className='h-8 w-auto test-indigo-600' />
                </Link>

                <div className='text-xs font-semibold leading-6 text-gray-400'>
                    Your Chats
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;