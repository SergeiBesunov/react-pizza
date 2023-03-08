import { useDispatch } from 'react-redux'
import { changeCategory } from '../redux/slices/filterSlice'


function Categories({category}) {
   const dispatch = useDispatch()

   const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
   

const onClickCategoryItem = (index) => {
   dispatch((changeCategory(index)))
}

   return (
      <div className="categories">
         <ul>
            {categories.map((value, i) => (
               <li className={i === category ? `active` : ``}  key={i} onClick={()=>onClickCategoryItem(i)}>{value}</li>
            ))}
         </ul>
      </div>
   );
}

export default Categories;
