import NavbarMenu from "../layout/NavbarMenu";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { FormsContext } from "../../contexts/FormsContext";
import React, { useContext, useState, useEffect } from "react";
import RenderForm from "./RenderForm";
import axios from "axios";
import {
  apiUrl,
  SET_SCHEMA_DATA,
  GET_LIST_SCHEMA_DATA,
} from "../../contexts/constants";

function ViewForm() {
  const {
    getForm,
    dispatch,
    formsState: { forms, form },
    saveform,
    formsState: { listSchemaData },
    schemaTmp,
    setSchemaTmp,
    showPreForm,
    setShowPreForm,
    formsState,
    savevalueform,
    newDataForm,
    setNewDataForm,
  } = useContext(FormsContext);
  const { listschemas, id } = newDataForm;
  const closeDialog = () => {
    setShowPreForm(false);
  };

  const formId = form.id;
  const handleClickSaveDataForm = async (event) => {
    event.preventDefault();
    await savevalueform(newDataForm, formId);
    setShowPreForm(false);
  };

  console.log(formsState);
  return (
    <>
      <Modal show={showPreForm} animation={false} onHide={closeDialog}>
        <Modal.Header closeButton>
          <Modal.Title> {form.name} </Modal.Title>
        </Modal.Header>
        <Form id={form} onSubmit={handleClickSaveDataForm}>
          <Modal.Body>{<RenderForm model={form.listschema} />}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ViewForm;
