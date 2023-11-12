"use client";
import { Formik, Form, Field, ErrorMessage, setIn } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Loading from "@/app/[locale]/loading";
import { toast } from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import { useCreateRequestSendMailMutation } from "@/store/features/user/userApiSlice";
import { EyeOff } from "heroicons-react";
import { EyeIcon } from "@heroicons/react/24/outline";
// least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one number
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

// create a validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
    ),
});

export default function FormLogin() {
  const t = useTranslations();
  const router = useRouter();
  const [invalidMsg, setInvalidMsg] = useState("")
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // eye toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // forgot password
  const toggleForgotPasswordVisibility = () => {
    setShowForgotPassword((prevState) => !prevState);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  const handleSubmit = async ({ email, password }) => {
    try {
      // .unwrap() is a utility function that will return either the fulfilled value or throw the rejected value as an error.
      const { data } = await login({ email, password }).unwrap();
      // console.log("data", data);
      dispatch(setCredentials(data));
      router.push("/student/dashboard");
    } catch (error) {
      if (!error.response) {
        setInvalidMsg(t("Invalid email or password"))
      } else if (error.response.status === 400) {
        toast.error("Missing email or password!");
      } else if (error.response.status === 403) {
        toast.error(
          "Forbidden - You don't have permission to access this resource"
        );
      }
    }
  };
  const initialValuesMail = {
    email: "",
  };

  const validationSchemaMail = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required email"),
  });

  const [sendMail] = useCreateRequestSendMailMutation();
  const handleSubmitMail = (values, { setSubmitting }) => {
    // Handle form submission here
    sendMail(values)
    setSubmitting(false);
    // You can add the API call to send the reset password email here
    toast.success("Message that reset password has been sent to your email address!", {
      autoClose: 1000,
    });
  };

  return (
    <div>
      <ToastConfig />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            handleSubmit(values);
            resetForm();
          }, 500);
        }}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form className="mt-4 w-full">
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
                className={
                  touched.email && errors.email
                    ? "block w-full px-4 py-2 mt-2 border-none shadow  rounded-3xl bg-red-50 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                    : "block w-full px-4 py-2 mt-2 border-none shadow bg-white rounded-3xl"
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="name@gmail.com"
                required
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
                  placeholder=""
                  className={
                    touched.password && errors.password
                      ? "block w-full px-4 py-2 mt-2 border-none shadow rounded-3xl bg-red-50 text-red-900 placeholder-red-700 text-sm  focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : "block w-full px-4 py-2 mt-2 border-none shadow bg-white rounded-3xl"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  required
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
            <div className="flex items-start">
              <button
                type="button"
                className="text-sm text-teal-700 hover:underline ml-auto cursor-pointer"
                onClick={toggleForgotPasswordVisibility}
              >
                {t("Forgot Password")}
              </button>
            </div>
            <h6 className="text-red-600 my-3">{invalidMsg}</h6>
            <div className="mt-5">
              <button
                disabled={
                  isSubmitting || (touched.password && errors.password)
                }
                type="submit"
                className="w-full justify-center flex primaryButton px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                {isLoading ? (
                  <div className="flex">
                    <p className="mr-2">{t("Signing In")}</p>
                    <img
                      className="w-6 h-6 animate-spin"
                      src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                      alt="Loading icon"
                    ></img>
                  </div>
                ) : (
                  t("Sign In")
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showForgotPassword && (
        <Formik
          initialValues={initialValuesMail}
          validationSchema={validationSchemaMail}
          onSubmit={handleSubmitMail}
        >
          {({ isSubmitting }) => (
            <Form
              className="fixed z-10 inset-0 overflow-y-auto"
              onClick={handleCloseForgotPasswordModal}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

                <div
                  className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">{t("Forgot Password")}</h1>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <p className="leading-relaxed">
                      {t("Please enter your email address. We'll send you a link to reset your password.")}
                    </p>

                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                      </label>

                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className={`block w-full shadow px-4 py-2 mt-2 border-none bg-white rounded-3xl ${errorMessage ? "bg-red-50 border border-red-500 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"}`}
                      />

                      <ErrorMessage name="email" component="p" className="text-sm text-red-500 mt-1" />
                    </div>

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="min-w-min px-4 py-2 primaryButton tracking-wide text-white transition-colors duration-200 transform bg-gradient-primary rounded-3xl hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                      >
                        {t("Send Mail")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
