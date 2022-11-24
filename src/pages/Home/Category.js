import { Link } from "react-router-dom";

function Category({ category }) {
	const { name, img, _id } = category;
	return (
		<div className="card card-compact bg-base-100 shadow-xl">
			<figure><img src={img} className="h-[480px]" alt={name} /></figure>
			<div className="card-body">
				<h3 className="card-title">{name}</h3>
				{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
				<div className="card-actions justify-end">
					<Link className="btn btn-primary" to={`/category/${_id}`}>View items</Link>
				</div>
			</div>
		</div>
	);
}

export default Category;