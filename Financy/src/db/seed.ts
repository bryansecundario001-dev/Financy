import { open_db } from './db';

export const seed_database = async () => {
  const db = await open_db();
  const now = new Date().toISOString();

  /* =======================
     CATALOG DATA
  ======================= */
  await db.execAsync(`
    INSERT OR IGNORE INTO catalog (type, code, name, status, created_at)
    VALUES
      ('TIPO_INGRESO', 'SALARIO', 'Salario', 'Activo', '${now}'),
      ('TIPO_INGRESO', 'INGRESO_EXTRA', 'Ingreso Extra', 'Activo', '${now}');
  `);

  /* =======================
     DISTRIBUTION CATEGORY DATA
  ======================= */
  await db.execAsync(`
    INSERT OR IGNORE INTO distribution_category (name, display_order, status, created_at)
    VALUES
      ('Necesidades', 1,'Activo', '${now}'),
      ('Ahorros', 2,'Activo', '${now}'),
      ('Inversiones', 3,'Activo', '${now}'),
      ('Diversión', 4,'Activo', '${now}'),     
      ('Donativos', 5,'Activo', '${now}');
  `);


  await db.execAsync(`
  INSERT OR IGNORE INTO consumption_category
    (distribution_category_id, name, status, created_at)
  VALUES
    -- Necesidades
    (1, 'Alimentación', 'Activo', '${now}'),
    (1, 'Transporte', 'Activo', '${now}'),
    (1, 'Arriendo', 'Activo', '${now}'),
    (1, 'Servicios Básicos', 'Activo', '${now}'),
    (1, 'Salud', 'Activo', '${now}'),
    (1, 'Educación', 'Activo', '${now}'),
    (1, 'Otros', 'Activo', '${now}'),

    -- Ahorros
    (2, 'Fondo de Emergencia', 'Activo', '${now}'),
    (2, 'Ahorro General', 'Activo', '${now}'),
    (2, 'Otros', 'Activo', '${now}'),

    -- Inversiones
    (3, 'Educación', 'Activo', '${now}'),
    (3, 'Trading', 'Activo', '${now}'),
    (3, 'Negocios', 'Activo', '${now}'),
    (3, 'Activos', 'Activo', '${now}'),
    (3, 'Otros', 'Activo', '${now}'),

    -- Diversión
    (4, 'Entretenimiento', 'Activo', '${now}'),
    (4, 'Viajes', 'Activo', '${now}'),
    (4, 'Restaurantes', 'Activo', '${now}'),
    (4, 'Hobbies', 'Activo', '${now}'),
    (4, 'Otros', 'Activo', '${now}'),

    -- Donativos
    (5, 'Donaciones', 'Activo', '${now}'),
    (5, 'Ayuda Familiar', 'Activo', '${now}'),
    (5, 'Caridad', 'Activo', '${now}'),
    (5, 'Iglesia / Comunidad', 'Activo', '${now}'),
    (5, 'Otros', 'Activo', '${now}');
`);


};
