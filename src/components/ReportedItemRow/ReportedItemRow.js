import { BsTrash } from 'react-icons/bs';

function ReportedItemRow({ item, count, table, }) {
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
					<button className="text-2xl"><BsTrash /></button>
				</th>
			</tr>
		</>
	);
}

export default ReportedItemRow;