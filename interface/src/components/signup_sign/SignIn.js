import React, { useState, useContext, useEffect } from 'react'
import './signup.css';
import { Divider } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../services/service';
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from '../context/ContextProvider';
import { useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../loader/Loader';
import Navbar from '../header/Navbar';
import Newnavbar from '../newnavbar/Newnavbar';
import Footer from '../footer/Footer';

const SignIn = () => {

  const { account, setAccount } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const userLoginInfo = useSelector(state => state.getproductsdata.userLoginInfo);
  console.log("user Login Information  : ", userLoginInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sendData = async (value) => {
    setLoading(true);
    setTimeout(async () => {
      await dispatch(loginUser(value, setAccount, setIsSuccess));
      setLoading(false)
    }, 2000);
  }
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: () => {
      const errors = {};
      console.log(errors)
      if (!formik.values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i.test(formik.values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!formik.values.password) {
        errors.password = "Password is required";
      } else if (formik.values.password.length === 5) {
        errors.password = "Must be 6 characters or more";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      sendData(values);
      console.log("Sign in data", values);
      resetForm({ values: '' })
    },
  });


  return (

    <>
      {
        loading ? <div className='circle'>
          <CircularProgress />
          <h2>Loading...</h2>
        </div> : (
          <>
            <Navbar />
            <Newnavbar />
            <section>

              <div className="sign_container">
                <div className="sign_header">
                  <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                  <form method="POST" onSubmit={formik.handleSubmit}>
                    <h1>Sign-In</h1>

                    <div className="form_data">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        id="email" />
                      <p className='error'> {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}</p>



                    </div>
                    <div className="form_data">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password"
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        value={formik.values.password}
                        id="password" placeholder="At least 6 characters" />
                      <p className='error'> {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}</p>
                    </div>
                    <input type="submit" className="signin_btn" value="Login" />
                  </form>
                </div>
                <div className="create_accountinfo">
                  <p>New to Amazon?</p>
                  <NavLink to="/register">  <button>  Create your Amazon Account</button></NavLink>
                </div>
              </div>
              <ToastContainer />

            </section>
            <Footer />

          </>
        )}




    </>
  )
}

export default SignIn;