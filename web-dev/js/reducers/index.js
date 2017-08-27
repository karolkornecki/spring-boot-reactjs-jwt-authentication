import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import userReducer from './userReducer'

const reducers = combineReducers({
    user: userReducer,
    form: formReducer
});

export default reducers
