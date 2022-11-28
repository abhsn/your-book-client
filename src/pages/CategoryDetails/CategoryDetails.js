import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory } from "../../api/serverFetch";
import BookingModal from "../../components/BookingModal/BookingModal";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import CategoryDetailsCard from "./CategoryDetailsCard";

function CategoryDetails() {
	const id = useParams().id;
	const { user } = useContext(AuthContext);
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [productId, setProductId] = useState('');
	const [openModal, setOpenModal] = useState(false);

	const { isLoading, data: products = [], refetch } = useQuery({
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
				<div className="grid lg:gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center mt-10">
					{
						products.map(product => <CategoryDetailsCard key={product._id} product={product} setProductName={setProductName} setPrice={setPrice} setProductId={setProductId} setOpenModal={setOpenModal} refetch={refetch} />)
					}
				</div>
				{
					openModal && <BookingModal user={user} productName={productName} price={price} productId={productId} />
				}
			</>
		);
	}


}

export default CategoryDetails;