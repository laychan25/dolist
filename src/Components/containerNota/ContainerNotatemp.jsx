import styles from './container.module.css'

const ContainerNota =({children})=>{
    return(
        <section className={styles.container}>
            {children}
        </section>
    )
}

export default ContainerNota