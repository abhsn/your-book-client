function ReactAngularVue() {
	return (
		<article className="mx-8 my-10">
			<h4 className="font-bold text-xl text-center mb-6 bg-base-300">React vs Angular vs Vue</h4>
			<h4 className="font-bold text-lg mb-2">Overview</h4>
			<p className="mb-4">React is a JavaScript library for web and mobile UI development. It is managed by Facebook. React was introduced in 2013. On the other hand, Angular is a JavaScript framework for web and mobile development. It's TypeScript based. Managed by Google's Angular team. Launched in 2016. Vue is an open sourced JavaScript framework. It was created by  Evan You and maintained by the core vue development team. Initialy launched in 2014. Vue offers both JavaScript and TypeScript</p>

			<h4 className="font-bold text-lg mb-2">Community</h4>
			<p className="mb-4">React is the most popular library out there. It has huge community backing up it development. Although the documentation is not that good but, it has larger community to get help. React is used by Facebook, Twitter, Netflix, PayPal, Yahoo, Uber. Angular is not that popular due to its deep learning curve. But once someone learns it, it doesn't hold them back. Angular is used by YouTube, HBO, Apple, AT&T, Adobe. Vue is not that popular compared to these giant twos. But, it gained huge popularity on initial launched. It's so much popluar in China and has a great community there. Companies like, Alibaba, BMW, Nintendo, Behance, Gitlab uses vue.</p>

			<h4 className="mb-2 font-bold text-lg">Learning curve</h4>
			<p className="mb-4">React is minimalistic. No dependency injection, no classic template. The library is beginner friendly for who already knows JavaScript. Since it is only a library users often need to use other library like, Redux. Meaning, it will cost you more time. Angular is consists of huge libraries. And learning all of them take really long time. Vue is easiest one all them to learn. Unlike React, users don't even have to know about JSX, ES2015. It has a great documentation.</p>

			<h4 className="mb-2 font-bold text-lg">Performance</h4>
			<p className="mb-4">React React's performance is greatly improved with the introduction of the virtual DOM. Since all virtual DOM trees are lightweight and built on server, the load on browser is reduced. Furthermore, since the data-binding process is unidirectional, bindings are not assigned watchers as in the case of Angular. Respectively, no additional workload is created. The performance of Angular apps is negatively affected by bidirectional data-binding. Each binding is assigned a watcher to track changes, and each loop continues until all the watchers and associated values are checked. Because of this, the more bindings you have, the more watchers are created, and the more cumbersome the process becomes. Vue has better performance than Angular and much more easier to optimized.</p>
		</article>
	);
}

export default ReactAngularVue;