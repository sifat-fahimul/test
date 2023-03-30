import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../redux/features/api/apiSlice";

const EditPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    data: post,
    isError,
    isLoading,
    error,
    isSuccess,
  } = useGetPostQuery(postId);
  const [updatePost, { isSuccess: updateSuccess, isLoading: updateLoading }] =
    useUpdatePostMutation();
  const { title: initialTitle, body: initialBody, id, userId } = post || {};
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    if (post !== undefined) {
      setTitle(initialTitle);
      setBody(initialBody);
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({ id, data: { userId, title, body } });
  };
  useEffect(() => {
    if (updateSuccess) navigate("/");
  }, [updateSuccess]);

  //   decide what to render
  let content = null;

  if (isLoading)
    content = (
      <div className="flex justify-center mt-10">
        <Loading />
      </div>
    );
  if (!isLoading && isError) content = <Error message={error} />;
  if (!isError && !isLoading && post?.id === undefined)
    content = <p>No data Found!</p>;

  if (!isError && !isLoading && post?.id)
    content = (
      <div className="mt-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <p className="text-lg text-center my-5"> Edit Post</p>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-full">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-full">
              <textarea
                rows="4"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="Product-title"
                type="text"
                placeholder="Type here"
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-full">
              <button
                disabled={updateLoading}
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  return content;
};

export default EditPost;
