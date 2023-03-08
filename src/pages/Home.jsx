import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Sort from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import paginate from '../utils/pagination';

function Home() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isMounted = React.useRef(false);

   const { categoryId, selectedSort, valueSearch } = useSelector((state) => state.filters);
   const pizzas = useSelector((state) => state.pizzas.items);
   const status = useSelector((state) => state.pizzas.status);

   // ------------------ filtering pizzas by search
   const checkForMatch = (value1, value2) => {
      return value1.toLowerCase().includes(value2.toLowerCase());
   };
   const pizzaBySearch = pizzas.filter((obj) => checkForMatch(obj.title, valueSearch));

   // ------------------ pagination
   const totalItems = pizzaBySearch.length;
   const displayedItems = 4;
   const [selectedPage, setSelectedPage] = React.useState(1);
   const arrayCrop = paginate(pizzaBySearch, selectedPage, displayedItems);

   const handlePageChange = (pageIndex) => {
      setSelectedPage(pageIndex);
   };

   // ------------------ qs param
   // При первом рендере (если в URL вбиты параметры) парсит их в объект и передает в Redux
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         dispatch(setFilters(params));
      }
   }, []);

   // при первом рендере не вшиваем параметры в URL
   React.useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            categoryId,
            selectedSort,
         });

         navigate(`?${queryString}`);
      }
      isMounted.current = true;
   }, [categoryId, selectedSort]);

   
   // ------------------ get pizzas
   const getPizzas = async () => {

      setSelectedPage(1);
      const order = selectedSort.includes('-') ? `desc` : `asc`;
      const sortBy = selectedSort.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : ``;

      dispatch(
         fetchPizzas({
            order,
            sortBy,
            category,
         }),
      );
   };

   React.useEffect(() => {
      getPizzas();
   }, [categoryId, selectedSort]);



   const skeleton = [...new Array(4)].map((_, i) => (
      <div className="pizza-loading" key={i}>
         Загрузка...
      </div>
   ))
   const renderPizza = arrayCrop.map((obj) => <PizzaBlock key={obj.title} {...obj} />)

   return (
      <div className="container">
         <div className="content__top">

            <Categories category={categoryId} />
            <Sort sort={selectedSort} />

         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">

            {status === `loading`
               ? skeleton
               : renderPizza}

         </div>

         <Pagination
            totalItems={totalItems}
            displayedItems={displayedItems}
            onPageChange={handlePageChange}
            currentPage={selectedPage}
         />
         
      </div>
   );
}

export default Home;
