import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import Simulador from './pages/simulador/index';
import { BrowserRouter, Switch, Route, HashRouter } from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App} />} />        
            <Route  path="/simulador/:plano" component={Simulador} />} />        
         </Switch>
    </HashRouter>, 

document.querySelector('#root'));


