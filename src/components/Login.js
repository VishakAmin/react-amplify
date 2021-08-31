import { Auth } from 'aws-amplify';
import React,{useState} from 'react';
 import { Link, useHistory} from "react-router-dom"

const Login = () => {

    const [userMail, setuserMail] = useState("")
    const [password, setPassword] = useState("")
    const [isloading, setIsLoading] = useState(true)
    const [authCode, setAuthCode] = useState("")
    const [user, setUser] = useState()


    const history = useHistory()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(userMail, password);
        try{
            let user_ = await Auth.signIn(userMail, password)
            setUser(user_)    
            setIsLoading(false)
        }
        catch(err){
            console.log(err);
        }   
    };
     
    const handleAuthCode = async (e) => {
       e.preventDefault();
       try{
           console.log(user);
        if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        const loggedUser = await Auth.confirmSignIn(
            user,   // Return object from Auth.signIn()
            authCode,   // Confirmation code  
            'SMS_MFA'
        );
        console.log(loggedUser);
        history.push("/todo")
        }
    }
        catch(err){
            console.log(err);
        }
    
    }
    


    return (

        <>
        {isloading ? (
            <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                  <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='mail'>Username</label>
                        <input
                            onChange= {(e) => setuserMail(e.target.value)}
                            required
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='userMail'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            required
                            onChange= {(e) => setPassword(e.target.value)}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                            id='password'
                            placeholder='Your Password'
                        />
                        <Link
            to={{
                pathname:'/forgot-password',
            }}
            className="text-xs text-green pt-1"
          > Forgot password?
            {" "}
          </Link>
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className='bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="w-full pt-2">
          <hr />
          <p className="text-gray-700 pb-2 pt-2 text-sm">Don't have an account?
          <Link
            to='/'
            className="pt-2 text-green font-semibold"
          >
            {" "}Sign up
          </Link>
          </p>
        </div>
            </div>
        </div>
        ) : (
            <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Two Factor Authentication 🔐
                </h1>

                <form onSubmit={handleAuthCode}>           
                    <div>
                        <label htmlFor='auth'>Authentication Code</label>
                        <input
                            required
                            onChange= {(e) => setAuthCode(e.target.value)}
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='authcode'
                            placeholder='Your Code'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className='bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'
                        >
                            Confirm
                        </button>
                    </div>
                </form>
                <div className="w-full pt-2">
          <hr />
          <p className="text-gray-700 pb-2 pt-2 text-sm">Want to go back?
          <Link
            to='/'
            className="pt-2 text-green font-semibold"
          >
            {" "}Back
          </Link>
          </p>
        </div>
            </div>
        </div>
        )} 
        </>
        
    );
};

export default Login;
