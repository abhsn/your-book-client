import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const googleSignIn = () => {
		return signInWithPopup(auth, googleProvider);
	}

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	const updateUserProfile = name => {
		return updateProfile(auth.currentUser, {
			displayName: name
		})
	}

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, currentUser => {
			if (currentUser) {
				setUser(currentUser);
			} else {
				setUser(null);
			}
		})

		return () => unSubscribe;
	}, []);

	const authInfo = { user, signIn, googleSignIn, signUp, updateUserProfile };

	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;