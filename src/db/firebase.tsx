import * as firebase from 'firebase/app'
import 'firebase/firestore'

import firebaseConfig from './firebaseConfig.json'

firebase.initializeApp(firebaseConfig)

export default firebase.firestore()
