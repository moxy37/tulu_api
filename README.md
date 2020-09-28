# Trucker Spike

to start the app run this code in command line :
    
    node app.js

instead of using node app.js, I used nodemon app.js.
This lets you view changes without closing and rerunning the up again.

To create a database run the following commands:

    cd data/core
    mysql -uroot -proot
    create database spike;
    exit
    mysql -uroot -proot spike < Spartacus.sql
