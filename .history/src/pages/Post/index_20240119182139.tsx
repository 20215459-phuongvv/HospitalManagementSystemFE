import React from "react";
import { Post as PostV2 } from "../../redux/features/postSlice";
interface PostProps {
  post: PostV2;
}
const Post: React.FC<PostV2> = ({ post }) => {
  return (
    <div className="container">
      <div className="post-img">
        <img src={post.cover} alt="" />
      </div>
    </div>
  );
};

export default Post;