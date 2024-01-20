import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NotFound from './components/NotFound';
import GamesList from './components/Games/GamesList/GamesList';
import GameDetails from './components/Games/GameDetails/GameDetails';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import CreateGame from './components/Games/CreateGame/CreateGame';
import Login from './components/Users/Login/Login';
import Register from './components/Users/Register/Register';
import { AuthProvider } from './services/AuthContext/AuthContext';
import EditGame from './components/Games/EditGame/EditGame';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data/games" element={<GamesList />} />
            <Route path="/data/games/:gameId" element={<GameDetails />} />
            <Route path="/data/games/create" element={<CreateGame />} />
            <Route path="/data/games/edit/:gameId" element={<EditGame />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
