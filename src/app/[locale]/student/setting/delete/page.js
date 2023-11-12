"use client";
import { useTranslations } from "next-intl";
import React from "react";
import {
  useGetUserQuery,
  useDeleteUserMutation,
} from "@/store/features/user/userApiSlice";
import { toast } from "react-toastify";
import ToastConfig from "@/components/ToastConfig";
import { useRouter } from "next/navigation";

const DeletePage = () => {
  const t = useTranslations();
  const router = useRouter();

  const { data: userData } = useGetUserQuery();
  const userUuid = userData?.data?.uuid;
  const [disableUser, { isLoading }] = useDeleteUserMutation();

  const handleSubmit = async () => {
    try {
      await disableUser(userUuid);
      toast.success("Account is deleted successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Fail to delete account!");
    }
  };
  return (
    <main className="pt-10 pb-20 flex justify-center  w-full">
      <ToastConfig/>
      <div className="max-sm:p-5 px-10">
        <div>
          <h1 className="lg:text-4xl max-sm:text-3xl font-bold pb-8">
            {t("Delete Account")}
          </h1>
        </div>

        <div>
          <h4 className=" font-medium max-sm:text-sm pb-4">
            {t("Are you sure you want to continue?")}
          </h4>
        </div>

        <div>
          <h5 className="font-medium max-sm:text-sm ">
            {t(
              "If you have a problem our customer support team will be happy to help"
            )}
            <span className="text-app-primary underline cursor-pointer">
              {t("Get in touch!")}
            </span>
          </h5>
          <h5 className="mb-2 font-medium max-sm:text-sm ">
            {t("If you delete your account :")}
          </h5>
          <div className="ps-6 pt-3">
            <ul className=" lg:text-base max-sm:text-sm  space-y-1 list-disc list-inside">
              <li>{t("You will lose all of your course progress")}</li>
              <li>{t("You will lose access to all your certificates")}</li>
              <li>
                {t("Your connected social accounts will be disconnected")}
              </li>
              <li>
                {t(
                  "Account deletion is permanent This action cannot be undone"
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex pt-10 lg:justify-end max-sm:justify-center lg:me-10">
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-gradient-secondary hover:bg-pink-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t("Delete Account")}
          </button>
        </div>
      </div>
    </main>
  );
};

export default DeletePage;
