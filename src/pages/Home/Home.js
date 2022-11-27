import { useEffect, useState } from "react";
import AdvertisedItems from "./AdvertisedItems/AdvertisedItems";
import Categories from "./Categories";

function Home() {
	const [advertised, setAdvertised] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/getAdversied')
			.then(res => res.json())
			.then(data => setAdvertised(data));
	}, []);

	return (
		<>
			<Categories />
			{
				advertised.length > 0 && <AdvertisedItems advertised={advertised} />
			}
		</>
	);
}

export default Home;