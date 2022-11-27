import notFound from '../../assets/images/404.png'

function NotFound() {
	return (
		<div className='grid place-items-center'>
			<img src={notFound} alt={'Not Found'} className="w-96" />
		</div>
	);
}

export default NotFound;