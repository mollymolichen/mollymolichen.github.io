(function (global) {
  var DB_NAME = 'molly_portfolio_local';
  var DB_VERSION = 1;
  var STORE = 'portfolioSnapshot';

  function openDb() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onerror = function () {
        reject(req.error);
      };
      req.onupgradeneeded = function (ev) {
        var db = ev.target.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = function () {
        resolve(req.result);
      };
    });
  }

  function putSnapshot(db, jsonText) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(STORE, 'readwrite');
      tx.oncomplete = function () {
        resolve();
      };
      tx.onerror = function () {
        reject(tx.error);
      };
      tx.objectStore(STORE).put(jsonText, 'snapshot');
    });
  }

  function getSnapshot(db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(STORE, 'readonly');
      var req = tx.objectStore(STORE).get('snapshot');
      req.onsuccess = function () {
        resolve(req.result || null);
      };
      req.onerror = function () {
        reject(req.error);
      };
    });
  }

  function fetchJsonText() {
    return fetch('data/portfolio.json', { credentials: 'same-origin' }).then(
      function (r) {
        if (!r.ok) {
          throw new Error('portfolio.json HTTP ' + r.status);
        }
        return r.text();
      }
    );
  }

  /**
   * Fetches portfolio.json, caches the raw JSON in IndexedDB, and returns { data, source }.
   * On network failure, falls back to the last cached snapshot.
   */
  global.loadPortfolioPayload = function () {
    if (!global.indexedDB) {
      return fetchJsonText().then(function (text) {
        return { data: JSON.parse(text), source: 'network-no-idb' };
      });
    }
    return fetchJsonText()
      .then(function (text) {
        return openDb().then(function (db) {
          return putSnapshot(db, text).then(function () {
            db.close();
            return { data: JSON.parse(text), source: 'network' };
          });
        });
      })
      .catch(function (err) {
        return openDb().then(function (db) {
          return getSnapshot(db).then(function (cached) {
            db.close();
            if (!cached) {
              throw err;
            }
            return { data: JSON.parse(cached), source: 'indexeddb' };
          });
        });
      });
  };
})(typeof window !== 'undefined' ? window : this);
