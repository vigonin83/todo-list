import styles from './loading.module.scss'

const Loading = () => {
   return (
      <div className={styles.wrapper}>
         <h2 className={styles.title}>
            Идет загрузка . . .
         </h2>
      </div>
    );
}

export default Loading;