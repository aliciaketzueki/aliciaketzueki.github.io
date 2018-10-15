'use strict';
(function () {
  // Получение ответа сервера
  var getResponse = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.const.SUCCESS_CODE:
          onLoad(xhr.response);
          break;
        case window.const.BAD_REQUEST_ERROR_CODE:
          onError(window.const.BAD_REQUEST_ERROR_TEXT);
          break;
        case window.const.UNAUTHORIZED_ERROR_CODE:
          onError(window.const.UNAUTHORIZED_ERROR_TEXT);
          break;
        case window.const.NOT_FOUND_ERROR_CODE:
          onError(window.const.NOT_FOUND_ERROR_TEXT);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(window.const.CONNECTION_ERROR_TEXT);
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = window.const.TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    // Загрузка данных с сервера
    uploadData: function (onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram/data';
      getResponse('GET', url, onLoad, onError);
    },
    // Отправка данных на сервер
    saveData: function (onLoad, onError, data) {
      var url = 'https://js.dump.academy/kekstagram';
      getResponse('POST', url, onLoad, onError, data);
    }
  };
})();
