import axios from 'axios';

//INITAL STATE
const initialState= {
  user: {},
  actionAskOrGetHelp: "action"
}


//ACTION TYPES
const REQ_USER= 'REQ_USER';
const TOGGLE_ACTION= 'TOGGLE_ACTION';


//REDUCER
export default function reducer(state= initialState, action){
  switch(action.type){
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
    });
    case TOGGLE_ACTION:
      return Object.assign({}, state, {actionAskOrGetHelp: action.payload});
    default:
     return state;
  }
}


//ACTION CREATORS
export function reqUser(){
  return {
    type: REQ_USER,
    payload: axios.get('/api/me').then(response=> response.data)
  }
}

export function toggleAction(val){
  return {
    type: TOGGLE_ACTION,
    payload: val
  }
}


