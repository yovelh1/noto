import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/product"}),
	endpoints: (builder) => ({
		getSalesProduct: builder.query({
			query: () => ({
				url: "sales-products",
			}),
		}),
		getCategoryProducts: builder.query({
			query: (categoryId) => ({
				url: `category/${categoryId}`,
			}),
		}),
		getProduct: builder.query({
			query: (productId) => ({
				url: productId,
			}),
		}),
	}),
});

export const {useGetProductQuery, useGetSalesProductQuery, useGetCategoryProductsQuery} = productApi;
