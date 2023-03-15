import { useState } from "react";
import Column from "./Column";
import { checkIfSolved, generateArray } from "./funcs";
import { BsFillFastForwardFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";

const Container = ({
  hexesInColumn,
  columnsNumber,
  hexesSet,
  rotation,
  padding,
  solvedListener,
  nextListener,
}) => {
  const hexesToCheck = [...hexesSet];

  const [solved, setSolved] = useState(false);
  const [hexRotation, setHexRotation] = useState(rotation);

  const rotationArray = rotation.map((elem) => 0);

  const hexClickHandler = (id, bool) => {
    hexesToCheck[id] = bool;
    if (checkIfSolved(hexesToCheck)) {
      setSolved(true);
    }
  };

  const nextHandler = () => {
    setSolved(false);
    nextListener();
  };

  const refreshHandler = () => {
    setHexRotation([...rotation]);
    console.log("click");
  };

  return (
    <div
      className="container"
      style={{
        width: `${columnsNumber * 70}px`,
        maxWidth: "80vw",
        paddingLeft: `${padding}%`,
        background: `${solved ? "#211907" : "rgba(255, 250, 211, 1)"}`,
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
      <div className="buttons">
        <button className="button" onClick={nextHandler}>
          <BsFillFastForwardFill />
        </button>
        <button
          className="button"
          onClick={refreshHandler}
          disabled={solved ? true : false}
          style={{ opacity: `${solved ? 0.5 : 1}` }}
        >
          <MdRefresh />
        </button>
      </div>
    </div>
  );
};

export default Container;
