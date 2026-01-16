import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'
import registerSlice from './features/registerSlice'

export const store = configureStore({
  reducer: {
    login:loginSlice,
    register: registerSlice
  },
})

