import { useContext, useState } from "react";
import { getBuyers, getSellers } from "../../api/serverFetch";
import TableRow from "../../components/TableRow/TableRow";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function Dashboard() {
	const [selected, setSelected] = useState('sellers');
	const [users, setUsers] = useState([]);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	const fetchSellers = async () => {
		if (user?.email) {
			const data = await getSellers(user.email);
			setLoading(false);
			setUsers(data);
		}
	}

	const fetchBuyers = async () => {
		if (user?.email) {
			const data = await getBuyers(user.email);
			setLoading(false);
			setUsers(data);
		}
	}

	return (
		<div className="lg:flex">
			{/* dashboard navbar for admin */}
			<div className="grid place-content-center lg:block">
				<ul className="menu menu-horizontal lg:menu-vertical lg:w-52 bg-base-200">
					<li onClick={() => {
						setSelected('sellers');
						setLoading(true);
						fetchSellers();
					}} className={`${selected === 'sellers' && 'bordered'}`}><a>All Sellers</a></li>

					<li onClick={() => {
						setSelected('buyers');
						setLoading(true);
						fetchBuyers();
					}} className={`${selected === 'buyers' && 'bordered'}`}><a>All Buyers</a></li>

					<li onClick={() => setSelected('reported')} className={`${selected === 'reported' && 'bordered'}`}><a>Reported Item</a></li>
				</ul>
			</div>

			{/* details of selected item from navbar */}
			{
				loading && <div className='flex-grow grid place-items-center'>
					<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "8rem", "--thickness": "1rem" }}></div>
				</div>
			}
			{
				!loading && <div className="flex-grow">
					<div className="overflow-x-auto w-full">
						<table className="table w-full">
							{/* table header */}
							<thead>
								<tr>
									<th>Count</th>
									<th>Name</th>
									<th>Email</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{/* rows */}
								{
									users.length > 0 && users.map((user, count) => <TableRow key={user._id} count={count} user={user} />)
								}
							</tbody>
						</table>
					</div>
				</div>
			}
		</div>
	);
}

export default Dashboard;