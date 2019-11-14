import React from 'react';
import {
    Route ,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom'
import Home from './views/Home/index'
import Login from './views/Login/index2'
class  App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path={'/login'} component={Login}></Route>
                    <Route path={'/'} component={Home}></Route>
                </Switch>  
            </Router>
        )
    }
}

export default App;
