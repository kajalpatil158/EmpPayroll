#!/bin/bash
cd /home/ubuntu/EmployeePayroll_Backend/EmpPayroll
pm2 delete 0
pm2 start server.js --name EmployeeBackEnd
