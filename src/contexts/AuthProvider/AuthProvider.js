import { createContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	}

	const authInfo = { user, signIn };

	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;