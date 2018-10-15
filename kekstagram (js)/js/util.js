'use strict';
(function () {
  window.util = {
    // Выбор случайного числа
    getRandomArbitary: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Создание массива чисел
    createArr: function (arrStart, arrLength) {
      var arr = [];
      for (var i = arrStart; i < arrLength; i++) {
        arr[i] = i;
      }
      return arr;
    },
    // Выбор рандомного элемента из массива
    selectRandomElement: function (arr) {
      var element;
      for (var i = 0; i < arr.length; i++) {
        element = arr[this.getRandomArbitary(0, arr.length - 1)];
      }
      return element;
    },
    // Удаление Node-элементов
    deleteNodeElements: function (parent) {
      while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
      }
    },
    // Проверка повторения элементов в массиве
    calcRepeats: function (arr) {
      var repeat = 0;
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j] === arr[i]) {
            repeat++;
          }
        }
      }
      return repeat;
    },
    // Рандом без повторов
    compareRandom: function () {
      return Math.random() - 0.5;
    },
    // Функция установки таймера
    debounce: function (callback) {
      var lastTimeout = null;

      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          callback.apply(null, args);
        }, window.const.DEBOUNCE_INTERVAL);
      };
    },
    // Удаление пустых элементов массива
    cleanArray: function (deleteValue, arr) {
      var newArr = arr.slice(0);
      for (var i = 0; i < newArr.length; i++) {
        if (newArr[i] === deleteValue) {
          newArr.splice(i, 1);
          i--;
        }
      }
      return newArr;
    }
  };
})();
