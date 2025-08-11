import './App.css';
import ContainerNota from './Components/menu/containerNota/containerNota';
import SideBar from './Components/menu/sidebar';
import Nota from './Components/Nota/Nota';
import { NotasProvider } from './NotasContext';

function App() {
  return (
    <NotasProvider>
      <div className="App">
        <SideBar/>
        <ContainerNota>
        <Nota/>
        </ContainerNota>
      </div>
    </NotasProvider>
  );
}

export default App;
