import { Auth } from 'aws-amplify';
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom';


const ConfirmSignup = () => {
    const [userName, setUserName] = useState("")
    const [authCode, setAuthCode] = useState("")
    const history = useHistory()


   const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            await Auth.confirmSignUp(userName, authCode)
            history.push("/login")
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Confirm your account 🔐
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
                        <label htmlFor='password'>Authentication Code</label>
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
            to='/signup'
            className="pt-2 text-green font-semibold"
          >
            {" "}Back
          </Link>
          </p>
        </div>
            </div>
        </div>
    );
};

export default ConfirmSignup
