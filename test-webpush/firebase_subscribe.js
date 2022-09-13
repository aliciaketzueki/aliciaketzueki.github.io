const SENDER_ID = '317882468869';

firebase.initializeApp({
    messagingSenderId: SENDER_ID
});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();


    // или проверяем регистрацию
    messaging.onMessage((payload) => {
        navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then((registration) => {
            registration.showNotification(payload.notification.title, payload.notification);
        });
    });

    // messaging.onMessage(function(payload) {
    //     console.log('Message received. ', payload);
    //
    //
    //     // регистрируем пустой ServiceWorker каждый раз
    //     // navigator.serviceWorker.register('firebase-messaging-sw.js');
    //     navigator.serviceWorker.register('messaging-sw.js');
    //
    //     // запрашиваем права на показ уведомлений если еще не получили их
    //     Notification.requestPermission(function(result) {
    //         if (result === 'granted') {
    //             navigator.serviceWorker.ready.then(function(registration) {
    //                 // теперь мы можем показать уведомление
    //                 return registration.showNotification(payload.notification.title, payload.notification);
    //             }).catch(function(error) {
    //                 console.log('ServiceWorker registration failed', error);
    //             });
    //         }
    //     });
    // });

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

function sendNotification(notification) {
    var key = 'BDTgbB8JS5WlkOoXp_-28bP5PaK4xzGuR8NGqbLn0lLPVLrbV4GyW6QTz1rT1EviachJrNR-EaYNxzXqA5rKHzs';

    console.log('Send notification', notification);

    messaging.getToken()
        .then(function(currentToken) {
            console.log('currentToken', currentToken);

            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key=' + key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Firebase loses 'image' from the notification.
                    // And you must see this: https://github.com/firebase/quickstart-js/issues/71
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
