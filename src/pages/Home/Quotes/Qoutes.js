import { useEffect, useState } from "react";
import Quote from "./Quote";

function Quotes() {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		fetch('https://b612-used-products-resale-server-side-abhsn.vercel.app/quotes')
			.then(res => res.json())
			.then(data => setQuotes(data));
	}, []);

	return (
		<section className="my-10">
			<h3 className="divider text-2xl font-bold">Testimonial</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center my-4 gap-6 mx-4">
				{
					quotes.map(quote => <Quote key={quote._id} quote={quote} />)
				}
			</div>
		</section>
	);
}

export default Quotes;