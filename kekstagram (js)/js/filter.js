'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  var buttonPopular = imgFilters.querySelector('#filter-popular');
  var buttonNew = imgFilters.querySelector('#filter-new');
  var buttonDiscussed = imgFilters.querySelector('#filter-discussed');
  var pictures = [];

  // Нажатие на кнопку Популярных Фото
  var onButtonPopular = window.util.debounce(function () {
    var photos = pictures.slice(0);
    window.pictures.appendDomElements(photos);
    window.bigPhoto.changeBigPhoto(photos);
  });
  // Нажатие на кнопку Новых Фото
  var onButtonNew = window.util.debounce(function () {
    var photos = pictures.slice(0);
    var newPhotos = photos.sort(window.util.compareRandom).slice(0, window.const.NEW_PICTURE_LENGTH);

    window.pictures.appendDomElements(newPhotos);
    window.bigPhoto.changeBigPhoto(newPhotos);
  });
  // Нажатие на кнопку Обсуждаемых Фото
  var onButtonDiscussed = window.util.debounce(function () {
    var photos = pictures.slice(0);
    photos.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    window.pictures.appendDomElements(photos);
    window.bigPhoto.changeBigPhoto(photos);
  });

  window.filter = {
    // Успешное добавление фото в разметку
    successHandler: function (data) {
      pictures = data;
      window.pictures.appendDomElements(pictures);
      window.bigPhoto.changeBigPhoto(pictures);
      imgFilters.classList.remove('img-filters--inactive');
      // переключение классов у кнопок
      var buttons = imgFilters.querySelectorAll('.img-filters__button');
      buttons.forEach(function (it) {
        it.addEventListener('click', function (evt) {
          for (var j = 0; j < buttons.length; j++) {
            if (buttons[j] === evt.target) {
              buttons[j].classList.add('img-filters__button--active');
            }
            if (buttons[j] !== evt.target) {
              buttons[j].classList.remove('img-filters__button--active');
            }
          }
        });
        buttonPopular.removeEventListener('click', onButtonPopular);
        buttonNew.removeEventListener('click', onButtonNew);
        buttonDiscussed.removeEventListener('click', onButtonDiscussed);
      });
      // Переключение отдельных кнопок
      buttonPopular.addEventListener('click', onButtonPopular);
      buttonNew.addEventListener('click', onButtonNew);
      buttonDiscussed.addEventListener('click', onButtonDiscussed);
    },

    // Ошибка добавления
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 10px auto; text-align: center;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
