import Prototype from "./Prototype";
import ReactAngularVue from "./ReactAngularVue";
import State from "./State";
import UnitTest from "./UnitTest";

function Blog() {
	return (
		<section className="my-10">
			<h3 className="text-center font-bold text-2xl mb-8">Blog</h3>
			<State />
			<UnitTest />
			<ReactAngularVue />
			<Prototype />
		</section>
	);
}

export default Blog;