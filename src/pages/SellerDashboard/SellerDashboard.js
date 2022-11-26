import { useState } from "react";
import AddProduct from "./AddProduct";

function SellerDashboard() {
	const [selected, setSelected] = useState('add');

	return (
		<div className="flex flex-col lg:flex-row">
			<div className="grid place-content-center lg:block">
				<ul className="menu menu-horizontal lg:menu-vertical lg:w-52 bg-base-200">
					<li onClick={() =>
						setSelected('add')}
						className={`${selected === 'add' && 'bordered'}`}
					><a>Add a product</a></li>
					<li onClick={() =>
						setSelected('all')}
						className={`${selected === 'all' && 'bordered'}`}
					><a>My products</a></li>
				</ul>
			</div>
			{
				selected === 'add' && <AddProduct setSelected={setSelected} />
			}

		</div >
	);
}

export default SellerDashboard;