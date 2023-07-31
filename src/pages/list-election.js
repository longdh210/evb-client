import ElectionInfoCard from './components/election-info-card';
import { getListElection, addParty } from '../api';
import { useEffect, useState } from 'react';
import DrawerAppBar from './components/navbar';
import { Dialog, CircularProgress, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';

const ListElection = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  // const [listProposalsUrl, setListProposalsUrl] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [ballotContractAddress, setBallotContractAddress] = useState('');
  // const [proposalsInfo, setProposalInfo] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListElection();
      console.log(res.data);
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center font-mono bg-slate-300'>
      <DrawerAppBar></DrawerAppBar>
      {data == [] ? <h1>There are no elections yet</h1> : <></>}
      {loadingData ? (
        <CircularProgress size={100}></CircularProgress>
      ) : (
        <div className='h-full w-[100vw] p-2 grid grid-cols-4 gap-4'>
          {data.map((item) => (
            <ElectionInfoCard
              image={item.image}
              name={item.name}
              description={item.description}
              address={item.electionAddress}
              isButton={false}
              nameButton='Add party'
              onClickCard={() =>
                nav(`/list-party/${item.electionAddress}`, {
                  state: {
                    ballotContractAddress: item.electionAddress,
                  },
                })
              }
              onClickButtonAdd={() => {
                setBallotContractAddress(item.electionAddress);
                setOpenDialog(true);
              }}
            ></ElectionInfoCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListElection;
