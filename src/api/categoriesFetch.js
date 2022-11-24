import axios from "axios";

const categoriesFetch = axios.create({
	baseURL: "https://b612-used-products-resale-server-side-abhsn.vercel.app",
	withCredentials: true
})

export const getCategories = async () => {
	const res = await categoriesFetch.get("/categories");
	return res.data;
}

export const getCategory = async (id) => {
	const res = await categoriesFetch.get(`category/${id}`);
	return res.data;
}

// export const 

export default categoriesFetch;