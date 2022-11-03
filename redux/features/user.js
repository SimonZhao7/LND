import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// Firebase Auth
import { auth, googleProvider } from '../../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
    linkWithCredential,
    EmailAuthProvider,
} from 'firebase/auth'
// Firebase DB
import { db } from '../../firebase'
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
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
    async (
        { email, username, password, confirmPassword },
        { rejectWithValue }
    ) => {
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
                error: "Passwords don't match",
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
            sendEmailVerification(auth.currentUser)
            const user = userCredentials.user
            const uid = user.uid

            await setDoc(doc(db, 'users', uid), {
                username: username,
                profilePicture: '',
                email,
            })

            return (
                await getDoc(doc(db, 'users', userCredentials.user.uid))
            ).data()
        } catch (e) {
            if (e.code === 'auth/email-already-in-use')
                return rejectWithValue({
                    error: 'A user already exists with the provided email',
                    location: 0,
                })
            return rejectWithValue(e.request.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        // Email may also be username
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = await getDoc(
                doc(db, 'users', userCredentials.user.uid)
            )
            return user.data()
        } catch (e) {
            if (e.code === 'auth/wrong-password') {
                return rejectWithValue({ error: 'Incorrect Login Credentials' })
            }

            const userSnapshot = await getDocs(
                query(collection(db, 'users'), where('username', '==', email))
            )

            if (userSnapshot.empty) {
                return rejectWithValue({ error: 'Incorrect Login Credentials' })
            }

            const userEmail = userSnapshot.docs[0].data().email

            try {
                const userCredentials = await signInWithEmailAndPassword(
                    auth,
                    userEmail,
                    password
                )
                const user = await getDoc(
                    doc(db, 'users', userCredentials.user.uid)
                )
                return user.data()
            } catch (e) {
                return rejectWithValue({ error: 'Incorrect Login Credentials' })
            }
        }
    }
)

export const googleLogin = createAsyncThunk('user/googleAuth', async () => {
    try {
        const userCredentials = await signInWithPopup(auth, googleProvider)
        const user = await getDoc(doc(db, 'users', userCredentials.user.uid))
        if (user.exists()) {
            return user.data()
        }
        return {}
    } catch (e) {
        rejectWithValue({ error: 'An unknown error occurred' })
    }
})

// assert email doesn't have a document
export const linkEmailAccount = createAsyncThunk(
    'user/linkEmail',
    async ({ username, password, confirmPassword }, { rejectWithValue }) => {
        if (!username)
            return rejectWithValue({
                error: 'You have not provided a username',
                location: 0,
            })
        if (!password)
            return rejectWithValue({
                error: 'You have not proivded a password',
                location: 1,
            })
        if (!confirmPassword)
            return rejectWithValue({
                error: 'You need to retype to confirm your password',
                location: 2,
            })

        if (password !== confirmPassword) {
            return rejectWithValue({
                error: "Passwords don't match",
                location: 2,
            })
        }

        const users = await getDocs(
            query(collection(db, 'users'), where('username', '==', username))
        )

        if (!users.empty) {
            return rejectWithValue({
                error: 'Username already exists',
                location: 0,
            })
        }

        await setDoc(doc(db, 'users', auth.currentUser.uid), {
            username: username,
            profilePicture: '',
            email: auth.currentUser.email,
        })

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )

        await linkWithCredential(auth.currentUser, credential)

        const user = await getDoc(doc(db, 'users', auth.currentUser.uid))
        return user.data()
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (email) => {
        const users = await getDocs(
            query(collection(db, 'users'), where('email', '==', email))
        )
        if (users.empty) return {}
        return users.docs[0].data()
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null
        },
    },
    extraReducers: {
        [regsiterUser.pending]: (state) => {
            state.loading = true
        },
        [regsiterUser.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [regsiterUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        },
        [loginUser.pending]: (state) => {
            state.loading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        },
        [loginUser.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [googleLogin.fulfilled]: (state, action) => {
            state.error = null
            state.user = action.payload
        },
        [linkEmailAccount.pending]: (state) => {
            state.loading = true
        },
        [linkEmailAccount.rejected]: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        [linkEmailAccount.fulfilled]: (state, action) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        },
        [fetchUser.pending]: (state) => {
            state.loading = true
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
    },
})

export const { clearErrors } = userSlice.actions

export default userSlice.reducer
