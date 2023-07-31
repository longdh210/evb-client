import { TextField, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import uit_logo from '../assets/uit-logo.png';
import usa_logo from '../assets/usa.png';
import * as React from 'react';
import { userSignup } from '../api';

const Signup = () => {
  const [formState, setFormState] = React.useState({
    citizenId: '',
    email: '',
    address: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    event.persist();

    updateState(event);
  };

  const updateState = (event) =>
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));

  const validate = () => {
    if (
      formState.username == '' ||
      formState.password == '' ||
      formState.citizenId == '' ||
      formState.address == '' ||
      formState.email == ''
    ) {
      alert('Please fill all information');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const check = validate();
    if (check == true) {
      setLoading(true);
      const res = await userSignup(formState);
      alert(res.data);
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[100vh] w-[100vw] font-mono justify-center items-center bg-gray-300'>
      <div className='flex flex-row h-[90vh] w-[90vw] rounded-3xl overflow-hidden shadow-md'>
        <div className='flex w-1/2 h-full justify-center items-center flex-col bg-white'>
          <div className='mb-14 text-center font-mono'>
            <h1 className='text-8xl font-bold mb-2'>Hi there!</h1>
            <h2 className='text-2xl'>Welcome to EVB</h2>
          </div>
          <TextField
            name='citizenId'
            id='outlined-basic'
            label='Citizen ID'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='email'
            id='outlined-basic'
            label='Email'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='address'
            id='outlined-basic'
            label='Address'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='username'
            id='outlined-basic'
            label='Your username'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            onChange={handleChange}
          />
          <TextField
            name='password'
            id='outlined-basic'
            label='Password'
            variant='outlined'
            className='w-[25vw]'
            margin='normal'
            type='password'
            onChange={handleChange}
          />
          <LoadingButton
            className='w-[25vw] h-[6vh] text-xl font-bold'
            variant='contained'
            style={{
              borderRadius: 35,
              marginTop: 30,
              backgroundColor: 'black',
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 7,
            }}
            onClick={handleSubmit}
            loading={loading}
            loadingIndicator={
              <CircularProgress style={{ color: 'white' }}></CircularProgress>
            }
          >
            Signup
          </LoadingButton>
          <span>
            Have an account?
            <a className='text-black font-bold' href='/'>
              Login
            </a>
          </span>
        </div>
        <div className='flex w-1/2 h-full justify-center items-center bg-blue-200'>
          <div className='w-full flex flex-row justify-center items-center'>
            <img src={uit_logo} className='w-auto h-[25vh]' />
            <img src={usa_logo} className='w-auto h-[25vh]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
