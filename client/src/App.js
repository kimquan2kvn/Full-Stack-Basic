
import {BrowserRouter as Router, Route, Switch,Link, Redirect} from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext'
import './App.css';
import {useParams} from 'react'
import Landing from './components/layout/Landing';
import Auth from './view/Auth';
import Dashboard from './view/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import StudentContextProvider from './contexts/StudentContext';
import Authentication from './components/auth/Authentication';
import Form from './components/form/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarMenu from './components/layout/NavbarMenu';
import FormBuilder from './components/form/AddForm';
import FormContextProvider from './contexts/FormContext';
import FormsContextProvider from './contexts/FormsContext';
import AddForm from './components/form/AddForm';

function App() {
  return (
    <AuthContextProvider>
      <StudentContextProvider>
        <FormContextProvider>
          <FormsContextProvider>
            <Router>
              <Switch>
                <Route path ='/authentication/user/active/:id' component={Authentication} />
                <Route exact path ='/' component={Landing}/>
                <Route exact path='/form' element={ <Redirect to="/form" /> } component={Form}/>
                <Route exact path='/addform' component={AddForm}/>
                <Route exact path ='/login' render={props => <Auth {...props} authRoute='login'/>}/>
                <Route exact path ='/register' render={props => <Auth {...props} authRoute='register'/>}/>
                <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
            </Router>
          </FormsContextProvider>
        </FormContextProvider>
      </StudentContextProvider>
    </AuthContextProvider>
  );
}

export default App;
