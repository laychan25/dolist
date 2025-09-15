import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


export const NotasContext = createContext();

export function NotasProvider({ children }) {
  const [notas, setNotas] = useState(()=>{
     const saved = localStorage.getItem('notas');
     return saved ? JSON.parse(saved) : []
  });

  
useEffect(()=>{
localStorage.setItem('notas', JSON.stringify(notas))
},[notas])

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
        cor: "##c291ca",
        left,
        top,
        zIndex: 1,
      };
      localStorage.setItem('notas', JSON.stringify(novaNota))
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
