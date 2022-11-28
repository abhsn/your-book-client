function UnitTest() {
	return (
		<article className="mx-8 mb-10">
			<h4 className="font-bold text-xl text-center mb-6 bg-base-300">What is unit test? Why should we write unit tests?</h4>
			<h4 className="font-bold text-lg mb-2">Unit test</h4>
			<p className="mb-4">In computer programming, unit testing is a software testing method by which individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.</p>

			<h4 className="font-bold text-lg mb-2">Why should you write unit tests?</h4>
			<p>The goal of unit testing is to isolate each part of the program and show that the individual parts are correct. A unit test provides a strict, written contract that the piece of code must satisfy. As a result, it affords several benefits.</p><br />

			<p>Unit testing finds problems early in the development cycle. This includes both bugs in the programmer's implementation and flaws or missing parts of the specification for the unit. The process of writing a thorough set of tests forces the author to think through inputs, outputs, and error conditions, and thus more crisply define the unit's desired behavior. The cost of finding a bug before coding begins or when the code is first written is considerably lower than the cost of detecting, identifying, and correcting the bug later. Bugs in released code may also cause costly problems for the end-users of the software. Code can be impossible or difficult to unit test if poorly written, thus unit testing can force developers to structure functions and objects in better ways.</p>

		</article>
	);
}

export default UnitTest;