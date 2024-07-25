import React from 'react'
import useLogout from '../../context/useLogout'
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
function LogoutButton() {
  const [progress, setProgress] = useState(0)
  const {loading, logout} = useLogout();
  return (

   <>
         <LoadingBar
        color='#ffffff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <div className='mt-auto'>
         <button onClick={()=>{logout(); setProgress(100); }} className='btn btn-primary' disabled={loading}>Logout</button>
    </div>
    </>
  )
}

export default LogoutButton
