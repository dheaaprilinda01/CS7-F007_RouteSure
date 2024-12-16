import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Map from './mapComponent/Map';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import DashboardCount from './DashboardCount';
import About from './About';
import Weather from './Weather';
import Swal from 'sweetalert2';

const HomeView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [deskripsi, setDeskripsi] = useState('');
  const [userRole, setUserRole] = useState(null);
  const status = ['proses', 'berhasil'];
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleLogoutButton = () => {
    const getUser = localStorage.getItem('user');
    if (getUser) {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Anda akan log out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const removeUser = localStorage.removeItem('user');
          Cookies.remove('jwt');
          axios.post('http://localhost:5000/api/logout', removeUser, { withCredentials: true })
            .then(() => {
              toast.success('Logout berhasil.');
              navigate('/login');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  const submitDataLaporan = (e) => {
    e.preventDefault();

    if (!name || !email || !image || !deskripsi) {
      toast.warn('Form laporan harus diisi!');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('status', status[0]);
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      formData.append('deskripsi', deskripsi);
      formData.append('image', image);

      axios.post('http://localhost:5000/api/laporan', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          toast.success(response.data.message);
          setName('');
          setEmail('');
          setImage(null);
          setDeskripsi('');
        })
        .catch(() => {
          toast.error('Laporan dengan lokasi ini sudah ada dan sedang diproses.');
        });
    });
  };

  return (
    <div className="bg-white h-screen">
      <header className="flex flex-1 bg-darkCharcoal p-6 justify-center items-center sticky bottom-0">
        {userRole === '671b672b3981db347cfd7832' && (
          <button onClick={handleDashboardButton} className='transition duration-150 ease-in-out'>
            <img src='https://img.icons8.com/?size=50&id=Yj5svDsC4jQA&format=png&color=D9D9D9' className='mr-2 hover:bg-blueA hover:rounded-md' />
          </button>
        )}
        <div className='flex flex-1'>
          <Weather />
        </div>
        <h1 className="hidden flex-1 sm:flex text-lightGray text-3xl text-center font-bold">
        RouteSure
        </h1>
        <nav className='flex justify-center items-center'>
          <ul className='hidden sm:flex sm:flex-row decoration-transparent text-lightGray'>
            <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
              <a href='#form'>Form</a>
            </li>
            <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
              <a href='#dashboard'>Dashboard</a>
            </li>
            <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
              <a href='#about'>About</a>
            </li>
          </ul>
          <button onClick={handleLogoutButton} type='submit' className='transition duration-150 ease-in-out'>
            <img src='https://img.icons8.com/?size=50&id=105512&format=png&color=D9D9D9' className='hover:bg-red-500 hover:rounded-md ml-2' />
          </button>
        </nav>
      </header>

      <nav className='md:hidden flex justify-center items-center bg-darkCharcoal p-6 w-full'>
        <ul className='flex flex-row decoration-transparent text-lightGray'>
          <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
            <a href='#form'>Form</a>
          </li>
          <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
            <a href='#dashboard'>Dashboard</a>
          </li>
          <li className='px-4 text-center text-xl font-bold hover:bg-blueA rounded-full'>
            <a href='#about'>About</a>
          </li>
        </ul>
      </nav>

      <div className='flex flex-col md:flex-row sm:flex-col ml-3 mt-3 mb-6'>
        <div className="w-full md:w-[800px] h-[500px] border mb-6 md:mb-0">
          <Map />
        </div>
        <section className="flex-1 bg-white">
          <div className="px-2 py-2 h-full flex items-center justify-center">
            <div className="p-4 border border-darkCharcoal rounded-md shadow-md w-full">
              <h2 className="text-2xl text-darkCharcoal font-bold text-center leading-tight" id='form'>Form Laporan</h2>
              <form className="mt-5" encType="multipart/form-data">
                <div className="space-y-4">
                  <div>
                    <label className="text-base font-medium text-darkCharcoal">Full Name</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Full Name"
                        type="text"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-darkCharcoal focus:ring-offset-1 text-darkCharcoal"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/><img
                        src="https://img.icons8.com/?size=25&id=86871&format=png&color=2B3741"
                        alt="NameTag Icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-darkCharcoal">Email Address</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Email Address"
                        type="email"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-darkCharcoal focus:ring-offset-1 text-darkCharcoal"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/><img src="https://img.icons8.com/?size=25&id=85500&format=png&color=2B3741" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-darkCharcoal">Description</label>
                    <div className="relative mt-2">
                      <input
                        placeholder="Description"
                        type="text"
                        className="mt-2 flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-darkCharcoal focus:ring-offset-1 text-darkCharcoal"
                        name="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}/><img src="https://img.icons8.com/?size=25&id=83169&format=png&color=2B3741" alt="Email Icon" className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-darkCharcoal pb-2">Picture</label>
                    <input
                      className="file:bg-darkCharcoal file:px-2 file:py-1 file:border-none file:rounded file:text-lightGray file:cursor-pointer flex file-input w-full max-w-xs text-darkCharcoal"
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <button
                      className="inline-flex w-full items-center justify-center rounded-md bg-darkCharcoal px-3.5 py-2.5 font-bold leading-7 text-lightGray hover:bg-slate-900 transition duration-150 ease-in-out"
                      type="submit"
                      onClick={submitDataLaporan}><img src='https://img.icons8.com/?size=35&id=85971&format=png&color=D9D9D9' className='mr-2'/>
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <section className="rounded-md p-2 bg-white" id='dashboard'>
        <DashboardCount />
      </section>
      <section className="rounded-md p-2 bg-white" id='about'>
        <About />
      </section>
      <footer className='flex bg-darkCharcoal p-6'>
        <h1 className="flex-1 text-lightGray text-xl text-center font-bold">All rights reserved ©2024 - RouteSure</h1>
      </footer>
    </div>
  );
};

export default HomeView;