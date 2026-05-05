const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.exec(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromEmployee = (db) => {
  const sql = `SELECT * FROM Employee`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromContactInfo = (db) => {
  const sql = `SELECT * FROM Contact_Info`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromJobInfo = (db) => {
  const sql = `SELECT * FROM Job_Info`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const buildNewEmployees = (employees, contactInfos, jobInfos) => {
  let newEmployees = [];
  let employeeContactInfo;
  let employeeJobInfo;

  employees.forEach((employee) => {
    employeeContactInfo = contactInfos.find(ci => ci.EMPLOYEE_ID == employee.ID);
    employeeJobInfo = jobInfos.find(ji => ji.EMPLOYEE_ID == employee.ID);
    newEmployees.push({
      ID: employee.ID,
      FIRST_NAME : employee.FIRST_NAME,
      LAST_NAME : employee.LAST_NAME,
      DATE  : employee.DATE,
      EDUCATION : employee.EDUCATION,
      EMAIL : employeeContactInfo.EMAIL,
      PHONE_NUMBER : employeeContactInfo.PHONE_NUMBER,
      ADDRESS : employeeContactInfo.ADDRESS,
      ZIP_CODE : employeeContactInfo.ZIP_CODE,
      EMERGENCY_CONTACT : employeeContactInfo.EMERGENCY_CONTACT,
      SALARY : employeeJobInfo.SALARY,
      ROLE :employeeJobInfo.ROLE,
      JOB_LOCATION : employeeJobInfo.JOB_LOCATION
    })
  })
  return newEmployees;
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let scriptPath1;
  let scriptPath2;
  let cleanup;
  let create;
  let populate;

  beforeAll(async () => {
    const dbPath = path.resolve(__dirname, '..', 'lesson40.db');
    db = new sqlite3.Database(dbPath);

    scriptPath1 = path.resolve(__dirname, '..', 'exercise1.sql');
    scriptPath2 = path.resolve(__dirname, '..', 'exercise2.sql');
    cleanup = path.resolve(__dirname, './cleanup.sql');
    create = path.resolve(__dirname, './create.sql');
    populate = path.resolve(__dirname, './populate.sql');
    await runScript(db, cleanup);
    await runScript(db, create);
    await runScript(db, populate);
  });

  afterAll(async () => {
    await runScript(db, cleanup);
    await runScript(db, create);
    await runScript(db, populate);
    db.close();
  });

  it('should denormalize the database as specified in the readme', async () => {
      const ogEmployees = await getFromEmployee(db);
      const contactInfos = await getFromContactInfo(db);
      const jobInfos = await getFromJobInfo(db)

      await runScript(db, scriptPath1);
      await runScript(db, scriptPath2);
      const results = await getFromEmployee(db);
      console.log(results)
      const expected = buildNewEmployees(ogEmployees, contactInfos, jobInfos);



      expect(results).toEqual(expected);
  });
});
