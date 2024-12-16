import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Warning from './Warning';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { error } = useSelector(state => state.auth);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.token) {
        const { token, name, email } = response;
        if (data.rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', name);
          localStorage.setItem('mail', email);
        }
        history.push(history.location.state?.from || '/');
        toast.success(`Welcome ${name}!`);
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <section className='flex flex-col justify-center place-items-center bg-[url("/images/background.png")] min-h-screen bg-center bg-cover bg-no-repeat'>
      <h1 className='h2 text-text-light mt-5'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-5 flex flex-col bg-text-light opacity-90 p-10 rounded-3xl min-w-80 md:min-w-[45rem] my-10'>
        {error && <Warning>{error}</Warning>}
        
        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Email Address *</label>
          <input 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Please enter a valid email'
              }
            })} 
            className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
            placeholder='example@gmail.com'
            disabled={isSubmitting}
          />
          {errors?.email && <Warning>{errors.email.message}</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Password *</label>
          <input 
            type="password" 
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain uppercase, lowercase, number and special character'
              }
            })} 
            className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
            placeholder='********'
            disabled={isSubmitting}
          />
          {errors?.password && <Warning>{errors.password.message}</Warning>}
        </div>

        <div className='flex flex-row items-center gap-2'>
          <input 
            type="checkbox" 
            {...register('rememberMe')} 
            className='text-primary-blue w-4 h-4'
            disabled={isSubmitting}
          />
          <label className='h5 md:text-xl'>Remember Me</label>
        </div>

        <Link to="/signup" className='text-text-dark'>
          Don't have an account? <span className='text-primary-blue'>Sign Up</span>
        </Link>

        <button 
          type="submit" 
          className='bg-primary-blue w-32 h-10 rounded-md self-center lg:w-40 lg:h-12 lg:text-2xl text-md font-bold text-text-light place-items-center'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
