import React, { useContext, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormContext } from "../../../contexts/FormContext";
import { SET_ADD_SCHEMA, ADD_SCHEMA } from "../../../contexts/constants";
import { v4 as uuidv4 } from 'uuid';

function Input() {
  const typeInput = [
    {
      id: 1,
      // type: "Number",
      value: "Number",
    },
    {
      id: 2,
      // type: "Text",
      value: "Text",
    },
    {
      id: 3,
      // type: "Images",
      value: "Images",
    },
    {
      id: 4,
      // type: "Date",
      value: "Date",
    },
    {
      id: 5,
      // type: "File",
      value: "File",
    },
  ];
  const {
    typeOfInput,
    setTypeOfInput,
    dispatch,
    ouputOptions,
    nameSchema,
    newSchema,
    setNewSchema,
    schemaState,
  } = useContext(FormContext);

  const { schema, schemas } = schemaState;

  const handleChangeTypeInput = (event) => {
    setTypeOfInput(event.target.value);
    dispatch({
      type: SET_ADD_SCHEMA,
      payload: {
        id:uuidv4(),
        nameOfSchema: nameSchema,
        typeOfWidget: ouputOptions,
        valueOfWidget: event.target.value,
        dataOfWidget:'',
      },
    });

  };
  
  return (
    <>
      <Form.Select
        aria-label="Default select example w-100"
        onChange={handleChangeTypeInput}
      >
        {typeInput.map((out) => {
          return (
            <React.Fragment key={out.id}>
              <option value={out.value}>{out.value}</option>
            </React.Fragment>
          );
        })}
      </Form.Select>
    </>
  );
}

export default Input;
