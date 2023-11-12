"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextAreaComponent from "../forms/TextArea";
import { BtnLike } from "./LikeButton";
import CommentInputComponent from "./CommentInput";
import moment from "moment";

const Comment = ({
  content,
  pf,
  username,
  like,
  postedAt,
  subComment,
  lessonId,
  commentId,
  user,
}) => {
  const now = moment();
  // handle sub comment
  const [showSubComments, setShowSubComments] = useState(false);
  const handleToggleSubComments = () => {
    setShowSubComments(!showSubComments);
  };

  // handle reply comment
  const [showReplyComments, setShowReplyComments] = useState(false);
  const handleToggleReplyComment = () => {
    setShowReplyComments(!showReplyComments);
  };

  // handle like
  const [isLiked, setIsLiked] = useState(false);
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const [isSubCommentLiked, setIsSubCommentLiked] = useState(false);
  const handleToggleSubCommentLike = () => {
    setIsSubCommentLiked(!isSubCommentLiked);
  };

  return (
    <div>
      <div className="w-full flex">
        <div className="me-[6px] rounded-full object-cover">
          <Image
            src={pf}
            alt="avatar"
            width={32}
            height={32}
            className="w-[32px] h-[32px] object-cover rounded-full"
          />
        </div>
        <div>
          <div className="flex space-x-2">
            <div className="bg-gray-100 max-w-[278px] flex flex-wrap  flex-col rounded-xl px-2 pb-2 pt-1">
              <div className="font-medium">
                <a href="#" className="hover:underline">
                  <p>{username}</p>
                </a>
              </div>
              <p className="text-[13px]">{content}</p>
            </div>
            {/* <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-50 hover:opacity-100">
              <a href="#" className="">
                <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                  <svg
                    className="w-4 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </div>
              </a>
            </div> */}
          </div>
          <div className="flex justify-start items-center text-xs w-full">
            <div className="font-semibold text-gray-700 px-2 pt-1 flex items-center justify-center space-x-1">
              <div
                className="cursor-pointer"
                // onClick={() => handleToggleLike()}
              >
                {/* {isLiked ? <HeartFilledIcon /> : <HeartStrokeIcon />} */}
                <BtnLike commentId={commentId} userId={user?.id} />
              </div>

              <small className="self-center">.</small>
              <div
                onClick={() => handleToggleReplyComment()}
                className="cursor-pointer"
              >
                <ReplyIcon />
              </div>
              <div
                className="hover:underline cursor-pointer"
                onClick={() => handleToggleSubComments()}
              >
                <small>
                  {subComment?.length}{" "}
                  {subComment?.length > 1 ? "Replies" : "Reply"}
                </small>
              </div>
              <small className="self-center">.</small>

              <small>{postedAt}</small>
            </div>
          </div>
        </div>
      </div>

      {showSubComments && (
        <div className="ps-[40px]  w-full flex flex-col">
          {subComment?.map((sub) => {
            const createdAt = moment(sub?.createdAt);
            return (
              <div key={sub?.uuid} className="flex mt-2">
                <div className="me-[6px] rounded-full object-cover">
                  <Image
                    src={sub?.userId?.profile?.url}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-[32px] h-[32px] object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="flex space-x-2">
                    <div className="bg-gray-100  max-w-[245px] flex flex-wrap  flex-col rounded-xl px-2 pb-2 pt-1">
                      <div className="font-medium">
                        <a href="#" className="hover:underline">
                          <p>{sub?.userId?.username}</p>
                        </a>
                      </div>
                      <p className="text-[13px]">{sub?.contents}</p>
                    </div>
                    {/* <div className="self-stretch flex justify-center items-center transform transition-opacity duration-200 opacity-50 hover:opacity-100">
                      <a href="#" className="">
                        <div className="text-xs cursor-pointer flex h-6 w-6 transform transition-colors duration-200 hover:bg-gray-100 rounded-full items-center justify-center">
                          <svg
                            className="w-4 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div> */}
                  </div>
                  <div className="flex justify-start items-center text-xs w-full">
                    <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                      <div
                        className="cursor-pointer"
                        // onClick={() => handleToggleLike()}
                      >
                        {/* {isLiked ? <HeartFilledIcon /> : <HeartStrokeIcon />} */}
                        <BtnLike commentId={sub?.id} userId={user?.id} />
                      </div>

                      <small className="self-center">.</small>
                      <small>{createdAt.fromNow()}</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showReplyComments && (
        <div className="ps-[40px] w-full flex flex-col">
          <div className="flex mt-2">
            <div className="me-[6px] rounded-full object-cover">
              <Image
                src={user?.profile?.url}
                alt="avatar"
                width={32}
                height={32}
                className="w-[32px] h-[32px] object-cover rounded-full"
              />
            </div>
            <CommentInputComponent
              parentId={commentId}
              userId={user?.id}
              lessonId={lessonId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export function HeartStrokeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="#e73b7b"
      className="w-[14px] h-[14px]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

export function HeartFilledIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#e73b7b"
      className="w-[14px] h-[14px]"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      fill="#3c5cff"
      style={{ color: "#3c5cff" }}
      viewBox="0 0 512 512"
    >
      <path d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z" />
    </svg>
  );
}

export default Comment;
