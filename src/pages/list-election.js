import ElectionInfoCard from './components/election-info-card';
import { getListElection, addParty } from '../api';
import { useEffect, useState } from 'react';
import DrawerAppBar from './components/navbar';
import { Dialog, CircularProgress, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import GovernorContractABI from '../utils/abi/GovernorContract.json';
import { governorContractAddress, investAddress } from '../common/constants';
import { ethers, BigNumberish } from 'ethers';

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

  const web3 = new Web3('http://127.0.0.1:8545/');
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/');

  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoadingData(true);
      const res = await getListElection();
      setData(res.data);
      setLoadingData(false);
    }
    fetchData();
  }, []);

  const propose = async (projectId) => {
    const signer = await provider.getSigner();
    const governorContractWeb3 = new web3.eth.Contract(
      GovernorContractABI.abi,
      governorContractAddress
    );
    const governorContract = new ethers.Contract(
      governorContractAddress,
      GovernorContractABI.abi,
      signer
    );

    var encodedFunctionCall = web3.eth.abi.encodeFunctionCall(
      {
        inputs: [
          {
            internalType: 'address',
            name: '_startup',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'invest',
        type: 'function',
      },
      [investAddress, 0]
    );

    try {
      // const proposeTx = await governorContract.propose(
      //   [investAddress],
      //   [0],
      //   [encodedFunctionCall],
      //   'alo 13'
      // );
      // await proposeTx.wait();
      const listProposalId = await governorContractWeb3.getPastEvents(
        'ProposalCreated',
        {
          fromBlock: 0,
          toBlock: 'latest',
        }
      );
      console.log(
        // await governorContract.state(
        //   listProposalId[projectId].returnValues.proposalId
        // )
        listProposalId[projectId].returnValues.proposalId
      );
      // handleVote(listProposalId[projectId].returnValues.proposalId);
      await execute(
        listProposalId[projectId].returnValues.proposalId,
        investAddress,
        0
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleVote = async (proposalId) => {
    // 0 = Against, 1 = For, 2 = Abstain for this example
    const voteWay = 1;
    const reason = 'I lika do da cha cha';
    await vote(proposalId, voteWay, reason);
  };

  const vote = async (proposalId, voteWay, reason) => {
    const signer = await provider.getSigner();
    const governorContract = new ethers.Contract(
      governorContractAddress,
      GovernorContractABI.abi,
      signer
    );
    console.log('Voting...');
    // const governor = await ethers.getContract('GovernorContract');
    const voteTx = await governorContract.castVoteWithReason(
      proposalId,
      voteWay,
      reason
    );
    await voteTx.wait();
    console.log('Vote successfully');
    // const proposalState = await governor.state(proposalId);
    // console.log(`Current Proposal State: ${proposalState}`);
  };

  const execute = async (proposalId, startupAddress, value) => {
    var encodedFunctionCall = web3.eth.abi.encodeFunctionCall(
      {
        inputs: [
          {
            internalType: 'address',
            name: '_startup',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'invest',
        type: 'function',
      },
      [startupAddress, value]
    );
    const descriptionHash = ethers.keccak256(ethers.toUtf8Bytes('alo 13'));

    const signer = await provider.getSigner();
    const governorContract = new ethers.Contract(
      governorContractAddress,
      GovernorContractABI.abi,
      signer
    );

    console.log('Queueing...');
    const queueTx = await governorContract.queue(
      [investAddress],
      [0],
      [encodedFunctionCall],
      descriptionHash
    );
    await queueTx.wait();

    // console.log('Executing...');
    // // this will fail on a testnet because you need to wait for the MIN_DELAY!
    // const executeTx = await governorContract.execute(
    //   [investAddress],
    //   [0],
    //   [encodedFunctionCall],
    //   descriptionHash
    // );
    // await executeTx.wait();
  };

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
                // nav(`/list-party/${item.electionAddress}`, {
                //   state: {
                //     ballotContractAddress: item.electionAddress,
                //   },
                // })
                propose(0)
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
