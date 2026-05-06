UPDATE Employee
SET 
    JOB_TITLE = (
        SELECT JOB_TITLE 
        FROM Job_Info 
        WHERE Job_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    ),
    SALARY = (
        SELECT SALARY 
        FROM Job_Info 
        WHERE Job_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    ),
    DEPARTMENT = (
        SELECT DEPARTMENT 
        FROM Job_Info 
        WHERE Job_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    );
