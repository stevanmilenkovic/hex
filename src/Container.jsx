import { useState } from "react";
import Column from "./Column";
import { checkIfSolved, generateArray } from "./funcs";
import { BsFillFastForwardFill } from "react-icons/bs";

const Container = ({
  hexesInColumn,
  columnsNumber,
  hexesSet,
  rotation,
  padding,
  solvedListener,
  buttonListener,
}) => {
  const hexesToCheck = [...hexesSet];

  const [solved, setSolved] = useState(false);

  const rotationArray = rotation.map((elem) => 0);

  const hexClickHandler = (id, bool) => {
    hexesToCheck[id] = bool;
    if (checkIfSolved(hexesToCheck)) {
      setSolved(true);
    }
  };

  const buttonHandler = () => {
    setSolved(false);
    buttonListener();
  };

  return (
    <div
      className="container"
      style={{
        width: `${columnsNumber * 70}px`,
        maxWidth: "80vw",
        paddingLeft: `${padding}%`,
        background: `${solved ? "black" : "white"}`,
      }}
    >
      {generateArray(columnsNumber).map((elem) => (
        <Column
          hexesInColumn={hexesInColumn}
          columnsNumber={columnsNumber}
          hexes={hexesSet}
          colNum={elem}
          long={elem % 2 === 0 && true}
          key={Math.random()}
          hexClickListener={hexClickHandler}
          solved={solved}
          rotation={!solved ? rotation : rotationArray}
        />
      ))}
      <button className="button" onClick={buttonHandler}>
        <BsFillFastForwardFill />
      </button>
    </div>
  );
};

export default Container;
