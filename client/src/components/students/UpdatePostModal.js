import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../contexts/StudentContext";

function AddPostModal() {
  // context
  const {
    studentState: { student },
    showUpdateStudentModal,
    setShowUpdateStudentModal,
    updateStudent,
    uploadAvatar,
  } = useContext(StudentContext);

  // State
  const [updatedStudent, setUpdatedStudent] = useState(student);
  // const [students, setStudents] = useState()

  useEffect(() => setUpdatedStudent(student), [student]);

  const closeDialog = () => {
    setUpdatedStudent(student);
    setShowUpdateStudentModal(false);
  };

  const { name, birthday, city, district, village, file } = updatedStudent;

  const onChangeUpdateStudentForm = (event) =>
    setUpdatedStudent({
      ...updatedStudent,
      [event.target.name]: event.target.value,
    });

  const onSubmit = async (event) => {
    event.preventDefault();
    const { code, data } = await updateStudent(updatedStudent);
    setShowUpdateStudentModal(false);
  };

  return (
    <Modal show={showUpdateStudentModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Nhập thông tin sinh viên</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tên Sinh Viên</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Nhập Tên Sinh Viên"
              name="name"
              required
              aria-describedby="title-help"
              value={name}
              onChange={onChangeUpdateStudentForm}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Năm Sinh</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Năm Sinh"
              name="birthday"
              required
              value={birthday}
              onChange={onChangeUpdateStudentForm}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Tỉnh</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Tỉnh"
              name="city"
              required
              value={city}
              onChange={onChangeUpdateStudentForm}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Huyện</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Huyện"
              name="district"
              required
              value={district}
              onChange={onChangeUpdateStudentForm}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Xã</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập Xã"
              name="village"
              required
              value={village}
              onChange={onChangeUpdateStudentForm}
            />
          </Form.Group>
          {/* <Form.Group controlId="formFileSm" className="mb-3 mt-3" onChange={onChangeUpdateStudentForm}>
                        <Form.Label>Upload Avatar</Form.Label>
                        <Form.Control type="file" size="sm" name='file' value={file}/>
                    </Form.Group> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPostModal;
