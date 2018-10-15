'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPictureComments.querySelector('.social__comment');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var openedPhoto;
  // Создание DOM-элементов для комментариев
  var getBigPictureComments = function (arrComments) {
    var photosComment = bigPictureComment.cloneNode(true);
    photosComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomArbitary(window.const.AVATAR_MIN, window.const.AVATAR_MAX) + '.svg';
    photosComment.querySelector('.social__text').textContent = arrComments;
    return photosComment;
  };
  // Добавление DOM-элементов в разметку
  var appendDomElements = function (start, end) {
    var fragment = document.createDocumentFragment();
    for (var k = start; k < end; k++) {
      fragment.appendChild(getBigPictureComments(openedPhoto.comments[k]));
    }
    bigPictureComments.appendChild(fragment);
    commentsCount.textContent = end + ' из ' + openedPhoto.comments.length + ' комментариев';
  };
  // Обновление данных большой фотографии
  var updateBigPhotoProperties = function (arr, currentIndex, number, button) {
    window.util.deleteNodeElements(bigPictureComments);
    openedPhoto = arr[currentIndex];
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = openedPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = openedPhoto.likes;
    bigPicture.querySelector('.social__caption').textContent = window.util.selectRandomElement(window.const.DESCRIPTION_ARR);
    window.comments.addComments(number, button);
  };

  window.comments = {
    // Добавление комментариев под фото
    addComments: function (number, button) {
      if (openedPhoto.comments.length <= window.const.PHOTOS_COMMENTS_VIEW + number) {
        appendDomElements(number, openedPhoto.comments.length);
        button.classList.add('hidden');
      } else {
        appendDomElements(number, window.const.PHOTOS_COMMENTS_VIEW + number);
        button.classList.remove('hidden');
      }
    },
    // Обновление данных большой фотографии
    updateBigPhoto: function (arr, pictures, number, button, evt) {
      for (var j = 0; j < arr.length; j++) {
        if (pictures[j].querySelector('img') === evt.target) {
          updateBigPhotoProperties(arr, j, number, button);
        }
        if (pictures[j] === evt.target) {
          updateBigPhotoProperties(arr, j, number, button);
        }
      }
      bigPicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  };
})();
