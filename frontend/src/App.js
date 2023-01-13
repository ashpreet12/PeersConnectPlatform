import './App.css';
import { BrowserRouter,Routes, Route,Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

const isAuthenticated = true;

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path = '/' 
                    element = {
                        <RequireAuth redirectTo="/rooms">
                        <Home />
                        </RequireAuth>
                }
                />
                <Route path = '/authenticate'
                    element = {
                        <RequireAuth redirectTo="/rooms">
                        <Authenticate />
                        </RequireAuth>
                    }
                />
                <Route path = '/register' exact
                    element = {<Register/>}
                />
                <Route path = '/login' exact
                    element = {<Login/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

function RequireAuth({ children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}




export default App;
