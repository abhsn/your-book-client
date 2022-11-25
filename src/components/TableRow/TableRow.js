import { BsTrash } from 'react-icons/bs';

function TableRow({ user, count }) {
	return (
		<>
			<tr>
				<td>{count + 1}</td>
				<td>
					<div className="flex items-center space-x-3">
						<div className="font-bold">{user.name}</div>
					</div>
				</td>
				<td>{user.email}</td>
				<th>
					<button className="text-2xl"><BsTrash /></button>
				</th>
			</tr>
		</>
	);
}

export default TableRow;