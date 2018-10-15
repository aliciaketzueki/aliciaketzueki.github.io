'use strict';
(function () {
  // Граница поля при ошибке
  var setBorder = function (element) {
    if (!element.reportValidity()) {
      element.style.border = '2px solid red';
    } else {
      element.style.border = '';
    }
  };

  window.validation = {
    // Валидация хэш-тегов
    checkValidityHashtags: function (area) {
      var textHashtag = area.querySelector('.text__hashtags');

      textHashtag.addEventListener('input', function (evt) {
        var target = evt.target;
        var hashtags = target.value.toLowerCase().split(' ');
        hashtags = window.util.cleanArray('', hashtags);

        for (var i = 0; i < hashtags.length; i++) {
          var currentHashtag = hashtags[i];

          if (currentHashtag.charAt(0) !== '#') {
            target.setCustomValidity('Хэш-теги должны начинаться с символа #');
            break;
          } else if (currentHashtag.indexOf('#', 1) !== -1) {
            target.setCustomValidity('Хэш-теги должны разделяться пробелом');
            break;
          } else if (currentHashtag.length < window.const.HASHTAG_MIN_LENGTH) {
            target.setCustomValidity('Хэш-тег не может состоять из одной решётки');
            break;
          } else if (currentHashtag.length > window.const.HASHTAG_MAX_LENGTH) {
            target.setCustomValidity('Длина хэш-тега не должна быть больше ' + window.const.HASHTAG_MAX_LENGTH + ' символов');
            break;
          } else if (hashtags.length > window.const.HASHTAG_AMOUNT) {
            target.setCustomValidity('Нельзя указать больше ' + window.const.HASHTAG_AMOUNT + ' хэш-тегов');
            break;
          } else if (window.util.calcRepeats(hashtags) > 0) {
            target.setCustomValidity('Хэш-теги не могут повторяться');
            break;
          } else {
            target.setCustomValidity('');
          }
        }
        if (hashtags.length === 0) {
          target.setCustomValidity('');
        }
        setBorder(textHashtag);
      });
    },
    // Валидация комментария
    checkValidityText: function (area) {
      var textDescription = area.querySelector('.text__description');

      textDescription.addEventListener('input', function (evt) {
        var target = evt.target;
        if (target.value.length > window.const.COMMENT_MAX_LENGTH) {
          target.setCustomValidity('Длина комментария не должна превышать ' + window.const.COMMENT_MAX_LENGTH + ' символов');
        } else {
          target.setCustomValidity('');
        }
        setBorder(textDescription);
      });
    }
  };
})();
