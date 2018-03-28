import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUser } from './store';

const Users = ({ users, increment, decrement })=> {
  return (
    <ul>
    {
      users.map( user => {
        return (
          <li key={ user.id }>
            <Link to={ `/users/${user.id}`}>{ user.name }</Link>
            <br />
            <button onClick={()=> decrement(user) }>-</button>
            { user.rating }
            <button onClick={()=> increment(user) }>+</button>
          </li>
        );
      })
    }
    </ul>
  );
};

const mapStateToProps = ({ users })=> {
  return {
    users
  };
};

const mapDispatchToProps = ( dispatch, { history })=> {
  return {
    increment: (user)=> {
      user.rating++;
      return dispatch(saveUser(user));
    },
    decrement: (user)=> {
      user.rating--;
      return dispatch(saveUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
