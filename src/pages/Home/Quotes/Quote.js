function Quote({ quote }) {
	return (
		<div className="card bg-base-100 w-full md:min-w-11/12 shadow-xl">
			<div className="card-body relative">
				<div className="absolute top-2 right-2">
					<img src="https://img.icons8.com/clouds/100/null/quote-left.png" alt="Quote" className="w-10 h-10" />
				</div>
				<div className="flex flex-row gap-4 items-center">
					{/* image */}
					<div className="avatar">
						<div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
							<img src={quote.img} />
						</div>
					</div>

					{/* text */}
					<div>
						<h2 className="card-title">{quote.name}</h2>
						<p className="mt-2 text-sm">{quote.quote}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quote;