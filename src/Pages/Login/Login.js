import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = data => {

        setLoginError('');
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                setLoginError(error.message)
            });
    }

    return (
        <div className='h-[75vh] flex justify-center items-center'>
            <div className='border-2 rounded-xl w-96 p-7'>
                <h2 className='text-xl text-center mb-8 font-semibold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control mb-2 w-full max-w-xs">
                        <label className="label font-semibold"><span className="label-text">Email</span></label>
                        <input type="text"  {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className=' pt-1 text-red-400'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label font-semibold"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                // minLength: { value: 6, message: "Password must be atleast 6 characters" }
                            })
                            } className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className=' pt-1 text-red-400'>{errors.password?.message}</p>}
                        {loginError && <p className='text-red-400 pt-1'>{loginError.slice(10, -1)}</p>}
                        <label className="label"><span className="label-text font-semibold text-[12px]">Forget Password?</span></label>
                    </div>
                    <input type="submit" value='Login' className='btn btn-accent w-full max-w-xs mt-2' />
                </form>
                <p className='mt-4 w-4/5 mx-auto text-[13px]'>New to Doctors Portal? <Link to='/signup' className='text-secondary '>Create new account</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;