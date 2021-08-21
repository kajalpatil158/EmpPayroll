#!/bin/bash
cd /home/ubuntu/EmployeePayroll_Backend/EmpPayroll
pm2 delete 0
pm2 --name EmployeeFrontEnd start npm --start
