import { Pool } from "pg";

const pool = new Pool();
export const query = (...args) => pool.query(...args);
export const connect = (...args) => pool.connect(...args);

export default {};

// const request = sql`select from users where user_id = 1`
//
// query(request).then(r => console.log(r))
