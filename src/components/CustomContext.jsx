import React, { createContext, useEffect, useState } from "react";

import { stackedData } from "./Chart/ChartData";
import Axios from "axios";

export const CustomContext = createContext();

export const ContextProvider = (props) => {
  const [crudData, setCrudData] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [updateValue, setUpdateValue] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [addDataCrud, setaddDataCrud] = useState(false);

  const [stackedObj, setStackedObj] = useState(stackedData);
  const [updateDataStacked, setUpdateDataStacked] = useState(false);

  const initialStateMap = {
    mapDataSet: "/assets/states.json",
    openMapCrudModal: false,
    addMapCrudModal: false,
    updateDataMap: false,
  };

  const [stateMap, setStateMap] = useState(initialStateMap);

  const [mapDataArr, setMapDataArr] = useState();
  const [updateMapData, setUpdateMapData] = useState(true);

  useEffect(() => {
    Axios.get("/assets/states.json")
      .then((response) => {
        setMapDataArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(stateMap.mapDataSet)
      .then((response) => response.json())
      .then((data) => {
        // data will contain the content of states.json
        // Use the data as needed
      })
      .catch((error) => {
        console.error("Error fetching states data:", error);
      });
  }, [stateMap.mapDataSet]);

  return (
    <>
      <CustomContext.Provider
        value={{
          crudData,
          setCrudData,
          deleteId,
          setDeleteId,
          showToast,
          setShowToast,
          updateValue,
          setUpdateValue,
          isEdit,
          setIsEdit,
          stackedObj,
          setStackedObj,
          updateDataStacked,
          setUpdateDataStacked,
          mapDataArr,
          setMapDataArr,
          addDataCrud,
          setaddDataCrud,
        }}
      >
        {props.children}
      </CustomContext.Provider>
    </>
  );
};
