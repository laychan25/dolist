import { useEffect, useRef } from "react";
import { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import styles from "./nota.module.css";

const Nota = ({ nota, onMouseDown, notatop, notaleft, onClear, notaId }) => {
  const editor = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editor.current) return;

    if (!quillRef.current) {
      quillRef.current = new Quill(editor.current, {
        theme: "snow",
        modules: {
          toolbar: [["bold", "italic", "underline"]],
        },
        placeholder: "Anote aqui...",
      });
    }

    const saved = localStorage.getItem(notaId); // notaId puro
    if (saved) {
      try {
        const delta = JSON.parse(saved);
        quillRef.current.setContents(delta);
      } catch (err) {
        console.log("Não foi possível carregar as notas:", err);
      }
    }

    const handleChange = () => {
      const delta = quillRef.current.getContents();
      localStorage.setItem(notaId, JSON.stringify(delta));
    };
    quillRef.current.on("text-change", handleChange);

    return () => quillRef.current.off("text-change", handleChange);
  }, [notaId]);

  return (
    <section
      className={styles.nota}
      style={{
        position: "absolute",
        left: `${notaleft}px`,
        top: `${notatop}px`,
      }}
    >
      <div className={styles.containerBotao}>
        <button className={styles.botaoApaga} onClick={onClear}>
          X
        </button>
      </div>
      <div className={styles.div} onMouseDown={onMouseDown} ref={editor}>
        {nota.texto}
      </div>
    </section>
  );
};

export default Nota;
