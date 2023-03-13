import { generateArray } from "./funcs";
import Hex from "./Hex";
import classes from "./Column.module.css";

const Column = ({
  long,
  colNum,
  columnsNumber,
  hexesInColumn,
  hexes,
  hexClickListener,
  solved,
  rotation,
}) => {
  const longColumn = long ? 1 : 0;

  return (
    <div
      className={`${classes.column} ${!long && classes.short}`}
      style={{
        width: `${100 / columnsNumber}%`,
        left: `-${(100 / columnsNumber) * 0.1339 * colNum}%`,
        marginTop: `${!long ? 50 / columnsNumber : 0}%`,
      }}
    >
      {generateArray(hexesInColumn + longColumn).map((elem) => (
        <Hex
          solved={solved}
          key={Math.random()}
          hex={hexes[colNum * hexesInColumn + Math.ceil(colNum / 2) + elem]}
          id={colNum * hexesInColumn + Math.ceil(colNum / 2) + elem}
          hexClickListener={hexClickListener}
          rotation={
            rotation[colNum * hexesInColumn + Math.ceil(colNum / 2) + elem]
          }
        />
      ))}
    </div>
  );
};

export default Column;
