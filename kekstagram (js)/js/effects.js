'use strict';
(function () {
  var imgUpload = document.querySelector('.img-upload__overlay');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var pinHandle = imgUpload.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectValue = imgUpload.querySelector('.effect-level__value');
  var effectLevelBlock = imgUpload.querySelector('.effect-level');
  // Массив эффектов
  var EFFECT_NAMES = [
    'none',
    'chrome',
    'sepia',
    'marvin',
    'phobos',
    'heat'
  ];

  var effects = EFFECT_NAMES.map(function (effect) {
    return {
      button: document.querySelector('#effect-' + effect),
      classname: 'effects__preview--' + effect,
      name: effect
    };
  });

  window.effects = {
    // Переключение радиокнопок с эффектами
    changeEffects: function (preview) {
      effects.forEach(function (effect) {
        var onEffectsButtonPress = function () {
          preview.removeAttribute('class');
          pinHandle.style.left = window.const.FILTER_LINE_WIDTH + 'px';
          effectLevelDepth.style.width = window.const.FILTER_LINE_WIDTH + 'px';
          preview.style.filter = null;
          preview.classList.add(effect.classname);
          if (effect.name === 'none') {
            effectLevelBlock.classList.add('hidden');
          } else {
            effectLevelBlock.classList.remove('hidden');
          }
        };

        effect.button.addEventListener('click', onEffectsButtonPress);
        effect.button.addEventListener('keydown', onEffectsButtonPress);
      });
    },
    // Изменение уровня насыщенности
    changeFilterLevel: function (preview) {
      pinHandle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        effectValue.readOnly = true;
        effectValue.value = window.const.PERCENT_MAX;
        var startCoordsX = evt.clientX;

        var calcCoords = function (move) {
          var shift = startCoordsX - move.clientX;
          startCoordsX = move.clientX;
          var newCoordsX = pinHandle.offsetLeft - shift;

          if (newCoordsX <= window.const.FILTER_LINE_WIDTH && newCoordsX >= 0) {
            pinHandle.style.left = newCoordsX + 'px';
            effectLevelDepth.style.width = newCoordsX + 'px';
            effectValue.value = newCoordsX * window.const.PERCENT_MAX / window.const.FILTER_LINE_WIDTH;
          }
          return newCoordsX;
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();
          calcCoords(moveEvt);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();
          calcCoords(upEvt);

          effects.forEach(function (effect) {
            if (preview.classList.contains(effect.classname)) {
              switch (effect.name) {
                case 'none':
                  effect.filter = effect.name;
                  break;
                case 'chrome':
                  effect.filter = 'grayscale(' + (calcCoords(upEvt) / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_CHROME_MAX) + ')';
                  break;
                case 'sepia':
                  effect.filter = 'sepia(' + (calcCoords(upEvt) / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_SEPIA_MAX) + ')';
                  break;
                case 'marvin':
                  effect.filter = 'invert(' + (calcCoords(upEvt) / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_MARVIN_MAX) + '%)';
                  break;
                case 'phobos':
                  effect.filter = 'blur(' + (calcCoords(upEvt) / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_PHOBOS_MAX) + 'px)';
                  break;
                case 'heat':
                  effect.filter = 'brightness(' + (calcCoords(upEvt) / window.const.FILTER_LINE_WIDTH * window.const.EFFECTS_HEAT_MAX - window.const.EFFECTS_HEAT_MIN) + ')';
                  break;
                default:
                  effect.filter = '';
              }
              preview.style.filter = effect.filter;
            }
          });

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    },
    // Изменение размеров изображения
    scaleNumber: window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX,
    changeImgSize: function (preview) {
      var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
      var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');

      scaleControlValue.value = window.const.IMAGE_SIZE_MAX + '%';
      var controlValue;

      var onScaleControlSmallerPress = function () {
        controlValue = parseInt(scaleControlValue.value, 10);
        if (controlValue > window.const.IMAGE_SIZE_MIN) {
          scaleControlValue.value = controlValue - window.const.IMAGE_SIZE_STEP + '%';
          window.effects.scaleNumber -= (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          preview.style.transform = 'scale(' + window.effects.scaleNumber + ')';
        }
      };

      var onScaleControlBiggerPress = function () {
        controlValue = parseInt(scaleControlValue.value, 10);
        if (controlValue < window.const.IMAGE_SIZE_MAX) {
          scaleControlValue.value = controlValue + window.const.IMAGE_SIZE_STEP + '%';
          window.effects.scaleNumber += (window.const.IMAGE_SIZE_STEP / window.const.PERCENT_MAX);
          preview.style.transform = 'scale(' + window.effects.scaleNumber + ')';
        }
      };

      scaleControlBigger.addEventListener('click', onScaleControlBiggerPress);
      scaleControlSmaller.addEventListener('click', onScaleControlSmallerPress);
    },
    // Сброс настроек изображения
    resetUploadSettings: function (preview) {
      preview.removeAttribute('class');
      preview.style = null;
      pinHandle.style = null;
      effectLevelDepth.style = null;
      effectValue.value = window.const.PERCENT_MAX;
      scaleControlValue.value = window.const.IMAGE_SIZE_MAX + '%';
      window.effects.scaleNumber = window.const.IMAGE_SIZE_MAX / window.const.PERCENT_MAX;
    }
  };
})();
