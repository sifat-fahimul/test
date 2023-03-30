import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { useAddPostMutation } from "../redux/features/api/apiSlice";

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [addPost, { isError, isLoading, isSuccess, error }] =
    useAddPostMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, body });
  };
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);
  return (
    <div className="mt-10 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
      <p className="text-lg text-center my-5"> Edit Post</p>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="title"
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
              type="text"
              placeholder="description"
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-full">
            <button
              disabled={isLoading}
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              Add Post
            </button>
          </div>
        </div>
        {isError && <Error message={error} />}
      </form>
    </div>
  );
};

export default AddPost;
