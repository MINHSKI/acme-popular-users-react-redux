import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './store';

const Nav = ({ users, mostPopularUser, loggedIn, logout, user })=> {
  return (
    <ul>
      <li>
        <Link to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link to='/users'>
          Users ({ users.length })
        </Link>
      </li>
      {
        mostPopularUser && (
          <li>
            <Link to={`/users/${mostPopularUser.id}`}>
              Most Popular: { mostPopularUser.name }
            </Link>
          </li>
        )
      }
      <li>
        <Link to='/users/create'>
          Create A User
        </Link>
      </li>
      <li>
      {
        loggedIn ? (
          <a onClick={ logout }>Logout { user.name }</a>
        ) : (
          <Link to='/login'>
            Login
          </Link>
        )
      }
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users, user })=> {
  const mostPopularUser = users.reduce((memo, user)=> {
    if(typeof memo === 'undefined')
      return user;
    return user.rating > memo.rating ? user : memo;
  }, undefined);
  const loggedIn = !!user.id;
  return {
    user,
    users,
    mostPopularUser,
    loggedIn
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
