import React, { useState, useEffect } from "react";

import "./App.css";

import CryptoDatas from "./CryptoData/pages/CroyptoData";

const App = () => {
  const { loadDatas, setLoadDatas } = useState();


  return (
    <div className="course-goals">
      <h2>Course Goals</h2>
      <CryptoDatas/>
    </div>
  );
};

export default App;
