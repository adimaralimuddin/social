import './App.css';
import Main from './layouts/Main';
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
