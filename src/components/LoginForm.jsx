
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Gravatar from 'react-gravatar';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.token) {
        const { token } = response;
        if (data.rememberMe) {
          localStorage.setItem('token', token);
        }
        history.push(history.location.state?.from || '/');
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} />
        {errors?.email && <div>Email is required and must be a valid email address</div>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password', { required: true })} />
        
      </div>
      <div>
        <label>Remember Me</label>
        <input type="checkbox" {...register('rememberMe')} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
