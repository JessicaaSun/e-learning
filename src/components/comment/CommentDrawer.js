"use client";
import React from "react";
import Comment from "./Comment";
import { Drawer, Select } from "antd";
import TextAreaComponent from "../forms/TextArea";
import CommentInputComponent from "./CommentInput";
import moment from "moment";
import { CountComments } from "../calculate/CountComment";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useGetCommentQuery } from "@/store/features/comment/commentApiSlice";
import Loading from "@/app/[locale]/loading";

const CommentDrawer = ({ onClose, open, commentData, user, lessonId }) => {
  const now = moment();
  let totalCommentLength = 0;

  // const comments = useSelector(state => state.comment.comments); (jenh ta ah pel add tmei ah mean srab ot jenh)
  const { data: commentResponse, isLoading: loadingComment } =
    useGetCommentQuery(lessonId, {
      invalidatesTags: ["Comment"],
    });
  const comments = commentResponse?.data?.list;

  if (commentData?.length > 0) {
    // iterate over each top-level comment and count all comments
    for (let comment of commentData) {
      totalCommentLength += CountComments(comment);
    }
  }
  if (loadingComment) {
    return <Loading />;
  }
  return (
    <div>
      <Drawer
        title={`${totalCommentLength} ${
          totalCommentLength > 1 ? "Comments" : "Comment"
        }`}
        placement="right"
        onClose={onClose}
        open={open}
        bodyStyle={{
          padding: 0,
        }}
        extra={
          <Select
            defaultValue="Popular"
            style={{
              width: 100,
            }}
            bordered={false}
            options={[
              {
                value: "Popular",
                label: "Popular",
              },
              {
                value: "Latest",
                label: "Latest",
              },
            ]}
          />
        }
      >
        <div className="h-full relative">
          <div className=" p-4  min-w-full min-h-[91%] overflow-hidden">
            <div className="flex gap-3 flex-col">
              {totalCommentLength > 0 &&
                comments?.map((comment) => {
                  const createdAt = moment(comment?.createdAt);
                  return (
                    <Comment
                      lessonId={lessonId}
                      commentId={comment?.id}
                      user={user}
                      key={comment?.uuid}
                      // like={comment.like}
                      content={comment?.contents}
                      postedAt={createdAt.fromNow()}
                      pf={comment?.userId?.profile?.url}
                      // subComment={comment.subComment}
                      subComment={comment?.subComments}
                      username={comment?.userId?.username}
                    />
                  );
                })}
            </div>
          </div>
          <div className="left-0 bottom-0 pb-3 pt-3 bg-white px-4 w-full sticky">
            <CommentInputComponent userId={user?.id} lessonId={lessonId} />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CommentDrawer;
