import { useContext, useEffect, useRef, useState } from "react";
import { NotasContext } from "../../NotasContext";
import Nota from "../Nota/Nota";
import styles from "./listadenotas.module.css";

const ListaDeNotas = () => {
  const { notas, setNotas } = useContext(NotasContext);

  const [click, setClicado] = useState(false);
  const posicaoInicial = useRef({ x: 0, y: 0 });
  const posicaoNotaInicial = useRef({ x: notas.left, y: notas.top });

  const notaArrastadaId = useRef(null);

  const valorMovido = useRef({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const [tamanhoConteiner, seTamanho] = useState({ width: 0, height: 0 });

  const notaWidth = 200;
  const notaHeight = 200;
  const padding = 20;

  useEffect(() => {
    if (containerRef.current) {
      seTamanho({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const inicioNota = (e, id, notaTop, notaLeft) => {
    setClicado(true);
    posicaoInicial.current = { x: e.clientX, y: e.clientY };
    notaArrastadaId.current = id;
    posicaoNotaInicial.current = { top: notaTop, left: notaLeft };
  };

  const MoveNota = (e) => {
    if (click) {
      valorMovido.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  };

  const soltaNota = () => {
    const id = notaArrastadaId.current;

    const maxX = tamanhoConteiner.width - notaWidth;
    const maxY = tamanhoConteiner.height - notaHeight;

    const deslocamentoX = valorMovido.current.x - posicaoInicial.current.x;
    const deslocamentoY = valorMovido.current.y - posicaoInicial.current.y;

    const novaLeft = posicaoNotaInicial.current.left + deslocamentoX;
    const novaTop = posicaoNotaInicial.current.top + deslocamentoY;

    const novoX = Math.max(padding, Math.min(novaLeft, maxX));
    const novoY = Math.max(padding, Math.min(novaTop, maxY));
    handleMove(id, novoX, novoY);
    setClicado(false);
    notaArrastadaId.current = null;
    posicaoNotaInicial.current = { top: 0, left: 0 };
  };

  useEffect(() => {
    document.addEventListener("mousemove", MoveNota);
    document.addEventListener("mouseup", soltaNota);

    return () => {
      document.removeEventListener("mousemove", MoveNota);
      document.removeEventListener("mouseup", soltaNota);
    };
  });

  const handleMove = (id, novoX, novoY) => {
    setNotas((prevNota) =>
      prevNota.map((nota) =>
        nota.id === id ? { ...nota, left: novoX, top: novoY } : nota
      )
    );
  };

  const apagaNota = (id) => {
    setNotas((prevNotas) =>
      prevNotas.filter((nota) => (nota.id === id ? false : true))
    );
  };

  return (
    <section ref={containerRef} className={styles.secao}>
      {notas.map((nota) => (
        <Nota
          className={styles.div}
          onClear={() => apagaNota(nota.id)}
          onMouseDown={(e) => inicioNota(e, nota.id, nota.top, nota.left)}
          key={nota.id}
          nota={nota.texto}
          notatop={nota.top}
          notaleft={nota.left}
          notaId={nota.id}
        />
      ))}
    </section>
  );
};

export default ListaDeNotas;
