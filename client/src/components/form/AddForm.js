import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import addIcon from "../../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import { FormContext } from "../../contexts/FormContext";
import { FormsContext } from "../../contexts/FormsContext";
import Modal from "react-bootstrap/Modal";
import AddSchemaModal from "./AddSchemaModal";
import Commom from "./output";
import OutInput from "./output/OutInput";
import axios from "axios";
import RenderForm from "./RenderForm";
import moment from "moment";
import { ADD_FORM,SET_ADD_FORM } from "../../contexts/constants";


function AddForm() {
  let history = useHistory ();

  const {
    showAddSchema,
    setShowAddSchema,
    description,
    setDescription,
    nameForm,
    setnameForm,
    schemaState,
    
  } = useContext(FormContext);

  const {
    newForm,setNewForm,formsState, dispatch,saveform
  } = useContext(FormsContext);

  const {form,forms} = formsState;

  const { schema, schemas } = schemaState;
  const handleSetShowAddSchema = () => {
    setShowAddSchema(true);
  };



  const {name, desc, listschema} = newForm


  const handleChangeNewForm = event => {
    setNewForm({...newForm, [event.target.name]: event.target.value,listschema:schemas })
    // dispatch({
    //   type:SET_ADD_FORM,
    //   payload:{...newForm, [event.target.name]: event.target.value, listschema:schemas }
    // }) 
  }
  console.log(newForm)
  const saveForm = () => {    
    saveform(newForm)
    alert('Tạo thành công')
    // window.location.href = "http://localhost:3000/form";
    // dispatch({
    //   type:ADD_FORM,
    //   payload:form
    // })
    
    // console.log(formsState)
  }
  // console.log(schemaState.schemas)
  console.log(newForm)
  console.log(formsState)
  
  return (
    <>
    <div className='to'>
    <h1 className="my-5 text-center">Create Form</h1>
        <div className="d-flex addform mx-auto">
          <div className="cardaddform">
            <Card>
              <Card.Header>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    className="font-weight-bolder"
                  >
                    Name Form
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Nhập tên form"
                    aria-label="nameform"
                    onChange={handleChangeNewForm}
                    name="name"
                    
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon2" className="font-italic">
                    Description
                  </InputGroup.Text>
                  <Form.Control 
                  aria-label="descform" 
                  onChange={handleChangeNewForm}
                  name="desc"
                  
                  />
                </InputGroup>
              </Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  {schemas.length>0 &&<RenderForm model={schemas}/>}
                </Card.Text>
                <Button variant="success" type="submit" onClick={saveForm}>Create</Button>
              </Card.Body>
            </Card>
            </div>
            
            <div>
                <OverlayTrigger
                placement="right"
                overlay={<Tooltip>Add field form</Tooltip>}
                >
                <Button
                    className="btn-floatingform addform"
                    variant="success"
                    onClick={handleSetShowAddSchema}
                >
                    <Image src={addIcon} alt="add-student" width="30" height="30" />
                </Button>
                </OverlayTrigger>
            </div>

        </div>
    </div>

      <AddSchemaModal />
    </>
  );
}

export default AddForm;
