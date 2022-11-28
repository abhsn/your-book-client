import { useContext, useEffect, useState } from "react";
import { getBuyers, getReported, getSellers } from "../../api/serverFetch";
import ReportedItemRow from "../../components/ReportedItemRow/ReportedItemRow";
import TableRow from "../../components/TableRow/TableRow";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function Dashboard() {
	const [selected, setSelected] = useState('sellers');
	const [users, setUsers] = useState([]);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [table, setTable] = useState('');

	const fetchSellers = async () => {
		if (user?.email) {
			const data = await getSellers(user.email);
			setLoading(false);
			setUsers(data);
			setTable('sellers');
		}
	}

	useEffect(() => {
		fetchSellers();
	}, []);

	const fetchBuyers = async () => {
		if (user?.email) {
			const data = await getBuyers(user.email);
			setLoading(false);
			setUsers(data);
			setTable('buyers');
		}
	}

	const fetchReported = async () => {
		if (user?.email) {
			const data = await getReported(user.email);
			setLoading(false);
			setUsers(data);
			setTable('reported');
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

					<li onClick={() => {
						setSelected('reported');
						setLoading(true);
						fetchReported();
					}} className={`${selected === 'reported' && 'bordered'}`}><a>Reported Item</a></li>
				</ul>
			</div>

			{/* details of selected item from navbar */}
			{
				loading && <div className='flex-grow grid place-items-center'>
					<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "8rem", "--thickness": "1rem" }}></div>
				</div>
			}
			{
				!loading && selected !== 'reported' && <div className="flex-grow">
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
									users.length > 0 && users.map((user, count) => <TableRow table={table} key={user._id} count={count} user={user} fetchSellers={fetchSellers} fetchBuyers={fetchBuyers} />)
								}
							</tbody>
						</table>
					</div>
				</div>
			}
			{
				!loading && selected === 'reported' && <div className="flex-grow">
					<div className="overflow-x-auto w-full">
						<table className="table w-full">
							{/* table header */}
							<thead>
								<tr>
									<th>Count</th>
									<th>Image</th>
									<th>Product Name</th>
									<th>Seller Name</th>
									<th>Seller Email</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{/* rows */}
								{
									users.length > 0 && users.map((item, count) => <ReportedItemRow table={table} key={item._id} count={count} item={item} fetchReported={fetchReported} />)
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