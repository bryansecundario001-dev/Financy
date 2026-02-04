import { open_db } from './db';

export const create_tables = async () => {
  const db = await open_db();

  /* =======================
     USER
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user (
      id_user INTEGER PRIMARY KEY AUTOINCREMENT,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  /* =======================
     CATALOG
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS catalog (
      id_catalog INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      code TEXT NOT NULL,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  /* =======================
     DISTRIBUTION CATEGORY
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS distribution_category (
      id_distribution_category INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      display_order INTEGER,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  /* =======================
     DISTRIBUTION CONFIGURATION
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS distribution_configuration (
      id_distribution_configuration INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      distribution_category_id INTEGER NOT NULL,
      percentage REAL NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  /* =======================
     DISTRIBUTION BALANCE
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS distribution_balance (
      id_distribution_balance INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      distribution_category_id INTEGER NOT NULL,
      balance REAL NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  /* =======================
     INCOME
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS income (
      id_income INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      catalog_income_type_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

  /* =======================
     INCOME DISTRIBUTION
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS income_distribution (
      id_income_distribution INTEGER PRIMARY KEY AUTOINCREMENT,
      income_id INTEGER NOT NULL,
      distribution_category_id INTEGER NOT NULL,
      amount_assigned REAL NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

   /* =======================
    CONSUMPTION CATEGORY
    ======================= */
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS consumption_category (
        id_consumption_category INTEGER PRIMARY KEY AUTOINCREMENT,
        distribution_category_id TEXT NOT NULL,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL
        );
    `);
    
  /* =======================
     CONSUMPTION
  ======================= */
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS consumption (
      id_consumption INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      distribution_category_id INTEGER NOT NULL,
      consumption_category_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);

   



};
