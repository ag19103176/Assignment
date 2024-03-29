import React from "react";

function searchInput({ value, onChange }) {
  return <input type="text" value={value} onChange={onChange} />;
}

export default searchInput;
