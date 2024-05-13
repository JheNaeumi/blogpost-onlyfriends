import { useEffect, useLayoutEffect, useState} from 'react';
import { useNavigate} from "react-router-dom";
import { useParams, useSearchParams} from 'react-router-dom';
import { verify } from '../service/AuthenticationService';
import { getAuthToken } from '../service/AuthService';
function VerificationComponent () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [redirectCountdown, setRedirectCountdown] = useState(5); // Countdown duration in seconds
  const [verificationStatus, setVerificationStatus] = useState('');
  const [isAuth, setisAuth] = useState(false);
  const email = searchParams.get('email');
  const otp = searchParams.get('otp');
 
  const startRedirectTimer = () => {
    const intervalId = setInterval(() => {
      setRedirectCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalId);
          navigate('/login');
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };
  
  const verifyEmail = async () => {
      try {
        const response = await verify(email, otp);
        console.log(response.data);
        if (response.status === 200) {
          setVerificationStatus('Email successfully verified!');
          startRedirectTimer()
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        const message = error.response.data;
        setVerificationStatus(message);
        startRedirectTimer();
      }
     
    
  };
  
  useEffect(() => {
    let token = getAuthToken()
    if(token !==null) {
      setisAuth(true)
      navigate("/")
    }
    verifyEmail()
  }, []);
  

  if(isAuth){
    return null;
  }
  return(
      <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
              <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Email Verification</h2>
              </div>
              <div className="bg-white p-6 rounded shadow-md">
              <div className="text-center">
                  {verificationStatus && <p className="text-lg text-red-500">{verificationStatus}</p>}
                  <p className="mt-3 text-sm text-gray-500">Redirecting to login page in {redirectCountdown} seconds...</p>
              </div>
              <div className="mt-6">
                  <button onClick={() => { clearInterval(); navigate('/login') }} className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" > Go to Login </button>
              </div>
              </div>
          </div>
      </div>
      </>
  )
}
export default VerificationComponent