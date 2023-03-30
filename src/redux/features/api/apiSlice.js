import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      //   query: () => "/posts?_start=0&_limit=15",
      query: () => "/posts",
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `/posts`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const posts = await queryFulfilled;
          // pessimistic update
          dispatch(
            apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push(posts.data);
            })
          );
        } catch (err) {}
      },
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // pessimistic update
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            const draftPost = draft.find((post) => post.id == arg.id);
            draftPost.title = arg.data.title;
            draftPost.body = arg.data.body;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult1.undo();
        }
      },
    }),
    deletePosts: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            return (draft = draft.filter((task) => task.id !== arg));
          })
        );

        try {
          const res = await queryFulfilled;
          if (res?.id) {
            patchResult.undo();
          }
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostsMutation,
  useUpdatePostMutation,
  useAddPostMutation,
  useGetPostQuery,
} = apiSlice;
