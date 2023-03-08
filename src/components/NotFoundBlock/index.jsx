import styles from './NotFound.module.scss'

function NotFoundBlock() {

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>
            <span>🙁</span>
            <br />
            Ничего не найдено
         </h1>
         <p className={styles.description}>К сожалению данная страница отсутствует</p>
      </div>
   );
}

export default NotFoundBlock;
