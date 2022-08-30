import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button' 
import FormControl from 'react-bootstrap/Form'
function SearchStudent() {
    return ( 
        <Form >
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
    );
}   

export default SearchStudent