import { useState } from "react";
import classes from "./Hex.module.css";
import HexSymbol from "./HexSymbol";

const Hex = ({ hex, id, hexClickListener, solved, rotation }) => {
  const [rotate, setRotate] = useState(rotation);

  if (!solved) {
    if (hex.name === "tripleThird" && rotate % 2 === 0) {
      hexClickListener(id, true);
    }

    if (
      ["doubleStraight", "quadCross"].includes(hex.name) &&
      rotate % 3 === 0
    ) {
      hexClickListener(id, true);
    }

    if (["empty", "omniHex"].includes(hex.name) || rotate === 0) {
      hexClickListener(id, true);
    }
  }

  const hexClickHandler = () => {
    if (!solved) {
      if (
        ["doubleStraight", "quadCross"].includes(hex.name) &&
        (rotate + 1) % 3 === 0
      ) {
        hexClickListener(id, true);
        setRotate((prev) => prev + 1);
      } else if (hex.name === "tripleThird" && (rotate + 1) % 2 === 0) {
        hexClickListener(id, true);
        setRotate((prev) => prev + 1);
      } else if ((rotate + 1) % 6 === 0) {
        hexClickListener(id, true);
        setRotate((prev) => prev + 1);
      } else {
        hexClickListener(id, false);
        setRotate((prev) => prev + 1);
      }
    }
  };

  return (
    <div
      className={classes.hex}
      style={{
        transform: `rotate(${hex.angle + rotate * 60}deg)`,
        cursor: `${hex.name !== "empty" ? "pointer" : "default"}`,
      }}
      onClick={hexClickHandler}
    >
      <HexSymbol name={hex.name} />
    </div>
  );
};

export default Hex;
