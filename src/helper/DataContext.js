import React, { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState();

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, handleDataChange }}>
      {children}
    </DataContext.Provider>
  );
}
