import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser, deleteUser } from './store';


class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: this.props.user ? this.props.user.name : '',
      rating: this.props.user ? this.props.user.rating : '',
      error: null 
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(){
    this.props.deleteUser({ id: this.props.id });
  }
  onSave(ev){
    ev.preventDefault();
    const user = { id: this.props.id, name: this.state.name, rating: this.state.rating };
    this.props.saveUser(user)
      .catch((err)=> {
        this.setState({ error: err.response.data.name });
      });
  }
  onChangeName(ev){
    this.setState({ name: ev.target.value });
  }
  onChangeRating(ev){
    this.setState({ rating: ev.target.value });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.user ? nextProps.user.name : '',
      rating: nextProps.user ? nextProps.user.rating : ''
    });
  }
  render(){
    const { user } = this.props;
    const { name, rating, error } = this.state;
    const { onChangeName, onSave, onDelete, onChangeRating } = this;
    if(!user){
      return (
        <div>IM HERE STILL</div>
      );
    }
    return (
      <div>
        <h1>{ user.name }</h1>
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
          <br />
          <input value={ rating } onChange={ onChangeRating }/>
          <br />
          <button>Update</button>
        </form>
        <button onClick={ onDelete }>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id })=> {
  const user = users.find( user => user.id === id );
  return {
    user
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    saveUser: (user)=> dispatch(saveUser(user, history)),
    deleteUser: (user)=> dispatch(deleteUser(user, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
