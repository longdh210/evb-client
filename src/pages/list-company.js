import ElectionInfoCard from './components/election-info-card';
import { getListCompanies } from '../api';
import { useEffect, useState } from 'react';
import DrawerAppBar from './components/navbar';
import { Dialog, CircularProgress, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import GovernorContractABI from '../utils/abi/GovernorContract.json';
import InvestContractABI from '../utils/abi/Invest.json';
import { governorContractAddress, investAddress } from '../common/constants';
import { ethers, BigNumberish } from 'ethers';

const ListCompanies = () => {
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  // const [listProposalsUrl, setListProposalsUrl] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [ballotContractAddress, setBallotContractAddress] = useState('');
  // const [proposalsInfo, setProposalInfo] = useState('');
  const [formState, setFormState] = useState({
    represent: '',
    companyName: '',
    companyInfo: '',
    businessInfo: '',
    companyLogo: '',
  });

  const web3 = new Web3('http://127.0.0.1:8545/');
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListCompanies();
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

  const approve = async (projectId) => {
    setLoading(true);
    const signer = await provider.getSigner();
    const investContract = new ethers.Contract(
      investAddress,
      InvestContractABI.abi,
      signer
    );

    try {
      const investTxn = await investContract.invest(
        '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        0
      );
      await investTxn.wait();
      alert('Approve successfully!!!');
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center font-mono bg-slate-300'>
      <Dialog maxWidth='xl' open={openDialog}>
        <div className='flex flex-col p-6 items-center'>
          <label>Representative: {formState.represent}</label>
          <label>Company name: {formState.companyName}</label>
          <label>Company information: {formState.companyInfo}</label>
          <label>Business information: {formState.businessInfo}</label>
          <LoadingButton
            variant='contained'
            style={{
              fontWeight: 'bold',
              backgroundColor: '#ef4444',
              marginTop: '15px',
              width: '100%',
            }}
            onClick={() => setOpenDialog(false)}
            // loading={loading}
            loadingIndicator={
              <CircularProgress style={{ color: 'white' }}></CircularProgress>
            }
          >
            Reject
          </LoadingButton>
          <LoadingButton
            variant='contained'
            style={{
              fontWeight: 'bold',
              backgroundColor: '#22c55e',
              marginTop: '15px',
              width: '100%',
            }}
            loading={loading}
            onClick={() => approve()}
            loadingIndicator={
              <CircularProgress style={{ color: 'white' }}></CircularProgress>
            }
          >
            Approve
          </LoadingButton>
        </div>
      </Dialog>
      <DrawerAppBar></DrawerAppBar>
      {data == [] ? <h1>There are no elections yet</h1> : <></>}
      {loadingData ? (
        <CircularProgress size={100}></CircularProgress>
      ) : (
        <div className='h-full w-[100vw] p-2 grid grid-cols-4 gap-4'>
          {data.map((item) => (
            <ElectionInfoCard
              image={item.companyLogo}
              name={item.companyName}
              //   address={}
              isButton={false}
              //   nameButton='Add party'
              onClickCard={() => {
                // nav(`/list-party/${item.electionAddress}`, {
                //   state: {
                //     ballotContractAddress: item.electionAddress,
                //   },
                // })
                // propose(0)
                setFormState((formState) => ({
                  ...formState,
                  represent: item.represent,
                  companyName: item.companyName,
                  companyInfo: item.companyInfo,
                  businessInfo: item.businessInfo,
                  companyLogo: item.companyLogo,
                }));
                setOpenDialog(true);
              }}
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

export default ListCompanies;
