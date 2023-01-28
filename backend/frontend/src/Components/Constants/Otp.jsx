/* eslint-disable prefer-destructuring */
/* eslint-disable dot-notation */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axiosInstance from '../../Axios/axiosPrivate';
import { OtpShema } from '../../schemas';

function Otp() {
  const input1Ref = React.createRef();
  const input2Ref = React.createRef();
  const input3Ref = React.createRef();
  const input4Ref = React.createRef();

  const handleChangeL = (event, nextRef) => {
    const { value } = event.target;
    console.log(value);
    if (value.length === 1) {
      nextRef.current.focus();
    }
  };

  const params = useParams();
  const navigate = useNavigate();
  const id = params['id'];
  console.log(id, 'the id is');
  const initialValues = {
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: OtpShema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axiosInstance.post(`/register/`, {
          verification: true,
          id,
          otp: values.digit1 + values.digit2 + values.digit3 + values.digit4,
        });
        if (response.status === 201) {
          navigate('/login');
        }
      } catch (err) {
        alert(err);
      }
      actions.resetForm();
    },
  });
  return (
    <div className="mb-auto">
      <>
        <div className=" flex  items-center m-10 flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="bg-white border border-gray-400 px-6 pt-10 pb-9 drop-shadow-2xl mx-auto w-full max-w-lg rounded-2xl">
            <div className="mx-auto flex w-full max-w-md flex-col space-y-8 mb-0">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-xl md:text-3xl">
                  <p>Email Verification</p>
                </div>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We have sent a code to your email </p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} action="">
                  <div className="flex flex-col  space-y-8">
                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                      <div className="w-16   h-16  ">
                        <input
                          maxLength="1"
                          className="border-2 border-black w-full h-full flex flex-col border-2 border-slate-500 focus:bg-gray-50 focus:ring-1 ring-purple-700 drop-shadow-2xl items-center justify-center text-center px-5 outline-none rounded-xl shadow-lg text-lg bg-white "
                          type="text"
                          name="digit1"
                          id=""
                          value={values.digit1}
                          onChange={handleChange}
                          onInput={(e) => handleChangeL(e, input2Ref)}
                          ref={input1Ref}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="border-2 border-black w-full h-full flex flex-col  border-2 border-slate-500 focus:bg-gray-50 focus:ring-1 ring-purple-700 drop-shadow-2xl items-center justify-center text-center px-5 outline-none rounded-xl text-lg bg-white "
                          type="text"
                          name="digit2"
                          id=""
                          ref={input2Ref}
                          value={values.digit2}
                          onChange={handleChange}
                          onInput={(e) => handleChangeL(e, input3Ref)}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="border-2 border-black w-full h-full   border-2 border-slate-500 focus:bg-gray-50 focus:ring-1 ring-purple-700 drop-shadow-2xl flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl text-lg bg-white "
                          type="text"
                          name="digit3"
                          id=""
                          ref={input3Ref}
                          value={values.digit3}
                          onChange={handleChange}
                          onInput={(e) => handleChangeL(e, input4Ref)}
                        />
                      </div>
                      <div className="w-16 h-16 ">
                        <input
                          maxLength="1"
                          className="border-2 border-black w-full h-full   border-2 border-slate-500 focus:bg-gray-50 focus:ring-1 ring-purple-700 drop-shadow-2xl flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl text-lg bg-white "
                          type="text"
                          name="digit4"
                          id=""
                          ref={input4Ref}
                          value={values.digit4}
                          onChange={handleChange}
                          onInput={(e) => handleChangeL(e, input4Ref)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col  text-center item-center mt-0 ">
                      <div className="flex text-center justify-center mb-2">
                        <button
                          type="submit"
                          className="border-purple-900 p-2 mb-2  rounded-lg bg-purple-600 text-sm md:text-lg text-white text-bold "
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't recieve code?</p>
                        <a
                          className="flex flex-row items-center text-blue-600"
                          href="http://"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Resend
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Otp;
