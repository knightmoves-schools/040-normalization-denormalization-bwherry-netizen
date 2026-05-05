UPDATE Employee
SET
    JOB_TITLE = (
        SELECT JOB_TITLE
        FROM Job_Info
        WHERE Job_Info.ID = Employee.ID
    ),
    SALARY = (
        SELECT SALARY
        FROM Job_Info
        WHERE Job_Info.ID = Employee.ID
    ),
    DEPARTMENT = (
        SELECT DEPARTMENT
        FROM Job_Info
        WHERE Job_Info.ID = Employee.ID
    );
