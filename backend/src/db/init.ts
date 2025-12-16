import { query } from './index';

const createTables = async () => {
  const createRolesTable = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );
  `;

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      role_id INTEGER REFERENCES roles(id)
    );
  `;

  try {
    await query(createRolesTable);
    console.log('Roles table created successfully');
    await query(createUsersTable);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
    throw err;
  }
};

const insertDefaultRoles = async () => {
  const insertRolesQuery = `
    INSERT INTO roles (name) VALUES ('admin'), ('user') ON CONFLICT (name) DO NOTHING;
  `;
  try {
    await query(insertRolesQuery);
    console.log('Default roles inserted successfully');
  } catch (err) {
    console.error('Error inserting default roles', err);
    throw err;
  }
}

const initializeDatabase = async () => {
  await createTables();
  await insertDefaultRoles();
};

export { initializeDatabase };

