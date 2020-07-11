import React, { Component } from "react";
import { BrowserRouter , Switch, Route} from 'react-router-dom';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import LoginRegister from './LoginRegister';
import Tasks from './Tasks';
import NotFound from './NotFound';

class App extends Component {
  url = "/api";
  render() {
    return (
      
      <BrowserRouter>
      <div className="App">
        <br></br>
        <Switch>
        
          <Route exact path ='/' component={(props) =>  <LoginRegister     {...props} />} />  
          <Route exact path='/Tasks/:userId/:boss' component={(props) =>
                <Tasks userID={props.match.params.userId}
                  boss={props.match.params.boss}
                  {...props} />} />  
          <Route  component={NotFound}/>
        </Switch>        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
