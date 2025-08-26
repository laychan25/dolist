import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const NotasContext = createContext();

export function NotasProvider({ children }) {
  const [notas, setNotas] = useState([]);

  localStorage.setItem("notas", JSON.stringify(notas));

  const SalvaNovaNota = (novaNota) => {
    setNotas([...notas, novaNota]);
  };

  const salvaLocalStorage = () => {
    let notasString = JSON.stringify(notas)
    localStorage.setItem('notas', notasString);
 
  };
  
  const buscaNotas=()=>{
    const dados = localStorage.getItem('notas')
    if(!dados){
     let response = JSON.parse(dados)
      setNotas(response)
      console.log('alo')
    }
  }

  
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

      return [...prevNotas, novaNota];
    });
  };

  

  useEffect(()=>{
   buscaNotas()
  },[])

  let contexto = {
    notas,
    setNotas,
    SalvaNovaNota,
    criaNota,
    salvaLocalStorage,
  };
  return (
    <NotasContext.Provider value={contexto}>{children}</NotasContext.Provider>
  );
}
