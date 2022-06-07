import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchDataLoop = (route) => {
  const [dataArray, setDataArray] = useState([]);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loopMutex, setLoopMutex] = useState(true);

  const fetchData = async () => {
    try {
      const { status, data } = await axios.get(route);
      if (status === 200) {
        if (data["fetchedDataArray"].length > 0) {
          const extendedDataArray = dataArray.concat(data["fetchedDataArray"]);
          setDataArray(extendedDataArray);
        }
      }
    } catch (error) {
      // 404 is usually the status, when there is no more data to fetch
      if (error.response.status === 404) {
        setNoMoreData(true);
      } else {
        console.error(error);
      }
      setLoopMutex(!loopMutex);
    }
    setLoopMutex(!loopMutex);
  };

  useEffect(() => {
    if (!noMoreData) {
      fetchData();
    }
  }, [loopMutex]);

  return <></>;
};

export default FetchDataLoop;