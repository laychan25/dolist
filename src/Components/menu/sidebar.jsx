import { useContext} from 'react'
import styles from './sidebar.module.css'
import { NotasContext } from '../../NotasContext'


const SideBar =()=>{

  const {criaNota}= useContext(NotasContext)

  const novaNota =()=>{
    criaNota()
  }
    return(
      <aside className={styles.aside}>
       <h1 className={styles.titulo}>Notas</h1>
        <hr className={styles.linha}></hr>
        <button onClick={novaNota} className={styles.botao}>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#fff8f8"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
        </button>
      </aside>
    )
}

export default SideBar