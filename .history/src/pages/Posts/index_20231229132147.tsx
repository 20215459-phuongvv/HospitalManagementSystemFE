import React from "react";
import { useFetchData } from "../../components/hooks/useFethData";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/post-actions";
import { AppDispatch, RootState } from "../../redux";
import PostImg from "../../assets/images/post.jpg";
const Posts = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return dispatch(getPosts());
  });
  const posts = useSelector((state: RootState) => state.post.posts);

  return (
    <div className="posts">
      <div className="posts-header">
        <img src={PostImg} alt="" />
        <span className="post-header-content">Bài viết</span>
      </div>
    </div>
  );
};

export default Posts;