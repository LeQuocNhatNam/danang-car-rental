create database car_rental;
use car_rental;

create table account (
id int primary key auto_increment,
username varchar(45),
password varchar(45)
);

create table role (
id int primary key auto_increment,
name varchar(45)
);

create table account_role (
id int primary key auto_increment,
role_id int,
account_id int,
foreign key (role_id) references account(id),
foreign key (account_id) references role(id)
);

create table employee (
id int primary key auto_increment,
name varchar(45),
idCard varchar(20),
addrress varchar(45),
phone_number varchar(45),
position int,
salary varchar(45),
account_id int,
foreign key (account_id) references account (id)
);

create table customer (
id int primary key auto_increment,
address varchar(45),
idCard varchar(20),
driving_license varchar(20),
phone_number varchar(15),
email varchar(45)
);

create table reservation (
id int primary key auto_increment,
reservation_date date,
pick_up_date date,
return_date date, 
customer_id int,
total_price Double,
foreign key (customer_id) references customer (id)
);

create table car (
	id int primary key auto_increment,
    price double,
    model varchar(45),
    brand varchar(45),
    number_plate varchar(45),
    employee_id int,
    foreign key (employee_id) references employee (id)
);

create table rental_detail (
id int primary key auto_increment,
car_id int,
reservation_id int,
foreign key (reservation_id) references reservation (id),
foreign key (car_id) references car (id)
);


