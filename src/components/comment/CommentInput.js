"use client";

import React from "react";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { CiPaperplane } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useAddCommentMutation } from "@/store/features/comment/commentApiSlice";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/features/comment/commentSlice";

const validator = yup.object({
  contents: yup.string(),
});

export default function CommentInputComponent({
  lessonId,
  userId,
  parentId,
}) {
  const route = useRouter();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const [insertComment] = useAddCommentMutation();

  return (
    <Formik
      initialValues={{
        contents: "",
      }}
      validationSchema={validator}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        // alert(JSON.stringify(values));
        values.userId = userId;
        values.parentId = parentId ? parentId : null;
        values.lessonId = lessonId;
        values.contents = text;
        insertComment(values);
        resetForm();
        setText("");
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form method="post">
          <div className="w-full relative md:w-full">
            <div className="absolute z-20 top-[10px] right-[10px]">
              {text.length > 0 && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#3c5cff"
                    className="w-5 h-5 hover:w-6 hover:h-6"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              )}
            </div>
            <Field
              as="textarea"
              rows="2"
              value={text}
              onChange={handleChange}
              id="contents"
              name="contents"
              className={`bg-gray-100 text-[13px] rounded-lg border-none border-gray-300 leading-normal resize-none w-full  py-2 px-3 placeholder-gray-700 focus:outline-none focus:bg-gray-50`}
              placeholder="បញ្ចេញមតិរបស់អ្នក..."
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
