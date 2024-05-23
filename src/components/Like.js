import React from 'react';
import {
  LikeFilled,
  LikeOutlined
} from "@ant-design/icons";

export default function Like({ isLiked, onLike }) {
  const style = {
    // color: "#fff",
    // backgroundColor: "#0d6efd",
    borderRadius: "50%",
    width: "21px",
    height: "21px",
    padding: "2px",
    margin: "0 5px 0 3px",
  }

  return (
    isLiked ? (
      <LikeFilled
        style={{
          ...style,
          color: "#fff",
          backgroundColor: "#0d6efd",
        }}
        onClick={onLike}
      />
    ) : (
      <LikeOutlined
        style={{
          ...style,
          color: "#c4c4c4",
          padding: 0,
          fontSize: "20px",
        }}
        onClick={onLike}
      />
    )
  );
}