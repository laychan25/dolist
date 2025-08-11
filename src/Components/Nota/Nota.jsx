import { useContext, useEffect, useRef, useState } from "react";
import styles from "./nota.module.css";
import { NotasContext } from "../../NotasContext";

const Nota = () => {
  const { notas, setNotas } = useContext(NotasContext);
  const handleChange = (id, novoTexto) => {
    setNotas((prevNota) =>
      prevNota.map((nota) =>
        nota.id === id ? { ...nota, texto: novoTexto } : nota
      )
    );
  };

  const [click, setClicado] = useState(false);
  const posicaoInicial = useRef({ x: 0, y: 0 });
  const posicaoNotaInicial = useRef({ top: 0, left: 0 });
  const notaArrastadaId = useRef(null);

const [valorMovido, setValorMovido] = useState({ x: 0, y: 0 });
  const [, setNovoValor] = useState({});

  const inicioNota = (e, id, notaTop, notaLeft) => {
    setClicado(true);
    posicaoInicial.current = { x: e.clientX, y: e.clientY };
    notaArrastadaId.current = id;
    posicaoNotaInicial.current = { top: notaTop, left: notaLeft };
  };

  const MoveNota = (e) => {
    if (click) {
      setValorMovido({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const soltaNota = () => {
    const id = notaArrastadaId.current;
    const deslocamentoX = valorMovido.x - posicaoInicial.current.x;
    const deslocamentoY = valorMovido.y - posicaoInicial.current.y;

    const novaLeft = posicaoNotaInicial.current.left + deslocamentoX;
    const novaTop = posicaoNotaInicial.current.top + deslocamentoY;

    setNovoValor({ top: novaTop, left: novaLeft });
    handleMove(id, novaTop, novaLeft);
    setClicado(false);
    notaArrastadaId.current = null;
  };

  useEffect(() => {
    if (click === true) {
      document.addEventListener("mousemove", (e) => MoveNota(e));
      document.addEventListener("mouseup", soltaNota);
    }
    return () => {
      document.removeEventListener("mousemove", MoveNota);
      document.removeEventListener("mouseup", soltaNota);
    };
  }, [click]);

  const handleMove = (id, top, left) => {
    setNotas((prevNota) =>
      prevNota.map((nota) =>
         nota.id === id ? { ...nota, top, left } : nota
      )
    );
  };

  return (
    <>
      {notas.map((nota) => (
        <div
          key={nota.id}
          //onMouseDown={(e) => inicioNota(e, nota.id, nota.top, nota.left)}
          style={{ position: 'absolute', left: `${nota.left}px`, top: `${nota.top}px` }}

        >
          <textarea
            className={`${styles.nota}`}
            value={nota.texto}
            onChange={(e) => handleChange(nota.id, e.target.value)}
          ></textarea>
        </div>
      ))}
    </>
  );
};

export default Nota;
