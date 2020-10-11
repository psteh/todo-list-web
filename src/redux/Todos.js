import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const INITIAL_STATE = {
    data: [],
    message: ''
};

/* Actions */

export const GET_ACTION_THUNK = () => {
    return function (dispatch) {
        return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/todo`).then(resp => {
            dispatch(RESP_ACTION(resp.data));
        }).catch(error => {
            dispatch(RESP_ACTION(error.reponse));
        });
    };
};

export const CREATE_ACTION_THUNK = ({ task }) => {
    return function (dispatch) {
        return axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/todo`, {
                task,
            }).then(resp => {
                dispatch(RESP_ACTION(resp.data));
            }).catch(error => {
                dispatch(RESP_ACTION(error.reponse));
            });
    };
};

export const UPDATE_ACTION_THUNK = ({ id, task, done }) => {
    return function (dispatch) {
        return axios
            .put(`${process.env.REACT_APP_API_URL}/api/v1/todo?_id=${id}`, {
                task,
                done,
            })
            .then((resp) => {
                dispatch(RESP_ACTION(resp.data));
            })
            .catch((error) => {
                dispatch(RESP_ACTION(error.reponse));
            });
    };
};

export const DELETE_ACTION_THUNK = ({ id }) => {
    return function (dispatch) {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}/api/v1/todo?_id=${id}`)
            .then((resp) => {
                dispatch(RESP_ACTION(resp.data));
            })
            .catch((error) => {
                dispatch(RESP_ACTION(error.reponse));
            });
    };
};

const RESP_ACTION = (data) => ({
    type: 'RESP',
    data,
});

/* Reducers */

const reducers = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case 'RESP':
            return {
                ...state,
                data: action.data.data || [],
                message: action.data.message || '',
            };
        default:
            return state;
    }
};

/* Store */
export const store = createStore(
    reducers,
    INITIAL_STATE,
    applyMiddleware(thunk)
);

// Dispatch Actions
export const getTodos = () => store.dispatch(GET_ACTION_THUNK());
export const createTodo = ({ task }) => store.dispatch(CREATE_ACTION_THUNK({ task }));
export const updateTodo = ({ id, task, done }) => store.dispatch(UPDATE_ACTION_THUNK({ id, task, done }));
export const deleteTodo = ({ id }) => store.dispatch(DELETE_ACTION_THUNK({ id }));
