import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

export default function createReducerManager() {
    const initialState = {}
    const reducers = {}
    let combinedReducer = null
    let keysToRemove = []

    return {
        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                    state[key] = initialState[key]
                }
                keysToRemove = []
            }
            return combinedReducer ? combinedReducer(state, action) : initialState
        },

        add: ({ key, addedReducers, initialReducerState }) => {
            if (!key || reducers[key]) {
                return
            }

            const slice = createSlice({
                name: key,
                initialState: initialReducerState,
                reducers: addedReducers,
            })

            initialState[key] = initialReducerState
            reducers[key] = slice.reducer

            combinedReducer = combineReducers(reducers)
            return { actions: slice.actions }
        },

        remove: key => {
            if (!key || !reducers[key]) {
                return
            }
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        }
    }
}
