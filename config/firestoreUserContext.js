import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from './firebase';  // adjust the path according to your project structure

const FirestoreUserContext = createContext(null);

export const FirestoreUserProvider = ({ children }) => {
    const [firestoreUser, setFirestoreUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                const unsubscribeFirestore = db.collection('settings')
                    .doc(user.uid)
                    .onSnapshot(doc => {
                        setFirestoreUser(doc.data());
                    });
                return unsubscribeFirestore;
            }
            setFirestoreUser(null); // Important to handle log out
        });

        // Clean up subscription on unmount
        return () => {
            if (unsubscribeAuth) {
                unsubscribeAuth();
            }
        };
    }, []); // Empty dependency array means this useEffect will only run once on component mount

    return (
        <FirestoreUserContext.Provider value={firestoreUser}>
            {children}
        </FirestoreUserContext.Provider>
    );
};

export const useFirestoreUser = () => useContext(FirestoreUserContext);
