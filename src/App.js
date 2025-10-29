import "./App.css";
import ContainerNota from "./components/containerNota/ContainerNota";
import ListaDeNotas from "./components/ListaDeNotas/ListaDeNotas";
import SideBar from "./components/menu/sidebar";

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
