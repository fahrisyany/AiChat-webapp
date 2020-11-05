import {combineReducers} from 'redux'
import movieReducer from "./movie"
import UIReducer from "./user-interface"

export const rootReducer = combineReducers({
   movieReducer,
   UIReducer
});

export type RootState = ReturnType<typeof rootReducer>
