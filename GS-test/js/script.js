(function () {
  let catalog = document.querySelector(`.catalog`);

  if (!catalog) {
    return;
  }

  let filterBlock = catalog.querySelector(`.catalog__filter`);
  let activeFilter = filterBlock.querySelector(`.active`);
  let catalogGrid = catalog.querySelector(`.catalog__grid`);
  let catalogBlocks = catalog.querySelectorAll(`.catalog__grid li`);
  let tab;

  // Клик на кнопку фильтров
  function onFilterBtnClick(e) {
    let target = e.target;

    if (target = target.closest(`button`)) {
      activeFilter.classList.remove(`active`);
      activeFilter = target;
      target.classList.toggle(`active`);
      tab = target.getAttribute(`data-tab`);

      catalogGrid.classList.add(`hidden`);

      setTimeout(function () {
        catalogGrid.classList.remove(`hidden`);
      }, 500);


      for (let i = 0; i < catalogBlocks.length; i++) {
        let block = catalogBlocks[i];

        setTimeout(function () {
          block.classList.add(`hidden`);
        }, 100);

        if (Number(tab) === 0) {
          setTimeout(function () {
            block.classList.remove(`hidden`);
          }, 200);
        }

        if (block.getAttribute(`data-tab`) === tab) {
          setTimeout(function () {
            block.classList.remove(`hidden`);
          }, 200);
        }
      }
    }
  }

  // Скроллбар
  function getScrollBar() {
    if (window.matchMedia(`(max-width: 767px)`).matches) {
      return new window.SimpleBar(filterBlock);
    }
  }

  getScrollBar();

  // Клик на ссылку
  function onCatalogBlockClick(e) {
    let target = e.target;
    e.preventDefault();

    if (target = target.closest(`a`)) {
      target.classList.toggle(`active`);
    }
  }

  // Обработчики событий
  filterBlock.addEventListener(`click`, onFilterBtnClick, true);
  catalogGrid.addEventListener(`click`, onCatalogBlockClick, true);
  window.addEventListener(`resize`, getScrollBar);
})();

(function () {
  let mainBlock = document.querySelector(`.main-section`);

  if (!mainBlock) {
    return;
  }

  let menu = mainBlock.querySelector(`.main-section__list`);
  let menuActiveBlock = mainBlock.querySelector(`.main-section__list li.active`);

  // Уведение мыши с блока меню
  function onMenuBlockOut(e) {
    let target = e.target;

    if (target != menuActiveBlock) {
      target.classList.remove(`active`);
    }
  }

  // Наведение на блок меню
  function onMenuBlockHover(e) {
    let target = e.target;
    let menuBlock = target.closest(`li`);

    if (target = target.closest(`.main-section__block`)) {
      menuBlock.classList.add(`active`);
      menuBlock.addEventListener(`mouseleave`, onMenuBlockOut);
    }
  }

  // Клик на блок меню
  function onMenuBlockClick(e) {
    let target = e.target;

    if (target = target.closest(`.main-section__block`)) {
      menuActiveBlock.classList.remove(`active`);
      target.closest(`li`).classList.add(`active`);
      menuActiveBlock = target.closest(`li`); 
    }

    menuActiveBlock.removeEventListener(`mouseleave`, onMenuBlockOut);
  }

  // Ресайз
  function addHover() {
    if (window.matchMedia(`(min-width: 768px)`).matches) {
      menu.addEventListener(`mouseover`, onMenuBlockHover, true);
    }
  }

  addHover();

  // Обработчики событий
  window.addEventListener(`resize`, addHover);
  menu.addEventListener(`click`, onMenuBlockClick, true);

})();
