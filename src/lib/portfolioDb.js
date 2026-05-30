const DB_NAME = 'molly_portfolio_local';
const DB_VERSION = 1;
const STORE = 'portfolioSnapshot';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onupgradeneeded = (ev) => {
      const db = ev.target.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
  });
}

function putSnapshot(db, jsonText) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE).put(jsonText, 'snapshot');
  });
}

function getSnapshot(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get('snapshot');
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

function fetchJsonText() {
  return fetch('/data/portfolio.json', { credentials: 'same-origin' }).then((r) => {
    if (!r.ok) throw new Error('portfolio.json HTTP ' + r.status);
    return r.text();
  });
}

export function loadPortfolioPayload() {
  if (!window.indexedDB) {
    return fetchJsonText().then((text) => ({ data: JSON.parse(text), source: 'network-no-idb' }));
  }
  return fetchJsonText()
    .then((text) =>
      openDb().then((db) =>
        putSnapshot(db, text).then(() => {
          db.close();
          return { data: JSON.parse(text), source: 'network' };
        })
      )
    )
    .catch((err) =>
      openDb().then((db) =>
        getSnapshot(db).then((cached) => {
          db.close();
          if (!cached) throw err;
          return { data: JSON.parse(cached), source: 'indexeddb' };
        })
      )
    );
}
