import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

const CryptoDatas = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { loadDatas, setLoadDatas } = useState();

  useEffect(() => {
    console.log('fetch');
    const fetchData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/data");
        
        console.log(responseData);
        setLoadDatas(responseData);
        // console.log(loadDatas);
      } catch (err) {}
    };
    fetchData();
    console.log(loadDatas);
    console.log('fetched');
  }, [sendRequest]);

  return (
    <ul>hi</ul>
  );
};

export default CryptoDatas;
