function State() {
	return (
		<article className="mx-8 mb-10">
			{/* article title */}
			<h4 className="font-bold text-xl text-center mb-6 bg-base-300">What are the different ways to manage a state in React?</h4>

			<p>There are four types of state management in React, Local state, Globale state, Server state, URL state</p>

			<br />

			<p><strong>Local state:</strong> when we manage components state that is local state. Local state is most often managed in React using the useState hook. Local state is most often managed in React using the useState hook. For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form's inputs.</p>
			<br />

			<p><strong>Global state:</strong> Global state is data we manage across multiple components. A common example of global state is authenticated user state. If a user is logged into our app, it is necessary to get and change their data throughout our application.</p>
			<br />

			<p><strong>Server state:</strong> Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state. There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.</p><br />

			<p><strong>URL state:</strong> Data that exists on our URLs, including the pathname and query parameters. URL state is often missing as a category of state, but it is an important one. In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!</p>
		</article>
	);
}

export default State;