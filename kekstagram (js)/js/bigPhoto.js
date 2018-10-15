'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var index = 0;
  // Нажатие на ESC
  var onEscPress = function (evt) {
    if (evt.keyCode === window.const.ESC_KEYDOWN) {
      window.util.deleteNodeElements(bigPictureComments);
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };
  // клик на "загрузить еще (комментариев)"
  var onButtonCommentsClick = function (evt) {
    if (commentsLoader === evt.target) {
      index += window.const.PHOTOS_COMMENTS_VIEW;
      window.comments.addComments(index, commentsLoader);
    }
  };
  // Клик на закрытие большой фотографии
  var onBigPictureCancelClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    window.util.deleteNodeElements(bigPictureComments);
    document.removeEventListener('keydown', onEscPress);
  };

  window.bigPhoto = {
    // Большая фотография
    changeBigPhoto: function (arr) {
      var bigPictureArr = document.querySelectorAll('.picture');
      var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
      // Открытие большой фотографии по клику
      var onLittlePictureClick = function (evt) {
        index = 0;
        window.comments.updateBigPhoto(arr, bigPictureArr, index, commentsLoader, evt);
        document.addEventListener('keydown', onEscPress);
      };
      // Открытие большой фотографии по нажатию на ENTER
      var onLittlePictureDown = function (evt) {
        index = 0;
        if (evt.keyCode === window.const.ENTER_KEYDOWN) {
          window.comments.updateBigPhoto(arr, bigPictureArr, index, commentsLoader, evt);
          document.addEventListener('keydown', onEscPress);
        }
      };
      bigPictureArr.forEach(function (it) {
        it.addEventListener('click', onLittlePictureClick);
        it.addEventListener('keydown', onLittlePictureDown);
      });
      commentsLoader.addEventListener('click', onButtonCommentsClick);
      // Закрытие большой фотографии
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    },
  };
})();
