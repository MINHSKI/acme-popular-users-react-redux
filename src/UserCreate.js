import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from './store';


class UserCreate extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      error: null
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onSave(ev){
    ev.preventDefault();
    const user = { name: this.state.name };
    this.props.saveUser(user)
      .catch((err)=> {
        this.setState({ error: err.response.data.name });
      });
  }
  onChangeName(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { name, error } = this.state;
    const { onChangeName, onSave } = this;
    return (
      <div>
        <h1>Create A User</h1>
        <form onSubmit={ onSave }>
          {
            error && (
              <div style={{ color: 'red' }}>
                {
                  error
                }
              </div>
            )
          }
          <input value={ name } onChange={ onChangeName }/>
          <button>Create</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    saveUser: (user)=> dispatch(saveUser(user, history)),
  };
};

export default connect(null, mapDispatchToProps)(UserCreate);
