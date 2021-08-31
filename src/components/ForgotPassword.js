import { Auth } from 'aws-amplify';
import React,{useState} from 'react';
 import { Link, useHistory,useLocation} from "react-router-dom"


const ForgotPassword = () => {

    const [password, setPassword] = useState("")
    const [authCode, setAuthCode] = useState("")
    const [username, setUsername] = useState("")
    const [isloading, setIsLoading] = useState(true)
    const history = useHistory();

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        try {
           await Auth.forgotPassword(username)
           setIsLoading(false) 
        }
        catch(err){
            console.log(err);
        }
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        try{
            Auth.forgotPasswordSubmit(username, authCode, password)
            history.push("/login")
        }   
        catch(err){
            console.log(err);
        }
    }
    
    return (
        <>
            <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Reset the password  🔐
                </h1>
                { isloading ? (  <form onSubmit={handleUsernameSubmit}>
                    <div>
                        <label htmlFor='mail'>Username</label>
                        <input
                            onChange= {(e) => setUsername(e.target.value)}
                            required
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='userMail'
                            placeholder='Your Username'
                        />
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className='bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'
                        >
                            Submit
                        </button>
                    </div>
                </form>

                    ) : (
                        <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor='mail'>Auth Code</label>
                            <input
                                onChange= {(e) => setAuthCode(e.target.value)}
                                required
                                type='text'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='userMail'
                                placeholder='Enter code'
                            />
                        </div>
                        <div>
                            <label htmlFor='mail'>New Password</label>
                            <input
                                onChange= {(e) => setPassword(e.target.value)}
                                required
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='userMail'
                                placeholder='New password'
                            />
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <button
                                className='bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                    ) }
                            <div className="w-full pt-2">
          <hr />
          <p className="text-gray-700 pb-2 pt-2 text-sm">Want to go back?
          <Link
            to='/login'
            className="pt-2 text-green font-semibold"
          >
            {" "}Back
          </Link>
          </p>
        </div>
        </div>
    </div>
    </>
    )        
}

export default ForgotPassword
