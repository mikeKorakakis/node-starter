import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../core/types/post";

function Example() {
	const { isLoading, error, data } = useQuery<Post, Error>(["feedData"], () =>
		axios.get("locahost:5000/feed").then((res) => res.data)
	);

	if (isLoading) return <div>{"Loading..."}</div>;

	if (error) return <div>{"An error has occurred: " + error.message}</div>

	return (
		<div>
			<h1>{data.title}</h1>
			<p>{data.body}</p>
		</div>
	);
}

export default Example;
