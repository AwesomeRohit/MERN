import React, { useState } from 'react'
import { Link } from "react-router-dom"
import useLogin from '../../hooks/useLogin';
import LoadingBar from 'react-top-loading-bar';

const Login =  () => {
  const [progress, setProgress] = useState(0)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {

    e.preventDefault();

    await login(username, password);

  }

  return (
    <div>
      <LoadingBar
        color='#ffffff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <>
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
          <div className=" p-7 h-full w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-gray-100">
            <h1 className='text-3xl font-semibold text-center text-white'>Login <span className='text-blue-500'>ChatApp</span></h1>
            <form onSubmit={handleSubmit}>
              <div>

                <label className='label p-2'>
                  <span className='text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='Enter Username' className=' w-full input-bordered h-10' value={username} onChange={(e) => { setUsername(e.target.value) }} />
              </div>
              <div>
                <label className='label p-2'> <span className='text-base label-text'>Password</span></label>
                <input type="password" placeholder='Enter Password' className=' w-full input-bordered h-10' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <Link to="/signup" className='text-sm hover:underline hover:text-white mt-2 inline-block'>Don't have an Account?</Link>
              <div>
                <button type='submit' onClick={()=>{setProgress(100)}} className='btn btn-block btn-sm mt-2' disabled={loading}>
                  {loading ? <span className='loading loading-spinner'></span> : "Login"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </>
    </div>
  )
}

export default Login
