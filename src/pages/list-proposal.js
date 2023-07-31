import { useEffect, useState } from 'react';
import DrawerAppBar from './components/navbar';
import { CircularProgress, Button } from '@mui/material';
import ElectionInfoCard from './components/election-info-card';
import { getListProposals, vote } from '../api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:8545/');

const ListProposal = () => {
  const location = useLocation();
  let ballotContractAddress = location.state.ballotContractAddress;
  let partyId = location.state.partyId;

  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListProposals(ballotContractAddress, partyId);
      console.log(res.data);
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

  const handleSubmit = async (proposalId, voterAddress) => {
    setLoadingVote(true);
    var voteInfo = {
      ballotContractAddress,
      partyId,
      proposalId,
    };

    const accounts = await global.window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts[0]);
    const signedData = await global.window.ethereum.request({
      method: 'personal_sign',
      params: [JSON.stringify(voteInfo), accounts[0]],
    });
    console.log(signedData);
    const recoveredAddr = web3.eth.accounts.recover(
      JSON.stringify(voteInfo),
      signedData
    );
    console.log(recoveredAddr);

    const res = await vote(voteInfo, signedData);
    if (res.data == true) {
      alert('Vote successfully');
    } else {
      alert(res.data.error.reason);
    }
    setLoadingVote(false);
  };

  return (
    <div className='h-[100vh] w-[100vw] flex flex-col justify-center items-center font-mono bg-slate-300'>
      <DrawerAppBar></DrawerAppBar>
      {loadingData ? (
        <CircularProgress size={100}></CircularProgress>
      ) : (
        <div className='h-full w-[100vw] p-2 grid grid-cols-4 gap-8'>
          {data.map((item) => (
            <ElectionInfoCard
              id={item.proposalId}
              image={item.image}
              name={item.name}
              voteCount={item.voteCount}
              dateOfBirth={item.dateOfBirth}
              hometown={item.hometown}
              academicLevel={item.academicLevel}
              isButton={true}
              nameButton='Vote'
              pageName='proposals'
              loading={loadingVote}
              onClickButtonAdd={
                () =>
                  handleSubmit(
                    item.proposalId,
                    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
                  )
                // onClick={async () => {
                //   var accounts = await web3.eth.getAccounts();
                //   const signedData = await global.window.ethereum.request({
                //     method: 'personal_sign',
                //     params: [JSON.stringify(msgParams), accounts[0]],
                //   });
                //   console.log(signedData);
                //   const recoveredAddr = web3.eth.accounts.recover(
                //     JSON.stringify(msgParams),
                //     signedData
                //   );
                //   console.log(recoveredAddr);
                // }}
              }
            ></ElectionInfoCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProposal;
