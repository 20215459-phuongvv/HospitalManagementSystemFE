import React from "react";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../hooks/useFethData";
import { getPostsOfDoctor } from "../../../redux/actions/post-actions";
import { Field } from "../interfaces";
import { getCategories } from "../../../redux/actions/category-actions";
import PostDoctor from "./PostDoctor";
import { useModal } from "../../hooks/useModal";

const PostsDoctor = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([
      dispatch(getPostsOfDoctor()),
      dispatch(getCategories()),
    ]);
  });
  const postsDoctor = useSelector((state: RootState) => state.post.doctorPosts);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const fields: Field[] = [
    {
      fieldName: "title",
      fieldDisplay: "Tiêu đề",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
    },
    {
      fieldName: "content",
      fieldDisplay: "Nội dung",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
    },
    {
      fieldName: "summary",
      fieldDisplay: "Tóm tắt",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
    },
    {
      fieldName: "cover",
      fieldDisplay: "Hình ảnh",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "image",
    },
    {
      fieldName: "coverContent",
      fieldDisplay: "Nội dung hình ảnh",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: true,
      choosen: null,
      type: "text",
    },
    {
      fieldName: "categoryName",
      fieldDisplay: "Thể loại",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: categories,
      type: "text",
    },
    {
      fieldName: "categoryId",
      fieldDisplay: "Tiêu đề",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
    },
  ];
  const renderPostsDoctor = () => {
    return postsDoctor.map((post) => {
      return <PostDoctor fields={fields} entity={post} openDetailEdit={true} />;
    });
  };
  const handleSubmitv = () => {};
  return (
    <div className="page-index">
      <ul className="posts-doctor layout">
        {isFetched && renderPostsDoctor()}
      </ul>
      {isOpenCreateModal && (
        <Create
          fields={fields}
          handleSubmit={handleSubmit}
          closeCreateModal={closeCreateModal}
        />
      )}
    </div>
  );
};

export default PostsDoctor;