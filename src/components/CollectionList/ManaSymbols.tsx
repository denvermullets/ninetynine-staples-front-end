import React from "react";

const ManaSymbols = ({ manaCost }) => {
  const removeBrace = manaCost.replace(/[{]/g, "");
  const result = removeBrace.split("}").filter(Boolean);

  const symbols = result.map((symbol, index) => (
    <i className={`ms ms-${symbol.toLowerCase()} ms-cost`} key={symbol + index} />
  ));

  return <>{symbols}</>;
};

export default ManaSymbols;
