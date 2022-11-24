import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../api/categoriesFetch';
import Category from './Category';

function Categories() {
	const { isLoading, data: categories = [] } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories
	})

	// console.log(isLoading);
	// console.log(categories);

	return (
		<>
			<h2 className="font-bold text-2xl divider mt-10">Categories</h2>
			{
				!isLoading && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center pt-10'>
					{
						categories.map(category => <Category category={category} />)
					}
				</div>
			}
		</>
	);
}

export default Categories;