import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

function MyProducts() {

	const { data: myProducts = [], refetch } = useQuery({
		queryKey: ['myProducts'],
		queryFn: () =>
			fetch('http://localhost:5000/myProducts', {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				}
			}).then(res => res.json())
	})

	return (
		<div className="lg:w-full">
			<h3 className="text-center text-xl font-bold my-4">My products</h3>
			{
				myProducts.length === 0 && <h4 className="text-center font-bold text-lg my-2">You have no products right now.</h4>
			}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
				{
					myProducts.map(product => <ProductCard refetch={refetch} key={product._id} product={product} />)
				}
			</div>
		</div>
	);
}

export default MyProducts;