import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// Firebase Auth
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// Firebase DB
import { db } from '../../firebase'
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
} from 'firebase/firestore'

const initialState = {
    user: {},
    error: null,
    loading: false,
}

export const regsiterUser = createAsyncThunk(
    'users/register',
    async (body, { rejectWithValue }) => {
        const { email, username, password, confirmPassword } = body
        // Empty Params
        if (!email) 
            return rejectWithValue({
                error: 'You have not provided an email address',
                location: 0,
            })
        if (!username)
            return rejectWithValue({
                error: 'You have not provided a username',
                location: 1,
            })
        if (!password)
            return rejectWithValue({
                error: 'You have not proivded a password',
                location: 2,
            })
        if (!confirmPassword)
            return rejectWithValue({
                error: 'You need to retype to confirm your password',
                location: 3,
            })
        if (password != confirmPassword)
            return rejectWithValue({
                error: 'Passwords don\'t match',
                location: 3,
            })
        // Existing Values
        const q = await getDocs(
            query(collection(db, 'users'), where('username', '==', username))
        )
        if (!q.empty)
            return rejectWithValue({
                error: 'A user already exists with the provided username',
                location: 1,
            })

        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredentials.user
            const uid = user.uid

            await setDoc(doc(db, 'users', uid), {
                username: username,
                profilePicture: '',
            })

            return userCredentials.user
        } catch (e) {
            console.log(e)
            rejectWithValue(e)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [regsiterUser.pending]: (state) => {
            state.loading = true
        },
        [regsiterUser.rejected]: (state, action) => {
            console.log(action)
            state.error = action.payload
            state.loading = false
        },
        [regsiterUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        }
    }
})

export default userSlice.reducer
