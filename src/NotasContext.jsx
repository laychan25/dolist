import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotasContext = createContext();

export function NotasProvider({ children }) {
  const [notas, setNotas] = useState([]);

  const SalvaNovaNota = (novaNota) => {
    setNotas([...notas, novaNota]);
  };

  const criaNota = () => {
    setNotas((prevNotas) => {
      const ultimaNota = prevNotas[prevNotas.length - 1];

      const left = ultimaNota ? ultimaNota.left + 20 : 20;
      const top = ultimaNota ? ultimaNota.top + 20 : 20;

      const novaNota = {
        id: uuidv4(),
        texto: "",
        cor: "#923333",
        left,
        top,
      };

      return [...prevNotas, novaNota];
    });
  };

  let contexto = {
    notas,
    setNotas,
    SalvaNovaNota,
    criaNota,
  };
  return (
    <NotasContext.Provider value={contexto}>{children}</NotasContext.Provider>
  );
}
