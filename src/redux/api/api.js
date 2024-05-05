import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.REACT_APP_API_ROOT,
    baseUrl: "http://localhost:8080/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.authSlice?.userToken?.token;
      if (token) {
        headers.set("Authorization", token);
      }
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: data.url,
        method: "POST",
        body: data.body,
      }),
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: data.url,
        method: "POST",
        body: data.body,
      }),
    }),
    getAllProducts: builder.query({
      query: (data) => ({
        url: data.page
          ? `${data.url}?page=${data.page}&limit=${data.limit}&search=${
              data.search || ""
            }`
          : `${data.url}?search=${data.search || ""}`,
      }),
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (data) => ({
        url: `${data.url}/${data.id}`,
      }),
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: data.url,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${data.url}/${data.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${data.url}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetAllProductsQuery,
  useAddProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = api;
