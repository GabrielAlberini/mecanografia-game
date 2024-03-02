import { useState, useEffect } from "react";
import db from "./db/data.json";

const App = () => {
  const [dataLeng, setDataLeng] = useState([]);
  const [randomText, setRandomText] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dataLeng.length);
    setRandomText(dataLeng[randomIndex]?.text);
  }, [dataLeng]);

  const selectText = (event) => {
    const selectedLanguage = event.target.value;
    const filteredData = db.filter(
      (phrase) => phrase.language === selectedLanguage
    );

    setDataLeng(filteredData);

    const randomIndex = Math.floor(Math.random() * filteredData.length);
    setRandomText(filteredData[randomIndex]?.text);
  };

  const printText = (e) => {
    if (e.key === randomText.charAt(0)) {
      console.log("Es la letra.");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", printText);

    return () => {
      document.removeEventListener("keydown", printText);
    };
  }, [randomText]);

  return (
    <>
      <div>
        <h1>Mecanografía App</h1>
        <select onChange={selectText}>
          <option value="es">ES</option>
          <option value="fr">FR</option>
          <option value="de">DE</option>
          <option value="it">IT</option>
          <option value="pt">PT</option>
        </select>
      </div>
      <div onKeyDown={printText} tabIndex="0">
        <p>{randomText}</p>
      </div>
    </>
  );
};

export { App };
