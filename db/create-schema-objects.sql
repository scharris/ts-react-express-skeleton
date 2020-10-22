create table foo (
  id int not null primary key generated always as identity,
  name varchar(200),
  category varchar(1),
  description text
);

