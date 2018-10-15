'use strict';
// 1.8. Функция инициализации
(function () {
  // модуль pictures.js
  window.pictures.createNewPhotosArr();

  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview').querySelector('img');

  // модуль effects.js
  window.effects.changeEffects(imgUploadPreview);
  window.effects.changeFilterLevel(imgUploadPreview);
  window.effects.changeImgSize(imgUploadPreview);

  // модуль validation.js
  window.validation.checkValidityHashtags(imgUpload);
  window.validation.checkValidityText(imgUpload);

  // Модуль form.js
  window.form.changeUploadFile(imgUpload, imgUploadPreview);
})();
