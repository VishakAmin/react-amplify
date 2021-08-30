import { Auth } from 'aws-amplify';
import React,{useState} from 'react';
 import { Link, useHistory} from "react-router-dom"

const Login = () => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(userName, password);
        try{
            await Auth.signIn(userName, password)
            history.push("/todo")
        }
        catch(err){
            console.log(err);
        }

        
    };
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input
                            onChange= {(e) => setUserName(e.target.value)}
                            required
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            required
                            onChange= {(e) => setPassword(e.target.value)}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
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
    );
};

export default Login;
