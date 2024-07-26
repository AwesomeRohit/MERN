import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderCheckBox from './GenderCheckBox';
import useSignUp from '../../hooks/useSignUp.js';
import LoadingBar from 'react-top-loading-bar'

function SignUp() {
  const[progress,setProgress] = useState(0);
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const { loading, signup } = useSignUp();

  const handleGenderCheckBox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with inputs: ", inputs);
    try {
      await signup(inputs);
    } catch (error) {
      console.error("Error during signup: ", error);
    }
  };

  return (

    <>
    <LoadingBar
        color='#ffffff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
      <div className="p-7 h-full w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
        <h1 className='text-3xl font-semibold text-center text-white'>
          SignUp <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type="text"
              placeholder='FullName'
              className='w-full input-bordered h-10 bg-transparent'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type="text"
              placeholder='Enter Username'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              className='w-full input-bordered h-10'
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type="password"
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              className='w-full input-bordered h-10'
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder='Confirm Password'
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              className='w-full input-bordered h-10 bg-transparent'
            />
          </div>

          <GenderCheckBox onCheckBoxChange={handleGenderCheckBox} selectedGender={inputs.gender} />
          <Link to="/login" className='text-sm hover:underline hover:text-white mt-2 inline-block'>
            Already Have An Account? Login Instead
          </Link>
          <div>
            <button type='submit' onClick={() => setProgress(100)} className='btn btn-block btn-sm mt-2' >
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default SignUp;
