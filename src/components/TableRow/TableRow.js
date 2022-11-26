import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';

function TableRow({ user, count, table, fetchSellers, fetchBuyers }) {
	const deleteUser = () => {
		fetch('http://localhost:5000/deleteUser', {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				useremail: user.email
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully deleted user');
					if (table === 'sellers') {
						fetchSellers();
					} else if (table === 'buyers') {
						fetchBuyers();
					}
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
					<div className="flex items-center space-x-3">
						<div className="font-bold">{user.name}</div>
					</div>
				</td>
				<td>{user.email}</td>
				<th>
					<button className="text-2xl"
						onClick={() => {
							deleteUser();
						}}
					><BsTrash /></button>
				</th>
			</tr>
		</>
	);
}

export default TableRow;