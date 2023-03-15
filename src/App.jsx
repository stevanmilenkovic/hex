import "./App.css";
import { generateArray, randomElement } from "./funcs";
import { generator } from "./generator";
import { useState } from "react";
import Container from "./Container";

function App() {
  const [hexesInColumn, setHexesInColumn] = useState(
    randomElement(generateArray(8, 5))
  );
  const [columnsNumber, setColumnsNumber] = useState(
    randomElement(generateArray(7, 5))
  );

  const [level, setLevel] = useState(1);

  const padding = (100 / columnsNumber) * 0.1339 * (columnsNumber - 1);

  const hexesSet = generator(hexesInColumn, columnsNumber);
  const rotation = hexesSet.map((elem) => randomElement(generateArray(6)));

  const nextHandler = () => {
    setHexesInColumn(randomElement(generateArray(8, 5)));
    setColumnsNumber(randomElement(generateArray(7, 5)));
    setLevel((prev) => prev + 1);
  };

  return (
    <div className="App">
      <div className="main">
        <Container
          hexesInColumn={hexesInColumn}
          columnsNumber={columnsNumber}
          hexesSet={hexesSet}
          rotation={rotation}
          padding={padding}
          nextListener={nextHandler}
        />
      </div>
    </div>
  );
}

export default App;
