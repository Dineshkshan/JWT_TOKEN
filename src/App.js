import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App()
{
  return(
    <div>
   <Router>
     <Route exact path="/" component={Login}/>
     <Route exact path="/Register" component={Register}/>
     <Route exact path="/Home" component={Home}/>
    </Router>
     {/* <ToastContainer/> */}
   </div>
  );
}

export default App;
