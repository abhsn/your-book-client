import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCategory } from "../../api/categoriesFetch";
import CategoryDetailsCard from "./CategoryDetailsCard";

function CategoryDetails() {
	const id = useParams().id;

	const { isLoading, data: products = [] } = useQuery({
		queryKey: ['category'],
		queryFn: () => getCategory(id)
	})

	if (isLoading) {
		return (
			<div className='mt-10 grid place-items-center'>
				<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "12rem", "--thickness": "1rem" }}></div>
			</div>
		);
	} else {
		return (
			<>
				<h3 className="text-center text-xl font-bold mt-10">Products about {products[0].categoryName} book</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center mt-10">
					{
						products.map(product => <CategoryDetailsCard key={product._id} product={product} />)
					}
				</div>
			</>
		);
	}


}

export default CategoryDetails;