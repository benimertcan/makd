import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserForm = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
    const [roles, setRoles] = useState([]);
    const [isStore, setIsStore] = useState(false);
    const history = useHistory();
  
    const api = axios.create({
      baseURL: 'https://workintech-fe-ecommerce.onrender.com'
    });
  
    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await api.get('/roles');
          setRoles(response.data);
          setValue('role_id', response.data[0].id); 
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      };
      fetchRoles();
    }, [setValue]);
  
    const role_id = watch('role_id');
    useEffect(() => {
      setIsStore(role_id === "store"); 
    }, [role_id]);
  
    const onSubmit = async (data) => {
      const formData = isStore ? {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id,
        store: {
          name: data.storeName,
          phone: data.storePhone,
          tax_no: data.storeTaxID,
          bank_account: data.storeBankAccount
        }
      } : {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };
  
      try {
        await api.post('/signup', formData);
        alert("You need to click the link in the email to activate your account!");
        history.goBack();
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please check your inputs and try again.');
      }
    };
  
    return (
      <section className='flex flex-col justify-center items-center bg-[url("/images/background.jpg")] h-[100vh] bg-center bg-cover'>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-5 flex flex-col'>
        <div className='flex flex-col '>
          <label>Name</label>
          <input {...register('name', { required: true, minLength: 3 })} />
          {errors.name && <span>Name is required and must be at least 3 characters.</span>}
        </div>
  
        <div className='flex flex-col '>
          <label>Email</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          {errors.email && <span>Email is required and must be valid.</span>}
        </div>
  
        <div className='flex flex-col '>
          <label>Password</label>
          <input type="password" {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} />
          {errors.password && <span>Password must be at least 8 characters, including numbers, upper and lower case letters, and special characters.</span>}
        </div>
  
        <div className='flex flex-col '>
          <label>Confirm Password</label>
          <input type="password" {...register('confirmPassword', { validate: value => value === watch('password') || "Passwords do not match" })} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
  
        <div className='flex flex-col '>
          <label>Role</label>
          <select {...register('role_id')}>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
  
        {isStore && (
          <>
            <div>
              <label>Store Name</label>
              <input {...register('storeName', { required: true, minLength: 3 })} />
              {errors.storeName && <span>Store Name is required and must be at least 3 characters.</span>}
            </div>
  
            <div>
              <label>Store Phone</label>
              <input {...register('storePhone', { required: true })} />
              {errors.storePhone && <span>Store Phone is required.</span>}
            </div>
  
            <div>
              <label>Store Tax ID</label>
              <input {...register('storeTaxID', { required: true })} />
              {errors.storeTaxID && <span>Store Tax ID is required.</span>}
            </div>
  
            <div>
              <label>Store Bank Account</label>
              <input {...register('storeBankAccount', { required: true })} />
              {errors.storeBankAccount && <span>Store Bank Account is required.</span>}
            </div>
          </>
        )}
  
        <button type="submit" disabled={isSubmitting}>Sign Up</button>
      </form>
      </section>
    );
  };
  
  export default UserForm;