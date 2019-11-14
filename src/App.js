import React from 'react';
import {
    Route ,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom'
import Login from './views/Login/index2'
import ListView from './views/ListView/index'
import Tabs from './views/Tabs/index'
class  App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path={'/login'} component={Login}></Route>
                    <Route path={'/listview'} component={ListView}></Route>
                    <Route path={'/'} component={Tabs}></Route>
                </Switch>  
            </Router>
        )
    }
}

export default App;
