import axios, { AxiosError, AxiosResponse } from "axios";
import { FetchDataOptions } from "core/types/fetchDataOptions";
import { PaginatedData } from "core/types/paginatedData";
import { Post } from "../types/post";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = "http://localhost:5000"; // process.env.REACT_APP_API_URL;

// axios.interceptors.request.use((config) => {
// 	const token = store.commonStore.token;
// 	if (token) config.headers.Authorization = `Bearer ${token}`;
// 	return config;
// });

// axios.interceptors.response.use(
// 	async (response) => {
// 		if (process.env.NODE_ENV === "development") await sleep(1000);
// 		const pagination = response.headers["pagination"];
// 		if (pagination) {
// 			response.data = new PaginatedResult(
// 				response.data,
// 				JSON.parse(pagination)
// 			);
// 			return response as AxiosResponse<PaginatedResult<any>>;
// 		}
// 		return response;
// 	},
// 	(error: AxiosError) => {
// 		const { data, status, config, headers } = error.response!;
// 		switch (status) {
// 			case 400:
// 				if (
// 					config.method === "get" &&
// 					data.errors.hasOwnProperty("id")
// 				) {
// 					history.push("/not-found");
// 				}
// 				if (data.errors) {
// 					const modalStateErrors = [];
// 					for (const key in data.errors) {
// 						if (data.errors[key]) {
// 							modalStateErrors.push(data.errors[key]);
// 						}
// 					}
// 					throw modalStateErrors.flat();
// 				} else {
// 					toast.error(data);
// 				}
// 				break;
// 			case 401:
// 				if (
// 					status === 401 &&
// 					headers["www-authenticate"]?.startsWith(
// 						'Bearer error="invalid_token"'
// 					)
// 				) {
// 					store.userStore.logout();
// 					toast.error("Session expired - please login again");
// 				}
// 				break;
// 			case 404:
// 				history.push("/not-found");
// 				break;
// 			case 500:
// 				store.commonStore.setServerError(data);
// 				history.push("/server-error");
// 				break;
// 		}
// 		return Promise.reject(error);
// 	}
// );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;


// function that converts fetchdataoptions to urlsearchparams
const fetchOptions = (options: FetchDataOptions) => {

    const params = new URLSearchParams();
    const keys = Object.keys(options)
    const values = Object.values(options)
    for(var i=0;  i<keys.length; i++){
        params.append(keys[i], values[i])
    }
	return params;
};


const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    getWithParams: <T>(url: string, options: FetchDataOptions) =>
		axios
			.get<T>(`${url}?${fetchOptions(options)}`)
			.then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) =>
		axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Feed = {
	list: (fetchDataOptions: FetchDataOptions) =>
		requests.getWithParams<PaginatedData<Post>>("/feed", fetchDataOptions),
};

// const Books = {
// 	list: (params: URLSearchParams) =>
// 		axios
// 			.get<<Book[]>>("/books", { params })
// 			.then(responseBody),
// 	listUserBooks: (params: URLSearchParams) =>
// 		axios
// 			.get<PaginatedResult<Book[]>>("/books/userBooks", { params })
// 			.then(responseBody),
// 	listBookTitles: (params: URLSearchParams) =>
// 		axios.get<BookTitle[]>("/books/titles", { params }).then(responseBody),
// 	importDistributionPlan: (values: ImportDistributionPlanValues) =>
// 		axios.post<BookTitle[]>("/books/importDistributionPlan", values),
// 	details: (id: number) => requestsimport { fetchDataOptions } from './../components/types/fetchDataOptions';
// .get<Book>(`/books/${id}`),
// 	create: (book: BookFormValues) => requests.post<Book>("/books", book),
// 	update: (book: BookFormValues) =>
// 		requests.put<Book>(`/books/${book.bookOid}`, book),
// 	delete: (id: number) => requests.del<void>(`/books/${id}`),
// 	listBookEditions: (id: number) =>
// 		requests.get<BookEdition[]>(`/books/${id}/bookEditions`),
// 	listDistributionPlans: (id: number) =>
// 		requests.get<DistributionPlan[]>(`/books/${id}/distributionPlans`),
// };

const agent = {
	Feed,
};

export default agent;
