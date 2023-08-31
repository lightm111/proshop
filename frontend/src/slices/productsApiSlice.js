import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL
            }),
            keepUnusedDataFor: 10,
            providesTags: ["Product"]
        }),
        getProductDetails: builder.query({
            query: ({ productId }) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 1
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
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: data,
                credentials: "include"
            })
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useAddProductMutation,
    useUploadProductImageMutation
} = productsApiSlice