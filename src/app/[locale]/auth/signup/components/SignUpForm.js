"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  useRegisterMutation,
  useCheckVerifyMutation,
  useVerifyMutation,
} from "@/store/features/auth/authApiSlice";
import { useState } from "react";
import * as Yup from "yup";
import Loading from "@/app/[locale]/loading";
import { toast } from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import { useGetAllUsersQuery } from "@/store/features/user/userApiSlice";
import { BASE_URL } from "@/lib/baseURL";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeOff } from "heroicons-react";

const SignUpForm = () => {
  const t = useTranslations();

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
  const dispatch = useDispatch();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [verifyEmail, { data, error }] = useCheckVerifyMutation();
  const [verify, { isLoading: verifying }] = useVerifyMutation();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // eye toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("The email is required."),
    password: Yup.string()
      .required("The password is required.")
      .matches(
        passwordRegex,
        "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase."
      ),
    confirmedPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm password is required.")
      .matches(
        passwordRegex,
        "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
      ),
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const userExist = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/by-email?email=${email}`);
      const result = await userExist.json();
      if (result?.data?.isVerified === true) {
        clearInterval(interval);
        setLoadingSubmit(false);
        router.push("/sign-up-success");
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [email]);


  let sentCodeText = "";
  return (
    <>
      <ToastConfig />
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          confirmedPassword: "",
          roleIds: [2],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoadingSubmit(true);
          try {
            const { data } = await register(values).unwrap();
            // console.log("data", data);
            if (data) {
              try {
                const { data: dataVerify } = await verify(data);
                // console.log("dataVerify:", dataVerify);
                sentCodeText = "បានផ្ញើសារទៅអ៊ីម៉ែល";
                setEmail(dataVerify?.data?.email);
                toast.success(
                  "A confirmation email has been sent to you, please check " +
                  data
                );
              } catch (e) {
                // console.log("dataVerify failed", e);
              }
            }
          } catch (error) {
            const messages = error?.data.errors.map(
              (el) => el.name + ": " + el.message
            );
            toast.error(messages.join("\n"));
            setLoadingSubmit(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800"
              >
                {t("Name")}
              </label>

              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Full name"
                className="block w-full px-4 py-2 mt-2  border-none shadow bg-white rounded-3xl"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                {t("Email")}
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                className="block w-full shadow px-4 py-2 mt-2 border-none bg-white rounded-3xl  "
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                {t("Password")}
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="block w-full px-4 py-2 mt-2  border-none shadow bg-white rounded-3xl"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-700 hover:text-gray-400 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmedPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                {t("Confirm Password")}
              </label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmedPassword"
                  id="confirmedPassword"
                  placeholder="Confirm password"
                  className="block w-full px-4 py-2 mt-2  border-none shadow bg-white rounded-3xl"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-700 hover:text-gray-400 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <ErrorMessage
                name="confirmedPassword"
                component="p"
                className="mt-2 text-sm text-red-600 dark:text-red-500"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 primaryButton tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                {isLoading || verifying ? (
                  <div className="flex justify-center">
                    <p className="mr-2">{t("Signing Up")}</p>
                    <img
                      className="w-6 h-6 animate-spin"
                      src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                      alt="Loading icon"
                    ></img>
                  </div>
                ) : sentCodeText == "" ? (
                  t("Sign Up")
                ) : (
                  { sentCodeText }
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
