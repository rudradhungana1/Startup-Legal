import {createSlice} from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {db, firebaseAuth} from "../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const initialState = {
  user: {},
  message: '',
  error: {
    message: ''
  },
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
      registerUser: async (state, action) => {
          try {
            const {email, password, userType, firstName, lastName } = action.payload;
            const createUser = await createUserWithEmailAndPassword(firebaseAuth, email , password);
            state.user = await createUser.user;

            const usersData = {
              userId: state.user?.uid,
              email: email,
              firstName,
              lastName,
              userType,
              acceptTerms: true,
            }
            await addDoc(collection(db, "users"), usersData);
          }
          catch (e){
            state.error = e;
          }
    }
  }
})

export const {registerUser} = authSlice.actions;

export default authSlice;
