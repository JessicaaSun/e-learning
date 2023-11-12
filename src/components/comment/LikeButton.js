"use client";
import { use, useEffect, useState } from "react";
import { HeartFilledIcon, HeartStrokeIcon } from "./Comment";
import { useGetCommentLikeQuery } from "@/store/features/comment/commentApiSlice";
import { useGetCheckIfLikedQuery } from "@/store/features/comment/commentApiSlice";

const like_ = async (commentId, userId) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${user_accessToken}`);
  let raw = JSON.stringify({
    commentId,
    userId,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    // redirect: 'follow'
  };
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}commentLike`,
    requestOptions
  );
  const response = await request.json();
  // console.log(response);
  return response.date;
};

const deleteLike_ = async (userId, cmtId) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${user_accessToken}`);

  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    // redirect: 'follow'
  };
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}commentLike?userId=${userId}&cmtId=${cmtId}`,
    requestOptions
  );
  const response = await request.json();
  // console.log(response);
  return response.date;
};

export function BtnLike({ number = 0, likesCount, commentId, userId }) {
  const { data: cmtLike, isLoading: commentLikeLoading } =
    useGetCommentLikeQuery(commentId);

  const { data: isLiked, isLoading: isLikedLoading } = useGetCheckIfLikedQuery({
    userId: userId,
    cmtId: commentId,
  });

  const [color, setColor] = useState(isLiked?.data);
  // console.log("color", color);
  const [count, setCount] = useState(1);

  const [like, setLike] = useState([]);
  const [numberOfLike, setNumberOfLike] = useState(number);

  useEffect(() => {
    if (cmtLike) {
      setNumberOfLike(cmtLike?.data?.list?.length);
    }
  }, [cmtLike]);

  useEffect(() => {
    if (isLiked?.data) {
      setColor(true);
    }
  }, [isLiked?.data]);

  //   useEffect(() => {
  //     const checkLiked = async () => {
  //       const isLiked = await checkIfLiked(userId, commentId);
  //       if (isLiked?.data == true) {
  //         setColor(true);
  //       }
  //     };
  //     checkLiked();
  //   }, [commentId, count, userId]);

  // console.log("count", count)

  const interactLike = async () => {
   
    if (isLiked?.data && count === 1) {
      await deleteLike_(userId, commentId);
      setTimeout(() => {
        setColor(false);
        setNumberOfLike((prev) => prev - 1);
      }, 500);
    } else {
      if (count % 2 === 0) {
        await deleteLike_(userId, commentId);
        setColor(false);
        setNumberOfLike((prev) => prev - 1);
        setCount(count + 1);
      } else {
        setColor(true);
        setNumberOfLike((prev) => prev + 1);
        setLike(await like_(commentId, userId));
        setCount(count + 1);
      }
    }
  };

  return (
    <span className="flex items-center text-layer-2 text-xs font-medium py-0.5 rounded ">
      <div
        className="cursor-pointer"
        onClick={() => {
          interactLike();
        }}
      >
        {color ? <HeartFilledIcon /> : <HeartStrokeIcon />}
      </div>
      <small>
        {numberOfLike === undefined ? totalCmtLikes : numberOfLike} likes
      </small>
    </span>
  );
}
