create table blogs(
    id serial primary key,
    author text,
    url text not null,
    title text not null,
    likes int default 0
)

insert into blogs (author, url, title) values ('Dan Abramov', '', 'On let vs const' ), ('Laurenz Albe', '', 'Gaps in sequences in PostgreSQL');