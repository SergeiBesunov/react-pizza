import style from './Pagination.module.scss';

 function Pagination({ totalItems, displayedItems, onPageChange, currentPage }) {
   
   const totalBullet = Math.ceil(totalItems / displayedItems);

   if (totalBullet === 1) {
      return null;
   }

   let arrayBullet = [];

   const createArrayBull = (totalBull, array) => {
      for (let i = 1; i <= totalBull; i++) {
         array.push(i);
      }
   };
   createArrayBull(totalBullet, arrayBullet);

   return (
      <nav className={style.root}>
         <ul>
            <li onClick={() => onPageChange((prev)=>prev > 1 ? prev-1 : prev)}>
               <button>{`<`}</button>
            </li>
            {arrayBullet.map((page) => (
               <li key={page} onClick={() => onPageChange(page)}>
                  <button className={`${page === currentPage ? style.active : ''}`}>{page}</button>
               </li>
            ))}
            <li onClick={() => onPageChange((prev)=>prev < arrayBullet.length ? prev + 1 : prev)}>
               <button>{`>`}</button>
            </li>
         </ul>
      </nav>
   );
}

export default Pagination
