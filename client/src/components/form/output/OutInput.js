import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../../contexts/FormContext";

function OutInput(props) {
    if(props.value1 === 'input') {
      switch (props.value2) {
        case "Text":
          return (
              <h1 className="">Đã chọn text</h1>
          )
        case "Number":
          return (
              <h1 className="text-center">Đã chọn number</h1>
          )
        case "Images":
          return (
              <h1 className="text-center">Đã chọn image</h1>
          )
        case "Date":
          return (
              <h1 className="text-center">Đã chọn date</h1>
          )
        case "File":
          return (
              <h1 className="text-center">Đã chọn file</h1>
          )
        default:
          return;
          }
    }
}

export default OutInput;