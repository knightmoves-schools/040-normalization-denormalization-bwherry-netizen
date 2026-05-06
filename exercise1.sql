UPDATE Employee
SET 
    EMAIL = (
        SELECT EMAIL 
        FROM Contact_Info 
        WHERE Contact_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    ),
    PHONE_NUMBER = (
        SELECT PHONE_NUMBER 
        FROM Contact_Info 
        WHERE Contact_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    ),
    ADDRESS = (
        SELECT ADDRESS 
        FROM Contact_Info 
        WHERE Contact_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    ),
    ZIP_CODE = (
        SELECT ZIP_CODE 
        FROM Contact_Info 
        WHERE Contact_Info.EMPLOYEE_ID = Employee.EMPLOYEE_ID
    );
