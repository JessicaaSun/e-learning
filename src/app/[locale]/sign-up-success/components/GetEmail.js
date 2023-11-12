'use client'
import React, {useState} from 'react';
import {BsFillCheckCircleFill} from "react-icons/bs";

function GetEmail() {
    const [email, setEmail] = useState("");
    return (
        <section className="max-w-screen-xl mx-auto px-5 xl:px-0">
        <div className="flex flex-col h-screen gap-y-2 items-center justify-center">
            <BsFillCheckCircleFill className={"text-8xl md:text-9xl text-app-primary"} />
            <h1 className="text-2xl capitalize font-bold tracking-tight text-app-primary text-center dark:text-blue-100">
                You successfully registered
            </h1>
            <p className="tracking-tight text-gray-500 text-center dark:text-blue-300 mx-72">
                Welcome to ISTADemy, A confirmation email has been sent to {email.email},
                please click on the confirmation link in the email to activate your account.
            </p>
        </div>
        </section>
    );
}

export default GetEmail;