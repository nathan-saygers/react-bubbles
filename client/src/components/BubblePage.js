import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const removeDeletedColors = delID => {
    const filteredArr = colorList.filter(item => item.id !== delID.data)
    setColorList(filteredArr);
  }

  const removeEditedColor = colorToEdit => {
    const filteredArr = colorList.filter(item => item.id !== colorToEdit.id)
    setColorList([...filteredArr, colorToEdit]);
    console.log('Color list after being set to filtered array', colorList)
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/colors',
      {headers: {
        Authorization: localStorage.getItem('token')
      }})
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} removeDeletedColors={removeDeletedColors} removeEditedColor={removeEditedColor}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
