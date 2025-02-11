import axios from "axios";

export const getPosts = async (page = 1) => {
  const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,
	)
  return response.data
}

export const getPostDetails = async (id) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	)
	return response.data
}