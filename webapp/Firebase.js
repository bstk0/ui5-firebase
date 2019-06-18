sap.ui.define([
	"sap/ui/model/json/JSONModel",
], function (JSONModel) {
	"use strict";
	
	// Firebase-config retrieved from the Firebase-console
	const firebaseConfig = {
	    apiKey: "AIzaSyA7P02Wn1EDCY6OnRFLeRDGgroovaLWEQU",
	    authDomain: "sapui5-561c1.firebaseapp.com",
	    databaseURL: "https://sapui5-561c1.firebaseio.com",
	    projectId: "sapui5-561c1",
	    storageBucket: "sapui5-561c1.appspot.com",
	    messagingSenderId: "860934121188",
	    appId: "1:860934121188:web:7de080b59b22ade0"
	};

	return {
		initializeFirebase: function () {
			// Initialize Firebase with the Firebase-config
			firebase.initializeApp(firebaseConfig);
			
			// Create a Firestore reference
			const firestore = firebase.firestore();
			
			// Firebase services object
			const oFirebase = {
				firestore: firestore
			};
			
			// Create a Firebase model out of the oFirebase service object which contains all required Firebase services
			var fbModel = new JSONModel(oFirebase);
			
			// Return the Firebase Model
			return fbModel;
		}
	};
});