import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';

function ReportedItemRow({ item, count, fetchReported }) {

	const deleteReported = () => {
		fetch(`https://b612-used-products-resale-server-side-abhsn.vercel.app/deleteReported/${item._id}`, {
			method: "delete",
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully deleted item');
					fetchReported();
				} else {
					toast.error('An error occurred');
				}
			})
	}

	return (
		<>
			<tr>
				<td>{count + 1}</td>
				<td>
					<img src={item.img} className="w-20 h-20 object-cover" />
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div className="font-bold">{item.productName}</div>
					</div>
				</td>
				<td>{item.sellerName}</td>
				<td>{item.sellerEmail}</td>
				<th>
					<button onClick={deleteReported} className="text-2xl"><BsTrash /></button>
				</th>
			</tr>
		</>
	);
}

export default ReportedItemRow;