import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ users, mostPopularUser })=> {
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
    </ul>
  );
};

const mapStateToProps = ({ users })=> {
  const mostPopularUser = users.reduce((memo, user)=> {
    if(typeof memo === 'undefined')
      return user;
    return user.rating > memo.rating ? user : memo;
  }, undefined);
  return {
    users,
    mostPopularUser
  };
};

export default connect(mapStateToProps)(Nav);
