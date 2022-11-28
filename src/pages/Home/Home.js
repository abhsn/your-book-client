import { useEffect, useState } from "react";
import setTitle from "../../utils/setTitle";
import AdvertisedItems from "./AdvertisedItems/AdvertisedItems";
import Categories from "./Categories";
import Quotes from "./Quotes/Qoutes";
import Slider from "./Slider";

function Home() {
	const [advertised, setAdvertised] = useState([]);

	setTitle('Home');

	useEffect(() => {
		fetch('https://b612-used-products-resale-server-side-abhsn.vercel.app/getAdversied')
			.then(res => res.json())
			.then(data => setAdvertised(data));
	}, []);

	return (
		<>
			<Slider />
			<Categories />
			{
				advertised.length > 0 && <AdvertisedItems advertised={advertised} />
			}
			<Quotes />
		</>
	);
}

export default Home;