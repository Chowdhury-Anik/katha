import { SET_USER } from "./actiontype";
import { combineReducers } from "redux"


let defaultUser = {
    currentUser: null
}

const userReducer = (state = defaultState, action) => {
    if (action.type === SET_USER) {
        let payload = action.payload;
        state = { ...payload };
        return state;
    }
    return state;
}

export const combineReducers = ({ user: userReducer });