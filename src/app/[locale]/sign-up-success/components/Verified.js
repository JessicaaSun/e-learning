'use client'
import React, { useEffect } from 'react';
import { Button } from 'flowbite-react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const Verified = () => {
    const router = useRouter();
    return (
        <section className="max-w-screen-xl max-h-screen min-h-screen mx-auto px-5 xl:px-0">
            <div className="flex flex-col h-screen gap-y-2 items-center justify-center">
                <BsFillCheckCircleFill className="text-8xl text-blue-700" />
                <h1 className="text-2xl font-bold tracking-tight text-blue-700 text-center dark:text-blue-100 capitalize">
                    You&apos;ve been verified!
                </h1>
              
                <Button className="w-20 my-4" pill onClick={() => router.push('/auth/login')}>
                    Next
                </Button>
            </div>
        </section>
    );
};

export default Verified;
