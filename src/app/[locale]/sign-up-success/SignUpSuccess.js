"use client";
import React from "react";
import GetEmail from "./components/GetEmail";
import { useRouter } from "next/navigation";
import { useCheckVerifyMutation } from "@/store/features/auth/authApiSlice";
// import NotFound from "@/app/[...not-found]/page";
// import {setEmail} from "@/store/feature/personalInfo/personalInfoSlice";
import { useDispatch } from "react-redux";
import Verified from "./components/Verified";
import { useEffect } from "react";
import {
  selectEmail,
  selectCodeVerify,
} from "@/store/features/anonymous/anonymousSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

function SignUpSuccess() {
  const email = useSelector(selectEmail);
  const verifyCode = useSelector(selectCodeVerify);
  const dispatch = useDispatch();
  const router = useRouter();
/* The code you provided is a React component called `SignUpSuccess`. */

  // console.log("email & verifiedCode", email, verifyCode)
  const [verifyEmail, { data, error }] = useCheckVerifyMutation();

  useEffect(() => {
    verifyEmail({ email: email, verifiedCode: verifyCode });
  }, [email, verifyCode, verifyEmail]);

  let content = null;

  if (data) {
    content = <Verified />;
    setTimeout(() => {
      setLoadingSubmit(false);
      router.push("/auth/login");
    }, 5000);
  } else {
    content = <GetEmail />;
  }

  return  <Verified />;
}

export default SignUpSuccess;
