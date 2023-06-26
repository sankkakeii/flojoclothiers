import { auth, db } from '@/config/firebase';

export const getSettings = async () => {
    const user = auth.currentUser;
    if (!user) return null;

    const settingsRef = db.collection('settings').doc(user.uid);
    const doc = await settingsRef.get();

    if (doc.exists) {
        return doc.data();
    } else {
        return null;
    }
}

export const updateSettings = async (settings) => {
    const user = auth.currentUser;
    if (!user) return null;

    const settingsRef = db.collection('settings').doc(user.uid);
    await settingsRef.set(settings, { merge: true });

    return settings;
}
