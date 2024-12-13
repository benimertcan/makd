import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Warning from './Warning';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        setValue('role_id', response.data[0].code);
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
      toast.success("You need to click the link in the email to activate your account!");
      history.goBack();
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed. Please check your inputs and try again.');
    }
  };

  return (
    <section className='flex flex-col justify-center place-items-center bg-[url("/images/background.png")] min-h-screen bg-center bg-cover bg-no-repeat'>
      <h1 className='h2 text-text-light mt-5'>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='gap-5 flex flex-col bg-text-light opacity-90 p-10 rounded-3xl min-w-80 md:min-w-[45rem] my-10'>


        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Name *</label>
          <input {...register('name', { required: true, minLength: 3 })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='Full Name *' />
          {errors?.name && <Warning>Name is required and must be at least 3 characters.</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Email Adress *</label>
          <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='example@gmail.com' />
          {errors?.email && <Warning>Email is required and must be valid.</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Password *</label>
          <input type="password" {...register('password', { required: true, minLength: 8, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='********' />
          {errors?.password && <Warning>Password must be at least 8 characters, including numbers, upper and lower case letters, and special characters.</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Confirm Password *</label>
          <input type="password" {...register('confirmPassword', { validate: value => value === watch('password') || "Passwords do not match" })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='********' />
          {errors?.confirmPassword && <Warning>{errors.confirmPassword?.message}</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Role *</label>
          <select {...register('role_id')} className='text-text-light bg-primary-blue rounded-md paragraph  p-2 border-[#D9D9D9] border-[1px] ml-2' >
            {roles?.map(role => (
              <option key={role.id} value={role.code} className='bg-text-light text-text-dark'>{role.name}</option>
            ))}
          </select>
        </div>

        {isStore && (
          <>
            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Name *</label>
              <input {...register('storeName', { required: true, minLength: 3 })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='Store Full Name *' />
              {errors?.storeName && <Warning>Store Name is required and must be at least 3 characters.</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Phone *</label>
              <input {...register('storePhone', { required: true })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='Store Phone *' />
              {errors?.storePhone && <Warning>Store Phone is required.</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Tax ID *</label>
              <input {...register('storeTaxID', { required: true, pattern: /^T\d{4}V\d{6}$/ })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='Store Tax ID *' />
              {errors?.storeTaxID && errors.storeTaxID.message !== "undefined" && <Warning>{errors.storeTaxID.message}</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Bank Account *</label>
              <input {...register('storeBankAccount', { required: true })} className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' placeholder='Store Bank Account *' />
              {errors?.storeBankAccount && <Warning>Store Bank Account is required.</Warning>}
            </div>
          </>
        )}
        <Link to="/login" className='text-text-dark'>Already have an account? <span className='text-primary-blue'>Login</span></Link>
        <button
          type="submit"
          className={`bg-primary-blue w-32 h-10 rounded-md self-center lg:w-40 lg:h-12 lg:text-2xl text-md font-bold text-text-light place-items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <span>Submit</span>
          )}
        </button>      
        </form>
    </section>
  );
};

export default UserForm;