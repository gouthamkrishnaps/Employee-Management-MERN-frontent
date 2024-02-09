import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import CandidateList from './components/CandidateList';
import CandidateEdit from './components/CandidateEdit';
import PdfData from './components/PdfData';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/candidate-list' element={<CandidateList/>}/>
        <Route path='/candidate-edit/:id' element={<CandidateEdit/>}/>
        <Route path='/pdf/:id' element={<PdfData/>}/>
      </Routes>
    </div>
  );
}

export default App;
