import React, {Fragment, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';

const Login = React.lazy(() => import('login/Login'));
const Signup = React.lazy(() => import('signup/Signup'));
const Home = React.lazy(() => import('home/Home'));

function App() {
    return (
        <Router>
            <Fragment>
                <Suspense fallback="">
                    <Routes>
                        {/*<Route exact path='/' element={<PrivateRoute/>}>*/}
                            <Route exact path='/' element={<Home/>}/>
                        {/*</Route>*/}
                        <Route exact path='/login' element={<Login/>}/>
                        <Route exact path='/signup' element={<Signup/>}/>
                    </Routes>
                </Suspense>
            </Fragment>
        </Router>
    );
}

export default App;
