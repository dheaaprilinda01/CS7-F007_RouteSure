import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const toastUtil = {
    position: 'top-left',
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
  };

  async function submitUserData(e) {
    e.preventDefault();
    if (!userData.email || !userData.name || !userData.password || !userData.confirmPassword) {
      toast.error('Semua field harus diisi!', toastUtil);
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      toast.error('Password dan Confirm Password tidak sama!', toastUtil);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', userData);
      if (response.status === 200) {
        toast.success(`Akun ${ response.data.message } terdaftar.`, toastUtil);
        navigate('/login');
      }

    }
    catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error('Error: Email Anda sudah terdaftar.', toastUtil);
      } else {
        toast.error('Terjadi kesalahan pada server.', toastUtil);
      }
    }

  }
  return (
    <div className="register bg-darkCharcoal min-h-screen">
      <div className="w-full flex justify-center items-center flex-col self-center min-h-screen">
        <div className="min-w-[300px] md:min-w-[400px] lg:min-w-[600px] border border-lightGray h-[480px] bg-inherit rounded shadow p-[20px]">
          <h1 className="text-center text-lightGray pb-5 bg-inherit font-sans font-bold text-[1.25rem] md:text-[1.5rem] lg:text-[1.7rem]">Register</h1>
          <form method='post'>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-lightGray">Email Address</label>
              <div className="relative mt-2">
                <input type="email" name="email" id="email" placeholder='Email Address' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setUserData((prevState) => ({ ...prevState, email: e.target.value }))}/><img src="https://img.icons8.com/?size=25&id=85500&format=png&color=2B3741" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm/6 font-medium text-lightGray mt-2">Username</label>
              <div className="relative mt-2">
                <input type="name" name="name" id="name" placeholder='Username' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setUserData((prevState) => ({ ...prevState, name: e.target.value }))}/><img src="https://img.icons8.com/?size=25&id=83190&format=png&color=2B3741" alt="Password Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-lightGray mt-2">Password</label>
              <div className="relative mt-2">
                <input type="password" name="password" id="password" placeholder='Password' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setUserData((prevState) => ({ ...prevState, password: e.target.value }))}/><img src="https://img.icons8.com/?size=25&id=85161&format=png&color=2B3741" alt="Password Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-lightGray mt-2">Confirm Password</label>
              <div className="relative mt-2">
                <input type="password" name="password" id="confirmPassword" placeholder='Confirm Password' required className="block w-full rounded-md bg-lightGray px-3 py-1 pr-10 text-base text-darkCharcoal outline outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-900 sm:text-sm/6" onChange={(e) => setUserData((prevState) => ({ ...prevState, confirmPassword: e.target.value }))}/><img src="https://img.icons8.com/?size=25&id=85161&format=png&color=2B3741" alt="Password Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
              </div>
            </div>
            <div className="mt-2 justify-center text-center">
              <a href='/login' className='text-lightGray hover:underline'>Already have an account? Login</a>
            </div>
            <div className='pt-4'>
              <button type="submit" className="flex w-full justify-center rounded-md bg-greenA px-3 py-1.5 text-sm/6 font-bold text-lightGray shadow-sm hover:bg-darkGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-darkGreen transition duration-150 ease-in-out" onClick={submitUserData}><img src='https://img.icons8.com/?size=25&id=85484&format=png&color=D9D9D9' className='mr-2'/>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;