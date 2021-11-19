import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
