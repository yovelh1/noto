import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setUser, deleteUser} from "../Reducers/userSlice";
import {setCookie} from "../../Util/cookies";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/auth"}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: ({isLogin, data}) => ({
				url: isLogin ? "/login" : "/register",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(body, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(setUser(data));
				} catch {}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: "/logout",
			}),
			async onQueryStarted(body, {dispatch, queryFulfilled}) {
				try {
					dispatch(deleteUser());
					await queryFulfilled;
				} catch {
					setCookie("accessToken");
				}
			},
		}),
	}),
});

export const {useLoginMutation, useLogoutMutation} = authApi;
