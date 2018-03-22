import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users })=> {
  return (
    <ul>
    {
      users.map( user => {
        return (
          <li key={ user.id }>
            <Link to={ `/users/${user.id}`}>{ user.name }</Link>
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

export default connect(mapStateToProps)(Users);
