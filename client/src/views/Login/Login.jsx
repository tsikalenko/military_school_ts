import { useForm } from 'react-hook-form';
import { login } from '../../api/userAPI';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../utils/styles/_utils.scss';
import '../../utils/styles/_edit.scss';

const Login = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        (async () => {
            try {
                const { token } = await login(data.username, data.password);
                localStorage.setItem('token', JSON.stringify(token));
                navigate('/admin');
            } catch (err) {
                setError(err.response.data.message);
            }
        })();
    };

    return (
        <>
            <div className='edit container'>
                <h2 className='edit__title'>Логин</h2>
                <form className='edit__form' onSubmit={handleSubmit(onSubmit)}>
                    <div className='edit__item edit__item--sm'>
                        <input
                            type='text'
                            {...register('username', { required: true })}
                            className='edit__input edit__input--text'
                            placeholder={'Username'}
                        />
                        {errors.username?.type === 'required' && (
                            <p role='alert' className='edit__error'>
                                login is required
                            </p>
                        )}
                    </div>

                    <div className='edit__item edit__item--sm'>
                        <input
                            type='password'
                            {...register('password', { required: true })}
                            className='edit__input edit__input--text'
                            placeholder={'Password'}
                        />
                        {errors.password?.type === 'required' && (
                            <p role='alert' className='edit__error'>
                                password is required
                            </p>
                        )}
                    </div>
                    {error && <p className='edit__error'>{error}</p>}
                    <input
                        type='submit'
                        className='button button--accent'
                        value='Увійти'
                    />
                </form>
            </div>
        </>
    );
};

export default Login;
