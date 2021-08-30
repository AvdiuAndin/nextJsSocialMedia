import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { login, register, setUser } from '../../services/userService';
import { useRouter } from 'next/router';

export default function Authentication() {
  const [signUp, setSignUp] = useState(true);
  const router = useRouter(); 


  // used to change the title of the form and the buttons name
  const changeFormTitle = () => {
    setSignUp(!signUp);
  }
  
  const submitForm = async (values: any, { setSubmitting }) => {
    let method = signUp ? register(values.email, values.password) : login(values.email, values.password) 
    
    try {
      let response = await method;
      if(response.statusCode >= 400){
        handleErrors(response);
        setSubmitting(false);
        return;
      }
      setUser(response);
      router.push('user/profiles');
    } catch (e) {
      setSubmitting(false);
    }
  }

  let handleErrors = function (strapiBodyErrors: any) {

    let arrayOfMessages = strapiBodyErrors.data;
    let firstObject = arrayOfMessages[0];
    alert(firstObject.messages[0].message);
  }

  let validateForm = (values: any) => {
    const errors:any = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if(!values.password){
      errors.password = "password is required"
    }
    return errors;
  }

    return (
      <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{signUp ? 'Sign in': 'Log in'} in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a onClick={changeFormTitle} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
              {!signUp ? 'Sign up': 'Log in'}
            </a>
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateForm}
          onSubmit={submitForm}
          > 
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                  <ErrorMessage name="Email" component="div" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">

                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {signUp ? 'Sign': 'Log'}  in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
      </>
    )
}