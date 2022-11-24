import { createContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
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

	const authInfo = { user, signIn, googleSignIn };

	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;