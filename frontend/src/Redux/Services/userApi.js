import {isRejectedWithValue} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {addToCart, deleteFromCart, setUser} from "../Reducers/userSlice";
import {getCookie, setCookie} from "../../Util/cookies";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "/api/user",
		prepareHeaders: (headers) => {
			headers.set("authorization", `Bearer ${getCookie("accessToken")}`);
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: "",
			}),
			async onQueryStarted(req, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(setUser(data));
				} catch (e) {
					console.log(e);
				}
			},
		}),
		addToCart: builder.mutation({
			query: ({wishlist, data}) => ({
				url: `${wishlist ? "wishlist" : "cart"}/add`,
				method: "POST",
				body: data,
			}),
			async onQueryStarted({wishlist, data}, {dispatch, queryFulfilled}) {
				try {
					dispatch(addToCart({wishlist, data}));
					await queryFulfilled;
				} catch {
					dispatch(deleteFromCart({wishlist, data}));
				}
			},
		}),
		deleteFromCart: builder.mutation({
			query: ({wishlist = false, data}) => ({
				url: `${wishlist ? "wishlist" : "cart"}/delete`,
				method: "POST",
				body: data,
			}),
			async onQueryStarted({wishlist, data}, {dispatch, queryFulfilled}) {
				try {
					dispatch(deleteFromCart({wishlist, data}));
					await queryFulfilled;
				} catch {
					dispatch(addToCart({wishlist, data}));
				}
			},
		}),
		updateUser: builder.mutation({
			query: (params) => ({
				url: params.url,
				method: "POST",
				headers: {...params.headers, authorization: `Barrer ${getCookie("accessToken")}`},
				body: params.body,
			}),
			async onQueryStarted({}, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(
						userApi.util.updateQueryData("getUser", undefined, (draft) => {
							Object.assign(draft, data.updatedData);
						}),
					);
				} catch {}
			},
		}),
		removeUser: builder.mutation({
			query: () => ({
				url: "logout",
				method: "POST",
				body: {token: `Barrer ${getCookie("accessToken")}`},
			}),
			async onQueryStarted(undefined, {dispatch, queryFulfilled}) {
				dispatch(userApi.util.resetApiState());
				setCookie("accessToken");
			},
		}),
	}),
});

export const rtkQueryError = (api) => (next) => (action) => {
	if (isRejectedWithValue(action) && action.payload?.data?.authErr) {
		api.dispatch(userApi.endpoints.removeUser.initiate());
	}
	return next(action);
};

export const {useGetUserQuery, useUpdateUserMutation, useRemoveUserMutation} = userApi;
