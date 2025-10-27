import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotasContext = createContext();

export function NotasProvider({ children }) {
  const [notas, setNotas] = useState(() => {
    const salvas = localStorage.getItem("notas");
    return salvas ? JSON.parse(salvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("notas", JSON.stringify(notas));
  }, [notas]);

  const criaNota = () => {
    setNotas((prevNotas) => {
      const ultimaNota = prevNotas[prevNotas.length - 1];

      const left = ultimaNota ? ultimaNota.left + 20 : 20;
      const top = ultimaNota ? ultimaNota.top + 20 : 20;

      const novaNota = {
        id: uuidv4(),
        texto: "",
        left,
        top,
      };

      return [...prevNotas, novaNota];
    });
  };

  let contexto = {
    notas,
    setNotas,
    criaNota,
  };

  return (
    <NotasContext.Provider value={contexto}>{children}</NotasContext.Provider>
  );
}
