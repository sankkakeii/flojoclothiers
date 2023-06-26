import '@/styles/globals.css'
import { FirestoreUserProvider } from '../config/firestoreUserContext';  // adjust the path according to your project structure

function MyApp({ Component, pageProps }) {
  return (
    <FirestoreUserProvider>
      <Component {...pageProps} />
    </FirestoreUserProvider>
  );
}

export default MyApp;