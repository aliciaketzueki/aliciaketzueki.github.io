'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // Копирование шаблона маленькой фотографии и изменение ее свойств
  var createDomElements = function (arr) {
    var pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = arr.url;
    pictureItem.querySelector('.picture__likes').textContent = arr.likes;
    pictureItem.querySelector('.picture__comments').textContent = arr.comments.length;
    return pictureItem;
  };

  // Удаление старых фото
  var removeDomElements = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (it) {
      if (it.parentNode.contains(it)) {
        it.parentNode.removeChild(it);
      }
    });
  };

  window.pictures = {
    // Добавление DOM-элементов
    appendDomElements: function (arr) {
      var pictureDestination = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      var takeNumber = arr.length > window.const.MAX_PICTURE_LENGTH ? window.const.MAX_PICTURE_LENGTH : arr.length;
      removeDomElements();
      for (var j = 0; j < takeNumber; j++) {
        fragment.appendChild(createDomElements(arr[j]));
      }
      pictureDestination.appendChild(fragment);
    },
    // Создание массива фотографий
    createNewPhotosArr: function () {
      window.backend.uploadData(window.filter.successHandler, window.filter.errorHandler);
    }
  };
})();
