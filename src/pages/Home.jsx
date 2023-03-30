import React from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useGetPostsQuery } from "../redux/features/api/apiSlice";

const Home = () => {
  const { data, isError, isLoading, error } = useGetPostsQuery();

  //   decide what to render
  let content = null;

  if (isLoading)
    content = (
      <div className="flex gap-3">
        <Loading /> <Loading /> <Loading /> <Loading />
      </div>
    );
  if (!isLoading && isError) content = <Error message={error} />;
  if (!isError && !isLoading && data?.length === 0)
    content = <p>No data Found!</p>;
  if (!isError && !isLoading && data?.length > 0)
    content = data
      .slice()
      ?.sort((a, b) => b.id - a.id)
      .map((post) => <PostCard key={post.id} post={post} />);
  return (
    <div>
      <div className="w-full flex">
        <Link
          to="/addPost"
          className="btn m-9 text-xl my-8 text-blue-500 border border-green-300 rounded-md hover:bg-emerald-300 hover:text-white p-2"
        >
          Add post
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6 mx-5">{content}</div>
    </div>
  );
};

export default Home;
