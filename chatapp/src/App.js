import './App.css';
import { Routes , Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import OpenRoute from './Routes/OpenRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { Chat } from './components/Chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={
          <div>
            <OpenRoute>
              <LoginPage/>
            </OpenRoute>
          </div>
        }/>
        <Route path='/signup' element={
          <div>
            <OpenRoute>
              <SignUpPage/>
            </OpenRoute>
          </div>
        }/>
        <Route path='/chat' element={
          <div>
            <PrivateRoute>
              <Chat/>
            </PrivateRoute>
          </div>
        }/>
      </Routes>
    </div>
  );
}

export default App;
