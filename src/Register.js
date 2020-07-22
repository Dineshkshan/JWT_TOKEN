import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik} from 'formik';
import * as yup from 'yup';
import './app.css';
import axios from 'axios';
const Register=({history})=> (
    <Formik
    initialValues={{
      Username:'',
      Email:'',
      Password:'',
      ConfirmPassword:''
    }}
    onSubmit={(values)=>
      {
        axios.post('http://localhost:5000/register',values)
        .then(resp=>
          {
              alert('Data Inserted Successfully');
              history.push('/');
          })
         .catch(err=>
         {
           alert(err.response.data);
         }); 
      }}
    validationSchema={
      yup.object({
     Username:yup.string()
          .required("*Required")
          .max(12,"Maximum 12 characters")
          .min(4,"Minimum 4 characters"),
     Email:yup.string()
           .required("*Required")
           .email("Not a valid email"),     
     ConfirmPassword:yup.string()
          .required("*Required")
          .min(4,"Minimum 4 characters required")
          .max(8,"Maximum 8 characters required")
          .oneOf([yup.ref('Password'),null],"Password doesn't match"),
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
        <h4 id="heading">Register page</h4>
        <div className="form-group">
          <label>Username</label>
          <input 
          type="text" 
          name="Username"
          className="form-control" 
          placeholder="Enter UserName" 
          onChange={handleChange}
          value={values.Username}
          />
          {errors.Username?(<div className="text-danger">{errors.Username}</div>):null}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Enter Email id"
          name="Email"
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="Enter Confirm Password"
          name="ConfirmPassword"
          onChange={handleChange}
          value={values.ConfirmPassword}
          />
          {errors.ConfirmPassword?(<div className="text-danger">{errors.ConfirmPassword}</div>):null}
        </div>
        <div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </div>
        </div>
      </form>
    )
    }
    </Formik>
  );

export default Register;
