import { useState,useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import addIcon from "../../../assets/plus-circle-fill.svg";
import trash from "../../../assets/trash.svg";
import { FormContext } from "../../../contexts/FormContext";

function Checkbox() {
    const {schema,setSchema,nameSchema,ouputOptions} = useContext(FormContext);
    const [addCheckBox, setAddCheckBox] = useState([{ name: "" }])

    const handleFormChange = (event,index)=> {
        let data = [...addCheckBox];
        data[index][event.target.name] = event.target.value;
        setAddCheckBox(data);
        // setSchema({
        //     nameOfSchema: nameSchema,
        //     typeOfWidget: ouputOptions,
        //     valueOfWidget:addCheckBox
        // })

      };

    const addCheckBoxFields = () => {
        let object ={
            name:'',
        }
        setAddCheckBox([...addCheckBox,object])
    }

    const removeFields = (index) => {
        let data = [...addCheckBox];
        data.splice(index, 1);
        setAddCheckBox(data);
    }; 

    
    //console.log(addCheckBox)
    // console.log(nameSchema)
    return ( 
        <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name Checkbox</Form.Label>
                {addCheckBox.map((checkbox,index) => {
                    return(
                        <div className="d-flex mt-2">
                            <Form.Control
                                className="w-50"
                                name="name"
                                type="text"
                                placeholder="Checkbox option"
                                value={checkbox.name}
                                onChange={(event) => handleFormChange(event, index)}
                            />
                            <button className="border-0" onClick={()=>removeFields(index)}>
                            <Image src={trash} width="17" height="17" />
                            </button>  
                        </div>
                    )
                })}
            <Button
            className="btn-floatingform addform btn-success mt-1"
            variant="success"
            onClick={addCheckBoxFields}
            >
            <Image src={addIcon} width="17" height="17" />
            </Button>
            </Form.Group>
        </>
    );
}

export default Checkbox;