import React, { Component } from 'react';
import Nav from './Nav';
import { loadUsers } from './store';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import User from './User';
import UserCreate from './UserCreate';

class App extends Component{
  componentDidMount(){
    this.props.loadUsers();
  }
  render(){
    return (
      <Router>
      <div>
        <Nav />
        <Route path='/' exact component={ Home } />
        <Route path='/users' exact component={ Users } />
        <Switch>
          <Route path='/users/create' exact render={({ history })=> <UserCreate  history={ history }/> } />
          <Route path='/users/:id' exact render={({ match, history })=> <User id={ match.params.id*1 } history={ history }/> } />
        </Switch>
      </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    loadUsers: ()=> dispatch(loadUsers())
  };
};


export default connect(null, mapDispatchToProps)(App);


