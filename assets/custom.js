document.addEventListener('click', function (event) {
  const item = event.target.closest('.predictive-search__list-item');
  if (item) {
    const link = item.querySelector('a');
    if (link && link.href) {
      window.location.href = link.href;
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function HideSearchAll() {
    const inputWrap = document.querySelector('.search_input-wrp');
    const searchTitle = document.querySelector('.search_menu_title');
    if (inputWrap) {
      inputWrap.style.display = 'none';
    }
    if (searchTitle) {
      searchTitle.style.display = 'block';
    }
    var searchInput = document.querySelector('#Search-In-Modal');
    if (!searchInput) return;
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.dispatchEvent(new Event('change'));
  }

  function hideSearchInputOnClose() {
    const closeBtn = document.querySelector('#predictive-search-results .search_popup_close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        HideSearchAll();
      });
      const searchHeader = document.querySelector('.predictive-search.predictive-search--header');
      if (searchHeader) {
        searchHeader.addEventListener('click', function (event) {
          event.stopPropagation();
        });
      }
      document.body.addEventListener('click', function () {
        HideSearchAll();
      });
    }
  }

  var searchInput = document.querySelector('#Search-In-Modal');
  var searchTitle = document.querySelector('.search_menu_title');
  var searchWrapper = document.querySelector('.search_input-wrp');

  if (!searchTitle || !searchWrapper || !searchInput) return;

  searchTitle.addEventListener('click', function () {
    this.style.display = 'none';
    searchWrapper.style.display = 'block';
  });

  searchInput.addEventListener('input', function () {
    if (this.value.trim() !== '') {
      document.body.classList.add('search-active');
    } else {
      searchTitle.style.display = 'block';
      searchWrapper.style.display = 'none';
      document.body.classList.remove('search-active');
    }
    setInterval(function () {
      hideSearchInputOnClose();
    }, 300);
  });
});

if (document.readyState === 'complete') {
  initNonCritical();
} else {
  window.addEventListener('load', initNonCritical);
}

function initNonCritical() {
  const parents = document.querySelectorAll('.product_dis_in');
  parents.forEach((parent, parentIndex) => {
    const children = Array.from(parent.children);
    const readMoreBtn = parent.querySelector('#pro_read_dis');
    const hasMoreThanTwoChildren = children.length > 2;
    const firstChildText = children[0]?.textContent.trim() || '';
    const isFirstChildLong = firstChildText.length > 50;
    if ((hasMoreThanTwoChildren || isFirstChildLong) && readMoreBtn) {
      readMoreBtn.style.display = 'inline-block';
    }
    if (isFirstChildLong && children.length <= 2) {
      parent.classList.add('moreHeight');
    }
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', function () {
        parent.classList.toggle('active');
        this.textContent = this.textContent === 'Read More +' ? 'Read Less -' : 'Read More +';
        this.closest('.about_vdimg_col')?.classList.toggle('active');
      });
    }
  });

  if (typeof jQuery === 'undefined') return;

  jQuery(function () {
    jQuery('.product-media-modal__toggle').on('click', function () {
      jQuery('body').css('overflow', '');
    });
    jQuery('.card-wrapper .technical-button_wrp .common_btn').click(function (event) {
      event.preventDefault();
      const formData = {
        items: [
          {
            id: jQuery(this).data('id'),
            quantity: 1,
          },
        ],
      };
      fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          window.location.href = '/checkout';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
}
