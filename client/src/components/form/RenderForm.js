import { FormContext } from "../../contexts/FormContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "./elements/Select";
import Checkbox from "./elements/Checkbox";
import Input from "./elements/Input";
import axios from "axios";
import {
  SET_ADD_DATA_SCHEMA,
  SET_SCHEMA_DATA,
  GET_LIST_SCHEMA_DATA,
} from "../../contexts/constants";
import { FormsContext } from "../../contexts/FormsContext";
function RenderForm({ model }) {
  const {
    // newSchema: { dataOfWidget },
    setNewSchema,
    newSchema,
    schemaState: { schema },
    schemaState,
  } = useContext(FormContext);

  const {
    findForm,
    saveform,
    formsState,
    formsState: { form, forms, schemaData, listSchemaData },
    dispatch,
    findSchema,
    schemaFind,
    setSchemaFind,
    listSchemaFind,
    setListSchemaFind,
    newDataForm,
    setNewDataForm,
    schemaTmp,
    setSchemaTmp,
    // form:{listschema}
  } = useContext(FormsContext);

  // const a = form.listschema
  //  const [updateSchema, setUpdateSchema] = useState(schemaUpdate);
  const { listschemas, id } = newDataForm;

  const chooseSchema = (schemaID, event) => {
    const formID = form.id;
    console.log(schemaID);
    // let length = event.target.value.length
    const a = findSchema(formID, schemaID);
    // setSchemaTmp(a);
    dispatch({
      type: SET_SCHEMA_DATA,
      payload: { ...a, [event.target.name]: event.target.value },
    });

    dispatch({
      type: GET_LIST_SCHEMA_DATA,
      payload: { ...a, [event.target.name]: event.target.value },
    });

    setNewDataForm({ ...newDataForm, listschemas: formsState.listSchemaData });
  };
  console.log(formsState);

  return (
    <>
    <div className="row">

    {model.map((schema, index) =>
        schema.typeOfWidget === "input" ? (
          <Form.Group key={index} className="h5 mb-3 font-weight col-sm-4 ">
            <Form.Label name="nameOfSchema" value={schema.nameOfSchema}>
              {schema.nameOfSchema}
            </Form.Label>
            <Form.Control
              type="text"
              onChange={chooseSchema.bind(this, schema.id)}
              name="dataOfWidget"
            />
          </Form.Group>
        ) : schema.typeOfWidget === "select" ? (
          <Form.Group key={index} className="mb-3  col-sm-4" name="dataOfWidget">
            <Form.Label
              name="nameOfSchema"
              value={schema.nameOfSchema}
              className="h5 mb-3 font-weight"
            >
              {schema.nameOfSchema}
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="dataOfWidget"
              onChange={chooseSchema.bind(this, schema.id)}
            >
              <option>Open this select menu</option>
              {schema.valueOfWidget.map((valueWidget, key1) => (
                <option key={key1} value={valueWidget.name}>
                  {valueWidget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ) : (
          <p key={index}></p>
        )
      )}  
    </div>
   
    </>
  );
}

export default RenderForm;
