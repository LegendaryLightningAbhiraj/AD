import * as SQLite from "expo-sqlite";

const dbPromise = SQLite.openDatabaseAsync("focusly.db");

export async function initializeDatabase() {
  const db = await dbPromise;

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS focus_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      duration INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function saveFocusSession(duration: number) {
  const db = await dbPromise;

  await db.runAsync(
    "INSERT INTO focus_sessions (duration) VALUES (?)",
    duration
  );
}

export async function getFocusSessions() {
  const db = await dbPromise;

  return await db.getAllAsync(
    "SELECT * FROM focus_sessions ORDER BY id DESC"
  );
}