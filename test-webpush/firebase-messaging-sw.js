// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

const SENDER_ID = '317882468869';

firebase.initializeApp({
    messagingSenderId: SENDER_ID
});

const messaging = firebase.messaging();
