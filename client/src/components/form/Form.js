import NavbarMenu from '../layout/NavbarMenu'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import moment from 'moment'
import AddForm from './AddForm';
import {BrowserRouter as Router, Route, Switch,Link, Redirect} from 'react-router-dom'
import { FormsContext } from "../../contexts/FormsContext";
import React, { useContext, useState, useEffect } from "react";
import ViewForm from './ViewForm';

function Form() {
    
    const {
        getForm,
        formsState:{forms,form},formsState,
        saveform,
        showPreForm, setShowPreForm, findForm
    } = useContext(FormsContext);
    
    useEffect(() => getForm(), []);
    
    const handleClickAddForm = () =>{
    }

    const chooseForm = (formId) => {
        findForm(formId)
        setShowPreForm(true)
    }

    return (
        <>  
            <h1 className="text-center mt-5">My Forms</h1>
            <div className='listform mx-5'>
                <OverlayTrigger placement='right' overlay={<Tooltip>Thêm mới form</Tooltip>}>
                <Link to="/addform">
                    
                    <Button> Add Form</Button>
                </Link>
                </OverlayTrigger>  
                <Table striped bordered hover className='mt-5'>
                    <thead>
                        <tr>
                        <th>Form</th>
                        <th>Mô tả</th>
                        <th>Chi tiết</th>
                        <th>Xem trước</th>
                        <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            forms.map((form)=> ( 
                               
                                <>
                                    <tr key={form.id}>
                                        <td className='font-weight-bold'>{form.name}</td>
                                        <td className='font-weight-bold'>{form.desc}</td>
                                        <td><Button variant="info">Xem</Button></td>
                                        <td><Button variant="success" onClick={chooseForm.bind(this,form.id)}>Preview</Button></td>
                                        <ViewForm/>
                                        <td><Button variant="danger">Xóa</Button></td>
                                    </tr>
                                </>
                            ))
                        }   
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Form;