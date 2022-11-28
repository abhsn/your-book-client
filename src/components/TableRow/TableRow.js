import toast from 'react-hot-toast';
import { BsTrash } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

function TableRow({ user, count, table, fetchSellers, fetchBuyers }) {
	const deleteUser = () => {
		fetch('https://b612-used-products-resale-server-side-abhsn.vercel.app/deleteUser', {
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

	const verifyUser = () => {
		fetch('https://b612-used-products-resale-server-side-abhsn.vercel.app/verifyUser', {
			method: 'POST',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				useremail: user.email
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast.success('Successfully verified user');
					fetchSellers();
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
						{
							user.isVerified && <span className='text-blue-500 text-xl'><GoVerified /></span>
						}
					</div>
				</td>
				<td>{user.email}</td>
				<th>
					<div className='flex items-center gap-4'>
						{
							table === 'sellers' && !user.isVerified && <button onClick={verifyUser} className='btn btn-primary btn-sm'>Verify</button>
						}
						<button className="text-2xl" onClick={deleteUser}><BsTrash /></button>
					</div>
				</th>
			</tr>
		</>
	);
}

export default TableRow;