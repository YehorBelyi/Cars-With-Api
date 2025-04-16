import { BrowserRouter } from 'react-router-dom';
import './App.css';
import HeaderComponent from './Components/Templates/Header';
import BodyComponent from './Components/Templates/Body';
import Context from './Context/Context';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Context>
          <HeaderComponent />
          <BodyComponent />
        </Context>
      </BrowserRouter>
    </div>
  );
}

export default App;
