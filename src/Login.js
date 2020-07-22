import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik} from 'formik';
import * as yup from 'yup';
import './app.css';
import axios from 'axios';
//import {toast } from 'react-toastify';
//import Register from './Register';
const Login=({history})=> (
    <Formik
    initialValues={{
      Email:'',
      Password:'',
    }}
    onSubmit={(values)=>
      {
        axios.post('http://localhost:5000/login',values)
        .then(res=>
          {
            console.log("The value of the data is",res.data);
            localStorage.setItem('auth',JSON.stringify(res.data));
            alert("Login Successfull");
            //toast.success("Success");
            history.push('/Home');
          })
          .catch(err=>
            {
              console.log(err);
              alert(err.response.data);
              //toast.error("");
            });

      }}
    validationSchema={
      yup.object({
        Email:yup.string()
          .required("*Required")
          .email("Enter valid email"),
    Password:yup.string()
        .required("*Required")
        .min(4,"Minimum 4 characters required")
        .max(8,"Maximum 8 characters required")
    })
    }
    >
    {({values,handleSubmit,handleChange,errors})=>
    (
      <form onSubmit={handleSubmit}>
        <div className="container mt-4">
        <div className="jumbotron">
        <h4 id="heading">Login page</h4>
        <div className="form-group">
          <label>Email</label>
          <input 
          type="text" 
          name="Email"
          className="form-control" 
          placeholder="Enter Email address" 
          onChange={handleChange}
          value={values.Email}
          />
          {errors.Email?(<div className="text-danger">{errors.Email}</div>):null}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Enter Password"
          name="Password"
          onChange={handleChange}
          value={values.Password}
          />
          {errors.Password?(<div className="text-danger">{errors.Password}</div>):null}
        </div>
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <a href="Register" id="haveanaccount">Don't have an account?</a>
        </div>
        </div>
        </div>
      </form>
    )
    }
    </Formik>
  );

export default Login;
