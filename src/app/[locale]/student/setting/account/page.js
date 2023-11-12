"use client";
import Image from "next/image";
import React from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { Grid, Modal } from "antd";
import { useRef, useState } from "react";
import { fallBackAvatar } from "@/constants/fallBack";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/store/features/user/userApiSlice";
import { useUploadSingleMutation } from "@/store/features/upload-single/uploadApiSlice";
import { useAddImageByNameMutation } from "@/store/features/image/imageApiSlice";
import { toast } from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import Loading from "@/app/[locale]/loading";

const { useBreakpoint } = Grid;

const AccountPage = () => {
  const screens = useBreakpoint();
  const t = useTranslations();

  const [addImageByName] = useAddImageByNameMutation();
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const { data: userData } = useGetUserQuery();

  const user = userData?.data;
  // console.log("user", user);
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const initialValues = {
    profile: user?.profile,
    username: user?.username,
    email: user?.email,
    location: user?.location,
    bio: user?.bio,
    githubUrl: user?.githubUrl,
  };

  const handleSubmit = async (values) => {
    if (values.profile !== user?.profile) {
      try {
        // Handle form submission
        console.log("values file", values.profile);

        const files = values.profile;
        const formdata = new FormData();
        formdata.append("file", files);

        const requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        const response = await fetch(
          "https://istademy-api.istad.co/api/v1/files",
          requestOptions
        );
        const dataFile = await response.json();
        // console.log("dataFile", dataFile);
        if (dataFile.status === 400) {
          const uuid = user?.uuid;
          const profile = user?.profile?.uuid;
          const { username, bio, location, githubUrl, email } = values;
          const body = { username, bio, profile, location, githubUrl, email };
          const dataUpdateUser = await updateProfile({ uuid, data: body });
          toast.success("Profile is updated successfully!");
          // console.log("dataUpdateUser", dataUpdateUser);
          return;
        }
        const name = dataFile?.data?.name;
        const url = dataFile?.data?.url;
        try {
          const dataImage = await addImageByName({ name, url }).unwrap();
          // console.log("dataImage", dataImage);
          try {
            const uuid = user?.uuid;
            const profile = dataImage?.data?.uuid;
            const { username, bio, location, githubUrl, email } = values;
            const body = { username, profile, bio, location, githubUrl, email };
            const dataUpdateUser = await updateProfile({ uuid, data: body });
            toast.success("Profile is updated successfully!");
            // console.log("dataUpdateUser===>", dataUpdateUser);
          } catch (err) {
            // console.log(err, "err form dataUpdateUser");
          }
        } catch (e) {
          // console.log("Error data image ", e);
        }
      } catch (error) {
        // console.log("Error handling form submission:", error);
      }
    } else {
      try {
        const uuid = user?.uuid;
        // console.log("value", values);
        const bio = values.bio ? values.bio : user?.bio;
        const profile = user?.profile?.uuid;
        const location = values.location ? values.location : user?.location;
        const githubUrl = values.githubUrl ? values.githubUrl : user?.githubUrl;
        const { username, email } = values;
        const body = { username, bio, location, githubUrl, email, profile };
        const dataUpdateUser = await updateProfile({ uuid, data: body });
        toast.success("Profile is updated successfully!");
      } catch (err) {
        // console.log(err, "err form dataUpdateUser");
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="pt-10 pb-20 flex justify-center  w-full">
          <ToastConfig />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="flex flex-col  items-center">
                <div className="flex rounded-full flex-col mb-6 justify-center">
                  <Field
                    as={FileInput}
                    name="profile"
                    setFieldValue={setFieldValue}
                  />
                  {/* <p className="text-center mt-2 text-xs font-medium text-app-primary">
             {t("Change Profile")}
           </p> */}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Full Name")}
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 max-sm:w-[300px] rounded-3xl  py-3 ps-3 w-[400px] shadow border-gray-200 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-25 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("Full Name")}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Your Email")}
                  </label>
                  <Field
                    type="email"
                    disabled
                    name="email"
                    id="email"
                    className="bg-gray-50 max-sm:w-[300px] py-3 ps-3 shadow  border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-25 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Location")}
                  </label>
                  <Field
                    type="text"
                    id="location"
                    name="location"
                    className="bg-gray-50 max-sm:w-[300px] py-3 ps-3 shadow w-[400px] border-gray-200 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block p-25 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("City, Country")}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("Bio")}
                  </label>
                  <Field
                    name="bio"
                    id="bio"
                    as="textarea"
                    rows="3"
                    className="block p-25 max-sm:w-[300px] py-3 ps-3  w-[400px] shadow text-sm text-gray-900 bg-gray-50 rounded-3xl  border-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={t("share your interest and goal")}
                  ></Field>
                </div>

                <div className="mb-10">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Github Username
                  </label>
                  <div className="flex w-[400px]  max-sm:w-[300px] rounded-3xl shadow">
                    <span className="inline-flex py-3  items-center px-3 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-200 rounded-l-md dark:bg-gray-600 dark:text-gray-400 rounded-tl-3xl rounded-bl-3xl dark:border-gray-600">
                      https://githubcom
                    </span>
                    <Field
                      type="text"
                      name="githubUrl"
                      id="githubUrl "
                      className="py-3 ps-3 rounded-tr-3xl rounded-br-3xl  bg-gray-50  border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-25  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Github Username"
                    />
                  </div>
                </div>

                <div className="flex w-full max-sm:justify-center justify-end">
                  {/* <button
             type="cancel"
             className="text-white flex justify-start py-2 max-sm:px-3 max-sm:text-xs shadow bg-gradient-secondary hover:bg-pink-800 focus:ring-4 focus:outline-none  font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-25 text-center"
           >
             {t("Cancel")}
           </button> */}
                  <button
                    type="submit"
                    className="text-white py-2 max-sm:px-5 max-sm:text-xs shadow bg-gradient-primary hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm w-auto px-5 py-25 text-center"
                  >
                    {t("Save")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </main>
      )}
    </>
  );
};

const FileInput = ({ label, ...props }) => {
  const t = useTranslations();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [previewImage, setPreviewImage] = useState(null);
  const { data: userData } = useGetUserQuery();

  const user = userData?.data;

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setPreviewImage(URL.createObjectURL(file));
    setFieldValue(props.name, file);
  };

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={
            previewImage ? previewImage : user?.profile?.url || fallBackAvatar
          }
          width={144}
          height={144}
          alt="avatar"
          className="w-36  border-gray-200 border-[1.5px] max-sm:w-32 max-sm:h-32 h-36 object-cover rounded-full cursor-pointer"
          onClick={handlePreviewClick}
        />
        <label
          htmlFor={props.id || props.name}
          className="text-sm hover:text-app-primary flex mt-2 cursor-pointer font-medium"
        >
          {t("Change Profile")}
        </label>
        <input
          type="file"
          id={props.id || props.name}
          name={props.name}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
      <Modal
        width={400}
        open={isPreviewOpen}
        onCancel={handleClosePreview}
        footer={null}
        style={{ padding: 0 }}
        wrapClassName="custom-modal-wrap"
        className="rounded-[15px] object-cover"
      >
        <Image
          src={previewImage || user?.profile?.url || fallBackAvatar}
          width={400}
          height={400}
          className="rounded-[15px] object-cover"
          alt="Preview"
        />
      </Modal>
    </div>
  );
};

export default AccountPage;
