
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Gravatar from 'react-gravatar';
import Warning from './Warning';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.token) {
        const { token , name ,email} = response;
        if (data.rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', name);
          localStorage.setItem('mail', email);
        }
        history.push(history.location.state?.from || '/');
        toast.success(`Welcome ${name}`);
      } else {
        console.log(response.payload);
        toast.error(response.payload);
      }
    } catch (error) {
     toast.error(error.message);
    }
  };

  return (
    <section className='flex flex-col justify-center place-items-center bg-[url("/images/background.png")] min-h-screen bg-center bg-cover bg-no-repeat'>
        <h1 className='h2 text-text-light mt-5'>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='gap-5 flex flex-col bg-text-light opacity-90 p-10 rounded-3xl min-w-80 md:min-w-[45rem] my-10'>
      <div className='flex flex-col gap-2'>
        <label className='h5 md:text-xl'>Email Adress *</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='example@gmail.com'/>
          {errors?.email && <Warning>Email is required and must be valid.</Warning> }
        </div>
      <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Password *</label>
          <input type="password" {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='********' />
        </div>
        <div className='flex flex-row gap-2'>
          <label className='h5 md:text-xl'>Remember Me</label>
        <input type="checkbox" {...register('rememberMe')} className='text-primary-blue'/>
      </div>
      <Link to="/signup" className='text-text-dark'>Don't have an account? <span className='text-primary-blue'>Sign Up</span></Link>
      <button type="submit" className='bg-primary-blue w-32 h-10 rounded-md self-center lg:w-40 lg:h-12 lg:text-2xl text-md font-bold text-text-light place-items-center'>Login</button>
    </form>
    </section>
  );
};

export default LoginForm;
