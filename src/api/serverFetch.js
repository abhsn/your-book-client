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
	const res = await serverFetch.get(`/category/${id}`, { headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
	return res.data;
}

export const getJWT = async (email) => {
	const res = await serverFetch.get('/jwt', { params: { email } });
	return res.data;
}

export const getSellers = async (email) => {
	const res = await serverFetch.get('/allsellers', { params: { email }, headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
	return res.data;
}

export const getBuyers = async (email) => {
	const res = await serverFetch.get('/allbuyers', { params: { email }, headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
	return res.data;
}

export const getReported = async (email) => {
	const res = await serverFetch.get('/allreported', { params: { email }, headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
	return res.data;
}

export default serverFetch;