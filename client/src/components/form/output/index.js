import React, { useContext, useState, useEffect } from "react";
import { FormContext } from "../../../contexts/FormContext";
import OutInput from './OutInput'
const Commom = () => {
    const {schema}= useContext(FormContext);
    function SwitchCase(props) {
    switch (props.value) {
      case "input":
        return console.log('1')
      case "select":
        return console.log('2')
      case "checkbox":
        return console.log('3');
      case "radio":
        return console.log("4");
      case "togle":
        return console.log("5");
      default:
        return;
    }}

    return (
      <>
        <SwitchCase value={schema.typeOfWidget} />
      </>
    );
}

export default Commom;
