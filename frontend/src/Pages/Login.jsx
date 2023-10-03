import React from 'react'

const Login = ({ logIn }) => {
    return (
        <div className='container d-flex align-items-center'>
            <div className='w-25 bg-primary'>
                <h2>Log in</h2>
                <button className='btn-primary' onClick={() => logIn()}>Log in with Google</button>
            </div>
            <div className='w-25 bg-secondary'>
                <h2>Sign up</h2>
                <button className='btn-primary' onClick={() => logIn()}>Sign up with Google</button>
            </div>
        </div>

    )
}

export default Login