import { openDB } from 'idb';

const DB_NAME = 'hospital_offline_db';
const STORE_NAME = 'offline_queue';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const queueStorage = {
  saveQueueItem: async (item) => {
    try {
      const db = await initDB();
      await db.put(STORE_NAME, item);
      console.log('IndexedDB Save: Request successfully queued');
    } catch (error) {
      console.error('IndexedDB Save Failed:', error);
      throw new Error('Unable to save locally');
    }
  },

  removeQueueItem: async (id) => {
    try {
      const db = await initDB();
      await db.delete(STORE_NAME, id);
      console.log(`IndexedDB Remove: Item ${id} removed`);
    } catch (error) {
      console.error('IndexedDB Delete Failed:', error);
    }
  },

  updateQueueItem: async (item) => {
    try {
      const db = await initDB();
      await db.put(STORE_NAME, item);
    } catch (error) {
      console.error('IndexedDB Update Failed:', error);
    }
  },

  getAllQueueItems: async () => {
    try {
      const db = await initDB();
      return await db.getAll(STORE_NAME);
    } catch (error) {
      console.error('IndexedDB GetAll Failed:', error);
      return [];
    }
  },

  clearQueue: async () => {
    try {
      const db = await initDB();
      await db.clear(STORE_NAME);
    } catch (error) {
      console.error('IndexedDB Clear Failed:', error);
    }
  }
};
