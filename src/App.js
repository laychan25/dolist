import "./App.css";
import ContainerNota from "./Components/containerNota/ContainerNota";
import ListaDeNotas from "./Components/ListaDeNotas/ListaDeNotas";
import SideBar from "./Components/menu/sidebar";

import { NotasProvider } from "./NotasContext";

function App() {
  return (
    <NotasProvider>
      <ContainerNota>
        <SideBar />
        <ListaDeNotas/>
      </ContainerNota>
    </NotasProvider>
  );
}

export default App;
