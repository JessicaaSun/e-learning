"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "../../../../../public/assets/social/google.png";
import  {signIn, signOut, useSession} from "next-auth/react"
import { useTranslations } from "next-intl";
import FormLogin from "./components/LoginForm";
import SignUp from "../../admin/auth/sign-in/page";
import { useRouter } from "next/navigation";
import { logout } from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

const LoginPage = () => {
  const t = useTranslations();

  // const { data: session } = useSession()
  // const router = useRouter();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const session = await getSession();
  //       console.log("session", session);
  //       if (session !== null) {
  //         localStorage.setItem("hasUserNotLogging", 0);
  //         router.push("/student/dashboard");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [session, router]);

  // const handleGoogle = () => {
  //   signIn("google");
  // };

  // const handleGithub = () => {
  //   signIn("github");
  // };


  // if (session && session.user) {
  //   return (
  //     <div className="flex gap-4 ml-auto">
  //       <p className="text-sky-600">{session.user.name}</p>
  //       <button onClick={() => signOut()} className="text-red-600">
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="relative flex bg-[#fafafa] flex-col items-center max-h-screen justify-center min-h-screen overflow-hidden">
        <div className="md:w-1/2 xl:px-24 lg:px-10 px-6 max-sm:w-full sm:w-[80%]">
          <h1 className="text-3xl font-bold text-center ">{t("Login")}</h1>
          <FormLogin />
          {/* <div className="my-6 relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5  bg-[#fafafa] ">{t("OR")}</div>
          </div>
          <div className="flex mt-4 flex-col gap-x-2">
            <button
              type="button"
              onClick={handleGoogle}
              className="flex  bg-white items-center justify-center rounded-3xl w-full p-2 border  border-none shadow focus:ring-2  focus:ring-violet-600"
            >
              <Image
                src={googleIcon}
                alt="google"
                width={25}
                height={25}
              ></Image>

              <p className="font-medium ps-3">{t("Continue with Google")}</p>
            </button>
            <button 
            onClick={handleGithub}
            className="mt-3 bg-white flex items-center justify-center w-full p-2 border  border-none shadow rounded-3xl focus:ring-2 f focus:ring-violet-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p className="font-medium ps-3">{t("Continue with GitHub")}</p>
            </button>
          </div> */}

          <p className="mt-6 text-sm text-center ">
            {t("New ISTADemy Leaner?")}{" "}
            <Link
              href="/auth/signup"x
              className="font-medium text-app-primary hover:underline"
            >
              {t("Sign Up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
