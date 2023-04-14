import React from "react";

const ManaSymbols = ({ manaCost }) => {
  const removeBrace = manaCost.replace(/[{]/g, "");
  const result = removeBrace.split("}").filter(Boolean);

  const symbols = result.map((symbol, index) => {
    const symbolName = symbol.toLowerCase().replace("/", "");
    const className = `ms ms-${symbolName} ms-cost`;
    return <i className={className} key={symbol + index} />;
  });

  return <>{symbols}</>;
};

export default ManaSymbols;
