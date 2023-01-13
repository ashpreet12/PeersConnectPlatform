import './App.css';
import { BrowserRouter,Routes, Route,Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';


const isAuthenticated = false;
const user = {
    activated : false
}

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route exact path = '/' 
                    element = {
                        <GuestRoute finalDestination = '/rooms'>
                            <Home />
                        </GuestRoute>
                }
                />
                <Route path = '/authenticate'
                    element = {
                        <GuestRoute finalDestination = '/rooms'>
                            <Authenticate />
                        </GuestRoute>
                    }
                />

                <Route path = '/activate'
                    element = {
                        <SemiProtectedRoute finalDestination = '/rooms'>
                            <Activate />
                        </SemiProtectedRoute>
                    }
                />

                <Route path = '/rooms'
                    element = {
                        <ProtectedRoute>
                            <Rooms />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}


function GuestRoute({children,finalDestination}) {
    return isAuthenticated ? <Navigate to = {finalDestination} /> : children;
}

function SemiProtectedRoute({children,finalDestination}) {
    let isActivated = user.activated;
    return !isAuthenticated ? <Navigate to = '/'/> : !isActivated ? children : <Navigate to = {finalDestination}/>
}

function ProtectedRoute({children}) {
    let isActivated = user.activated;
    return !isAuthenticated ? <Navigate to = '/'/> : !isActivated ? <Navigate to = '/activate'/> : children
}

export default App;
