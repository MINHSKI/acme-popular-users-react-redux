import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
const SET_USERS = 'SET_USERS';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const CREATE_USER = 'CREATE_USER';

const usersReducer = (state = [], action)=> {
  switch(action.type){
    case SET_USERS:
      state = action.users;
      break;
    case UPDATE_USER:
      state = state.map( user => user.id === action.user.id ? action.user : user); 
      break;
    case CREATE_USER:
      state = [...state, action.user]; 
      break;
    case DELETE_USER:
      state = state.filter( user => user.id !== action.user.id); 
      break;
  }
  return state;
};

const reducer = combineReducers({
  users: usersReducer
});

const loadUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users')
      .then( result => result.data)
      .then( users => dispatch({
        type: SET_USERS,
        users
        })
      );
  };
};

const deleteUser = (user, history)=> {
  return (dispatch)=> {
    return axios.delete(`/api/users/${user.id}`)
      .then( () => dispatch({
        type: DELETE_USER,
        user
        })
      )
      .then( ()=> {
        history.push('/users');
      });
  };
};

const saveUser = (user, history)=> {
  if(user.id){
    return (dispatch)=> {
      return axios.put(`/api/users/${user.id}`, user)
        .then( result => result.data)
        .then( user => dispatch({
          type: UPDATE_USER,
          user
          })
        )
        .then( ()=> {
          if(history){
            history.push('/users');
          }
        });
    };
  }
  return (dispatch)=> {
    return axios.post('/api/users/', user)
      .then( result => result.data)
      .then( user => dispatch({
        type: CREATE_USER,
        user
        })
      )
      .then( ()=> {
        history.push('/users');
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { loadUsers, saveUser, deleteUser };
