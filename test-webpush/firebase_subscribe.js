const SENDER_ID = '317882468869';

firebase.initializeApp({
    messagingSenderId: SENDER_ID
});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // или проверяем регистрацию
    messaging.onMessage(function(payload) {
        console.log('Message received', payload);

        // register fake ServiceWorker for show notification on mobile devices
        navigator.serviceWorker.register('/test-webpush/firebase-messaging-sw.js');
        Notification.requestPermission(function(permission) {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(function(registration) {
                    // Copy data object to get parameters in the click handler
                    payload.data.data = JSON.parse(JSON.stringify(payload.data));

                    registration.showNotification(payload.data.title, payload.data);
                }).catch(function(error) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed', error);
                });
            }
        });
    });

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    if (Notification.permission === 'granted') {
        subscribe();
    }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
    $('#subscribe').on('click', function () {
        subscribe();
    });

    $('#delete-token').on('click', function () {
        unsubscribe();
    });

    $('#send-notification').on('click', function () {
        sendNotification({
            'title': 'Test title',
            'body': 'Test body'
        });
    });
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            messaging.getToken()
                .then(function (currentToken) {
                    console.log(currentToken);
                    sendNotification({
                        'title': 'Подписка на уведомления',
                        'body': 'Спасибо, вы успешно подписались на уведомления!'
                    });

                    if (currentToken) {
                        sendTokenToServer(currentToken);
                    } else {
                        console.warn('Не удалось получить токен.');
                        setTokenSentToServer(false);
                    }
                })
                .catch(function (err) {
                    console.warn('При получении токена произошла ошибка.', err);
                    setTokenSentToServer(false);
                });
        })
        .catch(function (err) {
            console.warn('Не удалось получить разрешение на показ уведомлений.', err);
        });
}

function unsubscribe() {
    messaging.getToken()
        .then(function(currentToken) {
            messaging.deleteToken(currentToken)
                .then(function() {
                    console.log('Token deleted');
                    setTokenSentToServer(false);
                    sendNotification({
                        'title': 'Отписка от уведомлений',
                        'body': 'Вы отписались от уведомлений'
                    });
                })
                .catch(function(error) {
                    console.log('Unable to delete token', error);
                });
        })
        .catch(function(error) {
            console.log('Error retrieving Instance ID token', error);
        });
}

// отправка ID на сервер
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}

function getAccessToken() {
    return new Promise(function(resolve, reject) {
        const key = require('../placeholders/service-account.json');
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

function sendNotification(notification) {
    var key = 'AAAASgNFigU:APA91bHHecUByz-lDQVtgjm1S8Abo90islHr0Digs_Kq57W9ISbOIng3Zq7kui4F7AeedvnM96n1emqFhZ1QBLQN1LtLlGNTVrDy5_vuO9azp51j5PqCyr17fIJG5kyMkPzswRwh4urj';

    console.log('Send notification', notification);

    messaging.getToken()
        .then(function(currentToken) {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=' + key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: notification,
                    to: currentToken
                })
            }).then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log('Response', json);

                if (json.success === 1) {
                    console.log('json success');
                    // massage_row.show();
                    // massage_id.text(json.results[0].message_id);
                } else {
                    console.log('json NOT success');
                    // massage_row.hide();
                    // massage_id.text(json.results[0].error);
                }
            }).catch(function(error) {
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log('Error retrieving Instance ID token', error);
        });
}
