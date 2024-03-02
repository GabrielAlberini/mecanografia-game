import { useEffect, useState } from "react";

const App = () => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("hola como estas, muy bien y vos?");
  const [partialWord, setPartialWord] = useState("");
  const [error, setError] = useState(false); // Nuevo estado para gestionar errores

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === word.charAt(index)) {
        setError(false); // Restablecer el estado de error
        setPartialWord(
          (prevPartialWord) => prevPartialWord + word.charAt(index)
        );
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        setError(true); // Establecer el estado de error si la letra es incorrecta
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpia el event listener en cada render
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, word, error]); // Agrega el estado de error a las dependencias del efecto

  // Actualiza word fuera del efecto
  useEffect(() => {
    setWord(partialWord + word.slice(index));
  }, [partialWord, index, word]);

  console.log(partialWord, "string de palabra que se va haciendo");
  console.log(index, "index");

  const greenStyle = {
    color: "green",
  };

  const redStyle = {
    color: "red",
  };

  return (
    <h1>
      {word.split("").map((char, i) => (
        <span
          key={i}
          style={
            i < partialWord.length
              ? greenStyle
              : i === partialWord.length && error
              ? redStyle
              : {}
          }
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export { App };
