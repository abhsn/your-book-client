function Slider() {
	return (
		<div className="carousel w-full h-[450px]">
			<div id="slide1" className="carousel-item relative w-full">
				{/* box shadow */}
				<div className="absolute top-0 right-0 bottom-0 left-0 shadow-[inset_10px_10px_1000px_1px_black] z-10"></div>

				{/* image */}
				<img src="https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?cs=srgb&dl=pexels-min-an-694740.jpg&fm=jpg&w=1280&h=768" className="w-full blur-sm object-cover" />

				{/* text */}
				<div className="absolute bottom-28 left-1/2 translate-x-[-50%] z-20">
					<h3 className="text-xl font-bold text-white text-center">Choose your favourite one</h3>
					<p className="text-center text-white mt-3">We have a plenty of options to choose from. You will never find end to our collection.</p>
				</div>

				{/* buttons */}
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
					<a href="#slide3" className="btn btn-circle">❮</a>
					<a href="#slide2" className="btn btn-circle">❯</a>
				</div>
			</div>

			<div id="slide2" className="carousel-item relative w-full">
				{/* box shadow */}
				<div className="absolute top-0 right-0 bottom-0 left-0 shadow-[inset_10px_10px_1000px_1px_black] z-10"></div>

				{/* image */}
				<img src="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?cs=srgb&dl=pexels-pixabay-159866.jpg&fm=jpg&w=1280&h=858" className="w-full blur-sm object-cover" />

				{/* text */}
				<div className="absolute bottom-28 left-1/2 translate-x-[-50%] z-20">
					<h3 className="text-xl font-bold text-white text-center">Book is your best friend</h3>
					<p className="text-center text-white mt-3">You can share all of your feelings with book. It will never betry you.</p>
				</div>

				{/* buttons */}
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
					<a href="#slide1" className="btn btn-circle">❮</a>
					<a href="#slide3" className="btn btn-circle">❯</a>
				</div>
			</div>

			<div id="slide3" className="carousel-item relative w-full">
				{/* box shadow */}
				<div className="absolute top-0 right-0 bottom-0 left-0 shadow-[inset_10px_10px_1000px_1px_black] z-10"></div>

				{/* image */}
				<img src="https://images.pexels.com/photos/5604947/pexels-photo-5604947.jpeg?cs=srgb&dl=pexels-yaroslav-shuraev-5604947.jpg&fm=jpg&w=1280&h=853" className="w-full blur-sm object-cover" />

				{/* text */}
				<div className="absolute bottom-28 left-1/2 translate-x-[-50%] z-20">
					<h3 className="text-xl font-bold text-white text-center">Affordable</h3>
					<p className="text-center text-white mt-3">You don't have to worry about your wallet. We have lots of scope to choose from.</p>
				</div>

				{/* buttons */}
				<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-20">
					<a href="#slide2" className="btn btn-circle">❮</a>
					<a href="#slide1" className="btn btn-circle">❯</a>
				</div>
			</div>
		</div>
	);
}

export default Slider;