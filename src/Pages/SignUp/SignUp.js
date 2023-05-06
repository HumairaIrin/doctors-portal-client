import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail)
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignup = data => {
        setSignUpError('');
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User created successfully')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => { })
                    .catch(error => console.error(error))
                saveUser(data.name, data.email)
            })
            .catch(error => {
                console.error(error)
                setSignUpError(error.message);
            })
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            });
    }
    return (
        <div className='h-[85vh] flex justify-center items-center'>
            <div className='border-2 rounded-xl w-96 p-7'>
                <h2 className='text-xl text-center mb-8 font-semibold'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="form-control mb-2 w-full max-w-xs">
                        <label className="label font-semibold"><span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: 'Name is required'
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-400'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control mb-2 w-full max-w-xs">
                        <label className="label font-semibold"><span className="label-text">Email</span></label>
                        <input type="text" {...register("email", { required: "Email is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-400'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label font-semibold"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be atleast 6 characters" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must have atleast one uppercase,number and special character" }
                                })
                            }
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-400'>{errors.password?.message}</p>}
                    </div>
                    <input type="submit" value='Sign Up' className='btn btn-accent w-full max-w-xs mt-7' />
                </form>
                {signUpError && <p className='text-red-400'>{signUpError.slice(10, -1)}</p>}
                <p className='mt-4 w-4/5 mx-auto text-[13px]'>Already have an account? <Link to='/login' className='text-secondary'>Login Now</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;