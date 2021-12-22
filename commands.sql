create table blogs(
    id serial primary key,
    author text,
    url text not null,
    title text not null,
    likes int default 0
)