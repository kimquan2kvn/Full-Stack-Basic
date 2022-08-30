import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import addIcon from "../../../assets/plus-circle-fill.svg";
import trash from "../../../assets/trash.svg";
import { FormContext } from "../../../contexts/FormContext";
import { SET_ADD_SCHEMA, ADD_SCHEMA } from "../../../contexts/constants";
import { v4 as uuidv4 } from "uuid";

function Select() {
  const {
    dispatch,
    ouputOptions,
    nameSchema,
    addSelect,
    schemaState,
    setaddSelect,
  } = useContext(FormContext);
  const { schema, schemas } = schemaState;
  // const [addSelect, setaddSelect] = useState([{ name: "" }]);

  const handleFormChange = (event, index) => {
    let data = [...addSelect];
    data[index][event.target.name] = event.target.value;
    console.log(data);
    setaddSelect(data);
    dispatch({
      type: SET_ADD_SCHEMA,
      payload: {
        id: uuidv4(),
        nameOfSchema: nameSchema,
        typeOfWidget: ouputOptions,
        valueOfWidget: addSelect,
        dataOfWidget: "",
      },
    });
  };
  console.log(schema);
  const addSelectFields = () => {
    let object = {
      name: "",
    };
    setaddSelect([...addSelect, object]);
  };

  const removeFields = (index) => {
    let data = [...addSelect];
    data.splice(index, 1);
    setaddSelect(data);
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name Select</Form.Label>
        {addSelect.map((select, index) => {
          return (
            <div className="d-flex mt-2" key={index}>
              <Form.Control
                name="name"
                type="text"
                placeholder="Select option "
                onChange={(event) => handleFormChange(event, index)}
                value={select.name}
              />
              <button className="border-0" onClick={() => removeFields(index)}>
                <Image src={trash} width="17" height="17" />
              </button>
            </div>
          );
        })}
        <Button
          className="btn-floatingform addform mt-1 btn-success"
          variant="success"
          onClick={addSelectFields}
        >
          <Image src={addIcon} width="17" height="17" />
        </Button>
      </Form.Group>
    </>
  );
}

export default Select;
