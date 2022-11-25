import axios from "axios";
// https://b612-used-products-resale-server-side-abhsn.vercel.app

const serverFetch = axios.create({
	baseURL: "http://localhost:5000"
})

export const getCategories = async () => {
	const res = await serverFetch.get("/categories");
	return res.data;
}

export const getCategory = async (id) => {
	const res = await serverFetch.get(`/category/${id}`);
	return res.data;
}

export const getJWT = async (email) => {
	const res = await serverFetch.get('/jwt', { params: { email } });
	return res.data;
}

// export const 

export default serverFetch;