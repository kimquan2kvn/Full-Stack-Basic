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
import { apiUrl } from "../../contexts/constants";
import OutInput from "./output/OutInput";
import {SET_ADD_SCHEMA, ADD_SCHEMA} from '../../contexts/constants'
import { FormsContext } from "../../contexts/FormsContext";

function AddSchemaModal() {
  const {
    showAddSchema,
    setShowAddSchema,
    ouputOptions,
    setOuputOptions,
    nameSchema,
    setNameShema,
    schemaState,
    newSchema,setNewSchema, dispatch,
    addSchema  

  } = useContext(FormContext);


  const {
    newForm,setNewForm,formsState
  } = useContext(FormsContext);

  const {name, desc, listschema} = newForm

  const [addSelect, setaddSelect] = useState([{ name: "" }]);
  const {schema,schemas} = schemaState


  // const [newschema,setNewSchema] = useState({
  //   nameOfSchema: '',
  //   typeOfWidget:'',
  //   valueOfWidget: [],
  // },)

  // onChange={handleAddSchema}



  const onSubmit = async (e) =>{
    e.preventDefault()
    dispatch({
      type: ADD_SCHEMA,
      payload: schema
    })
    // setNewForm({...newForm,listschema:schemas})
    resetAddSchemaData()
  }
  const resetAddSchemaData = () => {
    setShowAddSchema(false)
  }
  const closeDialog = () => {
    resetAddSchemaData()
  };

  const selectWidget = (value) => {
    if (value.target.value) {
      setOuputOptions(value.target.value);
      
    } else console.log("error");
  };

    


  function SwitchCase(props) {
    switch (props.value) {
      case "input":
        return (
          <Input />
        );
      case "select":
        return(
          <Select/>
        )
      case "checkbox":
        return ( 
          <Checkbox/>
        )
      case "radio":
        return console.log("4");
      case "togle":
        return console.log("5");
      default:
        return ;
    }
  }


  const options = [
    {
      type: "Input",
      value: "input",
      
    },
    {
      type: "Select",
      value: "select",
    },
    {
      type: "Checkbox",
      value: "checkbox",
    },
    {
      type: "Radio",
      value: "radio",
    },
    {
      type: "Togle",
      value: "togle",
    },
  ];

  const onChangeNewNameSchema = (event) =>{
    setNameShema(event.target.value);
  }
  // console.log(schema)
  // console.log(typeOfInput)
  // console.log(dispatch)

  // const handleChangeNewForm = e => {
  //   setNewForm({...newForm,listschema:schemas})
  // }

  return (
    <>
      <Modal show={showAddSchema} animation={false} onHide={closeDialog} >
        <Modal.Header closeButton>
          <Modal.Title>Add Field Form - Schema</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Label Schema</Form.Label>
              <Form.Control type="text" placeholder="Name" name="nameSchema" value={nameSchema} onChange={onChangeNewNameSchema}/>
            </Form.Group>
            <Form.Select
              aria-label="Default select example w-100"
              onChange={selectWidget}
            >
              <option>Choose type</option>
              {options.map((option, key) => {
                return (
                  <React.Fragment key={key}>
                    <option value={option.value}>{option.type}</option>
                  </React.Fragment>
                );
              })}
            </Form.Select>
            <br></br>
            <SwitchCase value={ouputOptions} />
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      
    </>
  );
  
}

export default AddSchemaModal;
