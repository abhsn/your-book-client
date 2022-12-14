import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/serverFetch';
import Category from './Category';

function Categories() {
	const { isLoading, data: categories = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories
	})

	return (
		<div className='my-10'>
			<h2 className="font-bold text-2xl divider">Categories</h2>
			<p className='text-center'>Find your favourite type of book from below</p>
			{
				isLoading && <div className='mt-10 grid place-items-center'>
					<div className="text-center radial-progress animate-spin" style={{ "--value": "75", "--size": "12rem", "--thickness": "1rem" }}></div>
				</div>
			}
			{
				!isLoading && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center pt-10 gap-6'>
					{
						categories.map(category => <Category key={category._id} category={category} />)
					}
				</div>
			}
		</div>
	);
}

export default Categories;