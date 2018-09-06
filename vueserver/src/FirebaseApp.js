import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBnRd42ZFJc2A4lbkfnvnfCF8S-7xSGrbs",
  authDomain: "smartgrid-power-management.firebaseapp.com",
  databaseURL: "https://smartgrid-power-management.firebaseio.com",
  projectId: "smartgrid-power-management",
  storageBucket: "smartgrid-power-management.appspot.com",
  messagingSenderId: "925384727439"
};

export const firebaseApp = firebase.initializeApp(config)
export const userRef = firebaseApp.database().ref().child('user')

export const Gprovider = new firebase.auth.GoogleAuthProvider()
Gprovider.setCustomParameters({
  'display': 'popup'
})
export const Fprovider = new firebase.auth.FacebookAuthProvider()
Fprovider.addScope('public_profile')
Fprovider.setCustomParameters({
  'display': 'popup'
})