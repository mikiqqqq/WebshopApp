import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/tech" element={<MainContainer/>}>
        
      </Route>
    </Routes>
    </BrowserRouter>
      );
}

export default App;
