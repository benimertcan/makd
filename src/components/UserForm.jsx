import React, { useEffect,useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Warning from './Warning';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchRoles } from '../actions/clientActions';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';

const UserForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm();
  const dispatch = useDispatch();
  const { roles } = useSelector(state => state.client);
  const [isStore, setIsStore] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (roles.length > 0) {
      setValue('role_id', roles[0].code);
    }
  }, [roles, setValue]);

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
      const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/signup', formData);
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
          <Input
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })} 
            className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
            placeholder='Full Name *'
            disabled={isSubmitting}
          />
          {errors?.name && <Warning>{errors.name.message}</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Email Address *</label>
          <Input
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
          <Input
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

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Confirm Password *</label>
          <Input 
            type="password" 
            {...register('confirmPassword', { 
              validate: value => value === watch('password') || "Passwords do not match" 
            })} 
            className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
            placeholder='********'
            disabled={isSubmitting}
          />
          {errors?.confirmPassword && <Warning>{errors.confirmPassword.message}</Warning>}
        </div>

        <div className='flex flex-col gap-2'>
          <label className='h5 md:text-xl'>Role *</label>
          <select 
            {...register('role_id')} 
            className='text-text-light bg-primary-blue rounded-md paragraph p-2 border-[#D9D9D9] border-[1px] ml-2'
            disabled={isSubmitting}
          >
            {roles?.map(role => (
              <option key={role.id} value={role.code} className='bg-text-light text-text-dark'>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {isStore && (
          <>
            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Name *</label>
              <Input 
                {...register('storeName', { 
                  required: isStore && 'Store name is required' 
                })} 
                className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
                placeholder='Store Name'
                disabled={isSubmitting}
              />
              {errors?.storeName && <Warning>{errors.storeName.message}</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Phone *</label>
              <Input
                {...register('storePhone', { 
                  required: isStore && 'Store phone is required',
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Please enter a valid phone number'
                  }
                })} 
                className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
                placeholder='Store Phone'
                disabled={isSubmitting}
              />
              {errors?.storePhone && <Warning>{errors.storePhone.message}</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Tax ID *</label>
              <Input
                {...register('storeTaxID', { 
                  required: isStore && 'Store tax ID is required' 
                })} 
                className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
                placeholder='Store Tax ID'
                disabled={isSubmitting}
              />
              {errors?.storeTaxID && <Warning>{errors.storeTaxID.message}</Warning>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='h5 md:text-xl'>Store Bank Account *</label>
              <Input
                {...register('storeBankAccount', { 
                  required: isStore && 'Store bank account is required' 
                })} 
                className='text-text-dark bg-bg-input paragraph rounded-sm p-2 border-[#D9D9D9] border-[1px] ml-2' 
                placeholder='Store Bank Account'
                disabled={isSubmitting}
              />
              {errors?.storeBankAccount && <Warning>{errors.storeBankAccount.message}</Warning>}
            </div>
          </>
        )}

        <Link to="/login" className='text-text-dark'>
          Already have an account? <span className='text-primary-blue'>Login</span>
        </Link>

        <Button
        variant="outline"
          type="submit" 
          className='w-full md:w-auto self-center bg-primary-blue text-text-light'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </section>
  );
};

export default UserForm;