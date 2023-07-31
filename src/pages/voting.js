import user_img from '../assets/user.png';
import DrawerAppBar from './components/navbar';

const Voting = () => {
  return (
    <div className='h-[100vh] w-[100vw] font-mono bg-slate-300'>
      <DrawerAppBar></DrawerAppBar>
      <div className='h-[100vh] w-[100vw] p-2 grid grid-cols-4 gap-4'>
        <div className='w-[100%] h-[50%] rounded-lg overflow-hidden p-2 bg-white'>
          <div className='h-1/2 flex justify-center items-center'>
            <img src={user_img} className='h-full' />
          </div>
          <div className='h-1/2 '>
            <div className='mt-5 flex flex-col'>
              <span>Name:</span>
              <span>Date of birth</span>
              <span>Hometown:</span>
              <span>Academic level:</span>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[50%] rounded-lg overflow-hidden p-2 bg-white'>
          <div className='h-1/2 flex justify-center items-center'>
            <img src={user_img} className='h-full' />
          </div>
          <div className='h-1/2 '>
            <div className='mt-5 flex flex-col'>
              <span>Name:</span>
              <span>Date of birth</span>
              <span>Hometown:</span>
              <span>Academic level:</span>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[50%] rounded-lg overflow-hidden p-2 bg-white'>
          <div className='h-1/2 flex justify-center items-center'>
            <img src={user_img} className='h-full' />
          </div>
          <div className='h-1/2 '>
            <div className='mt-5 flex flex-col'>
              <span>Name:</span>
              <span>Date of birth</span>
              <span>Hometown:</span>
              <span>Academic level:</span>
            </div>
          </div>
        </div>
        <div className='w-[100%] h-[50%] rounded-lg overflow-hidden p-2 bg-white'>
          <div className='h-1/2 flex justify-center items-center'>
            <img src={user_img} className='h-full' />
          </div>
          <div className='h-1/2 '>
            <div className='mt-5 flex flex-col'>
              <span>Name:</span>
              <span>Date of birth</span>
              <span>Hometown:</span>
              <span>Academic level:</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
