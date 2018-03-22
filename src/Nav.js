import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ users })=> {
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
      <li>
        <Link to='/users/create'>
          Create A User
        </Link>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users })=> {
  return {
    users
  };
};

export default connect(mapStateToProps)(Nav);
