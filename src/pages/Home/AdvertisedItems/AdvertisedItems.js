import { useContext, useState } from "react";
import toast from "react-hot-toast";
import BookingModal from "../../../components/BookingModal/BookingModal";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import AdvertisedItem from "./AdvertiseItem";

function AdvertisedItems({ advertised }) {
	const { user } = useContext(AuthContext);
	const [productName, setProductName] = useState('');
	const [price, setPrice] = useState('');
	const [productId, setProductId] = useState('');
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className="my-10">
			<h2 className="font-bold text-2xl divider mb-10">Advertised Items</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
				{
					advertised.map(advertise => <AdvertisedItem key={advertise._id} advertise={advertise} setProductName={setProductName} setPrice={setPrice} setProductId={setProductId} setOpenModal={setOpenModal} user={user} />)
				}
				{
					user?.email && openModal && <BookingModal user={user} productName={productName} price={price} productId={productId} />
				}
			</div>
		</div>
	)
}

export default AdvertisedItems;