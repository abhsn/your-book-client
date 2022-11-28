function Prototype() {
	return (
		<article className="mx-8 mb-10">
			{/* article title */}
			<h4 className="font-bold text-xl text-center mb-6 bg-base-300">How does prototypical inheritance work?</h4>
			<p>In JavaScript, an object can inherit properties of another object. The object from where the properties are inherited is called the prototype.</p><br />

			<p>When we try to access a property of an object, the property is not only searched in the object itself. It's also searched in the prototype of the object, in the prototype of the prototype, and so on - until a property is found that matches the name or the end of the prototype chain is reached. If the property or method isn't found anywhere in the prototype chain, only then will JavaScript return undefined. Every object in JavaScript has an internal property called <code>[[Prototype]]</code>. To find the <code>[[Prototype]]</code> of an object, we will use the <code>Object.getPrototypeOf()</code> method.</p>
		</article>
	);
}

export default Prototype;