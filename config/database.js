const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyCyyDWwO2EkvvOWAYFd6jmG_034T9SDAMs",
    authDomain: "brians-ostebiks-andreas.firebaseapp.com",
    databaseURL: "https://brians-ostebiks-andreas.firebaseio.com",
    projectId: "brians-ostebiks-andreas",
    storageBucket: "brians-ostebiks-andreas.appspot.com",
    messagingSenderId: "678129036725",
    appId: "1:678129036725:web:01737f23e8e4cf1f8a7dfc"
};

const db = firebase.initializeApp(firebaseConfig);

module.exports = db;