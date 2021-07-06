import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const NumPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 - Other pages
    if (curPage === 1 && NumPages > 1) {
      return `
      <button data-goto ="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="#${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    //Last page
    if (curPage === NumPages && NumPages > 1) {
      return `
      <button data-goto ="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    //Other page
    if (curPage < NumPages) {
      return `
      <button data-goto ="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          
      <button class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="#${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    //Page 1 - No other pages
    return '';
  }
}

export default new PaginationView();
