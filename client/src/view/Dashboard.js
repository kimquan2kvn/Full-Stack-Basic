import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { StudentContext } from "../contexts/StudentContext";
import SingleStudent from "../components/students/SingleStudent";
import AddPostModal from "../components/students/AddPostModal";
import UpdatePostModal from "../components/students/UpdatePostModal";
import AddAvatarModal from "../components/students/AddAvatarModal";
import SearchStudent from "../components/students/SearchStudent";

const Dashboard = () => {
  // Contexts
  const {
    authState: {
      user: { lastName, firstName },
      isAuthenticated,
    },
  } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const keys = ["name", "birthday", "city", "district", "village"];
  console.log(query);

  const {
    studentState: { student, students, studentsLoading },
    getStudents,
    setShowAddStudentModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(StudentContext);
  useEffect(() => { 
    getStudents();
  },[]);
  // get all student
  // useEffect(() => getStudents(), []);

  let body = null;
  let i = 1;

  if (query) {
    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query))
      );
    };

    var studentSearch = search(students);
    body = (
      <>
        <Form>
          <FormControl
            type="text"
            placeholder="Search"
            className="mx-auto w-25 "
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </Form>
        <Row className="row-cols-1 row-cols-md-2 g-4 mx-auto mt-3">
          {studentSearch.map((student) => (
            <Col key={student.id} className="my-2">
              <SingleStudent student={student} />
            </Col>
          ))}

          {/* {
                    students.filter((student) => student.name.toLowerCase().includes(query))
                    .map((student)=>(
                        <Col key={student.id} className='my-2'>
                            <SingleStudent student={student} />
                        </Col>
                    ))
                    } */}
        </Row>
        {/* Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Thêm mới sinh viên</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddStudentModal.bind(this, true)}
          >
            <Image src={addIcon} alt="add-student" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  } else {
    if (!students) {
      body = (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else if (students.length === 0) {
      body = (
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Xin chào bạn !</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to StudentManagement</Card.Title>
            <Card.Text>Get Started</Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddStudentModal.bind(this, true)}
            >
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
      );
      console.log("first");
    } else {
      body = (
        <>
          <Form>
            <FormControl
              type="text"
              placeholder="Search"
              className="mx-auto w-25 "
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form>
          <Row className="row-cols-1 row-cols-md-2 g-4 mx-auto mt-3">
            {students.map((student) => (
              <Col key={student._id} className="my-2">
                <SingleStudent student={student} />
              </Col>
            ))}
          </Row>
          {/* Add Post Modal */}
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Thêm mới sinh viên</Tooltip>}
          >
            <Button
              className="btn-floating"
              onClick={setShowAddStudentModal.bind(this, true)}
            >
              {console.log(setShowAddStudentModal)}
              <Image src={addIcon} alt="add-student" width="60" height="60" />
            </Button>
          </OverlayTrigger>
        </>
      );
      console.log(students);
    }
  }

  return (
    <>
      <h2 className="text-center mt-2 font-weight-bold">Danh sách sinh viên</h2>
      {body}
      <AddAvatarModal />
      <AddPostModal />
      <Toast
        show={true}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
      {student !== null && <UpdatePostModal />}
    </>
  );
};

export default Dashboard;
