import {combineReducers} from 'redux'
import datasReducer from "./data"

export const rootReducer = combineReducers({
   datasReducer,
});

export type RootState = ReturnType<typeof rootReducer>
