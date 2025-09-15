import { useContext, useEffect, useRef, useState } from "react";
import styles from "./nota.module.css";
import { NotasContext } from "../../NotasContext";
import React from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import './estilo-quill.css'
import { Quill } from "react-quill";

const Nota = () => {
  const { notas, setNotas } = useContext(NotasContext);

  const quillref = useRef({});

  const handleChange = (id, novoTexto) => {
    setNotas((prevNota) =>
      prevNota.map((nota) =>
        nota.id === id ? { ...nota, texto: novoTexto } : nota
      )
    );
    localStorage.setItem("notas", JSON.stringify((notas.texto = novoTexto)));
  };

  const [click, setClicado] = useState(false);
  const posicaoInicial = useRef({ x: 0, y: 0 });
  const posicaoNotaInicial = useRef({ x: notas.left, y: notas.top });

  const [bold, setBold] = useState(false);

  const notaArrastadaId = useRef(null);

  const valorMovido = useRef({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const [tamanhoConteiner, seTamanho] = useState({ width: 0, height: 0 });

  const notaWidth = 200;
  const notaHeight = 200;
  const padding = 20;

  const [zIndexMax, setIndex] = useState(2);

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

  const handleCor = (id, cor) => {
    setNotas((prevNotas) =>
      prevNotas.map((nota) => (nota.id === id ? { ...nota, cor: cor } : nota))
    );
  };

  const handleFoco = (id) => {
    setNotas((prevNotas) =>
      prevNotas.map((nota) =>
        nota.id === id ? { ...nota, zIndex: zIndexMax } : nota
      )
    );
    setIndex((prev) => prev + 1);
  };

  const apagaNota = (id) => {
    setNotas((prevNotas) =>
      prevNotas.filter((nota) => (nota.id === id ? false : true))
    );
  };

  return (
    <section ref={containerRef} className={styles.secao}>
      {notas.map((nota) => (
        <React.Fragment key={nota.id}>
          <div
            onMouseDown={(e) => inicioNota(e, nota.id, nota.top, nota.left)}
            style={{
              position: "absolute",
              left: `${nota.left}px`,
              top: `${nota.top}px`,
              zIndex: `${nota.zIndex}`,
            }}
          >
            <header className={styles.cabecalho}>
              
                <div className={styles.divBotao}>
                <button
                  onClick={() => apagaNota(nota.id)}
                  className={styles.botaoApagar}
                >
                  X
                </button>
              </div>
            
              <div
                key={nota.id}     
                ref={(el) => {
                  if (el && !quillref.current[nota.id]) {
                    quillref.current[nota.id] = new Quill(el, {
                      theme: "snow",
                      modules: {
                        toolbar: [['bold', 'italic', 'underline'],       
                            [{ 'list': 'bullet' }]  
                     ] },
                       placeholder: 'Anote aqui'
                    });
                    quillref.current[nota.id].on("text-change", () => {
                      handleChange(
                        nota.id,
                        quillref.current[nota.id].root.innerHTML);
                    });
                  }
                }}
              />
            </header>
            
          </div>
        </React.Fragment>
      ))}
    </section>
  );
};

export default Nota;
