import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { changeValueSearch } from '../../redux/slices/filterSlice';

import closeSvg from '../../assets/img/close.svg';

import style from './Search.module.scss';

function Search() {
   const [searchValue, setSearchValue] = React.useState(``);
   const dispatch = useDispatch();

   const sendValueToRedux = React.useCallback(
      debounce((value) => {
         dispatch(changeValueSearch(value));
      }, 500),
      [],
   );

   const onChangeValueSearch = (value) => {
      setSearchValue((prev) => value);
      sendValueToRedux(value);
   };

   const resetSearch = () => {
      setSearchValue(``)
      dispatch(changeValueSearch(``))
   }

   return (
      <div className={style.root}>
         <input
            className={style.input}
            type="text"
            placeholder="Поиск пиццы..."
            value={searchValue}
            onChange={(e) => onChangeValueSearch(e.target.value)}
         />
         {searchValue.length > 0 && <img className={style.closeImg} src={closeSvg} alt="close" onClick={resetSearch}/>}
      </div>
   );
}

export default Search;
