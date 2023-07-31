import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

const ElectionInfoCard = ({
  id,
  image,
  name,
  description,
  address,
  isButton,
  nameButton,
  onClickButtonAdd,
  onClickCard,
  voteCount,
  dateOfBirth,
  hometown,
  academicLevel,
  pageName,
  loading,
}) => {
  return (
    <div
      className={
        pageName == 'proposals'
          ? 'w-[100%] h-[60%] rounded-lg overflow-hidden p-4 bg-white'
          : 'w-[100%] h-[45%] rounded-lg overflow-hidden p-4 bg-white'
      }
    >
      <div
        className='h-[75%] flex justify-center items-center'
        onClick={onClickCard}
      >
        <img src={image} className='h-full' />
      </div>
      <div className=''>
        <div className='mt-5 flex flex-col font-bold'>
          {id != null ? <span>Id: {id}</span> : <></>}
          {voteCount != null ? <span>Vote count: {voteCount}</span> : <></>}
          <span>Name: {name}</span>
          {dateOfBirth != null ? (
            <span>Data of birth: {dateOfBirth}</span>
          ) : (
            <></>
          )}
          {hometown != null ? <span>Hometown: {hometown}</span> : <></>}
          {academicLevel != null ? (
            <span>Academic level: {academicLevel}</span>
          ) : (
            <></>
          )}
          {description != null ? (
            <span>Description: {description}</span>
          ) : (
            <></>
          )}
          {address != null ? <span>Address: {address}</span> : <></>}
          {isButton == true ? (
            <LoadingButton
              variant='contained'
              style={{
                fontWeight: 'bold',
                backgroundColor: 'black',
                marginTop: '10px',
              }}
              onClick={onClickButtonAdd}
              loading={loading}
              loadingIndicator={
                <CircularProgress style={{ color: 'white' }}></CircularProgress>
              }
            >
              {nameButton}
            </LoadingButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionInfoCard;
