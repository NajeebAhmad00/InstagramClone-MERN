import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyA3Cwz8mthSWr-pszg-OjDeA4ZoS5lwsNI',
    authDomain: 'instagramclone-b5577.firebaseapp.com',
    projectId: 'instagramclone-b5577',
    storageBucket: 'instagramclone-b5577.appspot.com',
    messagingSenderId: '448960473916',
    appId: '1:448960473916:web:dbc9253218a2ab7ee70c39'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)