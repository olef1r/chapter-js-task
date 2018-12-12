import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EditComponent from './EditComponent';
import IndexComponent from './IndexComponent' 

class App extends Component {
  state = { 
  }
  render() {  
    return (
       <Router>
        <div>
      
        
          <hr />
          <Switch>
              <Route exact path='/' component={IndexComponent} />
              <Route path='/edit/:id' component={EditComponent} />
          
          </Switch>
        </div>
      </Router>
    );
  }   
}

export default App;
