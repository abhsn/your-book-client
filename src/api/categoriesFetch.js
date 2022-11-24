import axios from "axios";

const categoriesFetch = axios.create({
	baseURL: "http://localhost:5000"
})

export const getCategories = async () => {
	const res = await categoriesFetch.get("/categories");
	return res.data;
}

// export const 

export default categoriesFetch;