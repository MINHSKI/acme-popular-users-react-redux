import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from './store';

class Login extends Component{
  constructor(){
    super();
    this.state = { name: '', password: '' };
    this.onChange = this.onChange.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
  }
  attemptLogin(ev){
    ev.preventDefault();
    this.props.attemptLogin(this.state);
  }
  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { name, password } = this.state;
    const { onChange } = this;
    const { attemptLogin } = this;
    return (
      <form>
        { JSON.stringify(this.state) }
        <input value={ name } onChange= { onChange } name='name'/>
        <input value={ password } onChange= { onChange } name='password'/>
        <button onClick={ attemptLogin }>Login</button>
      </form>
    );
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    attemptLogin: (credentials)=> {
      dispatch(attemptLogin(credentials));
    }
  };
};
export default connect(null, mapDispatchToProps)(Login);
