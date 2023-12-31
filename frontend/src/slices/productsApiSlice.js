import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, page }) => ({
                url: PRODUCTS_URL,
                params: { keyword, page }
            }),
            keepUnusedDataFor: 10,
            providesTags: ["Product"]
        }),
        getProductDetails: builder.query({
            query: ({ productId }) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 1,
            providesTags: ["Product"]
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: "POST",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["Product"]
        }),
        editProduct: builder.mutation({
            query: ({ productId, data }) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "PUT",
                body: data,
                credentials: "include"
            }),
            invalidatesTags: ["Product"]
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        deleteProduct: builder.mutation({
            query: ({ productId }) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
                credentials: "include"
            }),
            invalidatesTags: ["Product"]
        }),
        createProductReview: builder.mutation({
            query: ({ productId, data }) => ({
                url: `${PRODUCTS_URL}/${productId}/reviews`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`
            }),
            keepUnusedDataFor: 3,
        }),

    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAddProductMutation,
    useEditProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateProductReviewMutation,
    useGetTopProductsQuery
} = productsApiSlice