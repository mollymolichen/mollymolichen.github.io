(function () {
  var GRID_BY_TAB = {
    'consumer-apps': '.consumer-apps-work-grid',
    completed: '.business-integrations-grid',
  };

  var TAB_ROOT_BY_TAB = {
    'consumer-apps': '#tab-consumer-apps',
    completed: '#tab-completed',
  };

  function fieldBlock(label, iconClass, htmlValue) {
    var wrap = document.createElement('div');
    var lab = document.createElement('div');
    lab.className = 'prd-field-label';
    var i = document.createElement('i');
    i.className = 'fa ' + iconClass;
    lab.appendChild(i);
    lab.appendChild(document.createTextNode(' ' + label));
    var val = document.createElement('div');
    val.className = 'prd-field-value';
    val.innerHTML = htmlValue;
    wrap.appendChild(lab);
    wrap.appendChild(val);
    return wrap;
  }

  function renderCard(card) {
    var root = document.createElement('div');
    root.className = 'prd-card';

    var top = document.createElement('div');
    top.className = 'prd-card-top';

    var left = document.createElement('div');
    var titleEl = document.createElement('div');
    titleEl.className = 'prd-card-title';
    titleEl.textContent = card.title || '';
    var tagsWrap = document.createElement('div');
    tagsWrap.className = 'squad-tags';
    (card.squadTags || []).forEach(function (tag) {
      var s = document.createElement('span');
      s.className = 'squad-tag';
      s.textContent = tag;
      tagsWrap.appendChild(s);
    });
    left.appendChild(titleEl);
    left.appendChild(tagsWrap);

    var meta = document.createElement('div');
    meta.className = 'prd-card-meta';
    var period = document.createElement('span');
    period.className = 'period-text';
    meta.appendChild(period);
    if (card.status && card.status.class) {
      var pill = document.createElement('span');
      pill.className = 'status-pill ' + card.status.class;
      pill.textContent = card.status.label || '';
      meta.appendChild(pill);
    }

    top.appendChild(left);
    top.appendChild(meta);

    var body = document.createElement('div');
    body.className = 'prd-card-body';
    body.appendChild(
      fieldBlock('Problem', 'fa-exclamation-circle', card.problem || '')
    );
    body.appendChild(
      fieldBlock('Metrics', 'fa-line-chart', card.metrics || '')
    );
    body.appendChild(
      fieldBlock('Solution', 'fa-lightbulb-o', card.solution || '')
    );

    root.appendChild(top);
    root.appendChild(body);
    return root;
  }

  function syncSectionHeader(section) {
    var tabRoot = document.querySelector(TAB_ROOT_BY_TAB[section.tabId]);
    if (!tabRoot) {
      return;
    }
    var countEl = tabRoot.querySelector('.section-count');
    if (countEl) {
      var n = (section.cards && section.cards.length) || 0;
      if (section.tabId === 'consumer-apps') {
        countEl.textContent = n + ' initiatives \u00a0·\u00a0 ';
      } else {
        countEl.textContent = n + ' initiatives';
      }
    }
    var icon = tabRoot.querySelector('.section-header h2 i.fa');
    if (icon && section.titleIcon) {
      icon.className = 'fa ' + section.titleIcon;
      if (section.titleIconStyle) {
        icon.setAttribute('style', section.titleIconStyle);
      } else {
        icon.removeAttribute('style');
      }
    }
  }

  function renderSection(section) {
    var sel = GRID_BY_TAB[section.tabId];
    if (!sel) {
      return;
    }
    var grid = document.querySelector(sel);
    if (!grid) {
      return;
    }
    syncSectionHeader(section);
    var frag = document.createDocumentFragment();
    (section.cards || []).forEach(function (c) {
      frag.appendChild(renderCard(c));
    });
    grid.appendChild(frag);
  }

  function initPortfolioGrids() {
    if (!document.querySelector('.consumer-apps-work-grid')) {
      return;
    }
    if (typeof loadPortfolioPayload !== 'function') {
      return;
    }
    loadPortfolioPayload()
      .then(function (payload) {
        var data = payload.data;
        if (!data || !data.sections) {
          return;
        }
        data.sections.forEach(renderSection);
      })
      .catch(function (e) {
        if (typeof console !== 'undefined' && console.error) {
          console.error('Portfolio load failed', e);
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioGrids);
  } else {
    initPortfolioGrids();
  }
})();
