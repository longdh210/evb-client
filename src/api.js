import { request } from './utils/axios';

export async function userSignup(userInfo) {
  console.log('run signup api');
  const response = await request.request({
    method: 'POST',
    url: '/users/signup',
    data: {
      citizenId: userInfo.citizenId,
      email: userInfo.email,
      address: userInfo.address,
      username: userInfo.username,
      password: userInfo.password,
    },
  });
  return response;
}

export async function userLogin(username, password) {
  const response = await request.request({
    method: 'POST',
    url: '/auth/user/login',
    data: {
      username,
      password,
    },
  });
  return response;
}

export async function getListElection() {
  const response = await request.request({
    method: 'GET',
    url: '/create-election/',
  });
  return response;
}

export async function getAllParty(ballotContractAddress) {
  const response = await request.request({
    method: 'GET',
    url: `/party/${ballotContractAddress}`,
  });
  return response;
}

export async function getListProposals(ballotContractAddress, partyId) {
  const response = await request.request({
    method: 'GET',
    url: `/party/list-proposals/${ballotContractAddress}/${partyId}`,
  });
  return response;
}

export async function vote(voteInfo, signedData) {
  const response = await request.request({
    method: 'POST',
    url: `/proposal/vote`,
    data: {
      ballotContractAddress: voteInfo.ballotContractAddress,
      partyId: voteInfo.partyId,
      proposalId: voteInfo.proposalId,
      signedData: signedData,
    },
  });
  return response;
}
