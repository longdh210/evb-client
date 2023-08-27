import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Voting from './pages/voting';
import Undefine from './pages/undefine';
import Signup from './pages/signup';
import ListElection from './pages/list-election';
import ListParty from './pages/list-party';
import ListProposal from './pages/list-proposal';
import CreateStartupInfo from './pages/create-startup-info';
import ListCompanies from './pages/list-company';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='voting' element={<Voting />}></Route>
        <Route path='create' element={<CreateStartupInfo />}></Route>
        <Route path='list' element={<ListCompanies />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <Route path='list-election' element={<ListElection />}></Route>
        <Route path='list-party/*' element={<ListParty />}></Route>
        <Route path='list-proposals/*' element={<ListProposal />}></Route>
        <Route path='*' element={<Undefine />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
