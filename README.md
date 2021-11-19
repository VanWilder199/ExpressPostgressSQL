# st-2-rest-api

1. npm install

2.npm run schema:drop

3.npm run schema:sync

4.npm run seed:run


EndPoints.
GET
http://localhost:3000/users
you need to add in your query string:
limit={number}, by default limit = 10
loginSubstring={string}
http://localhost:3000/users

POST
http://localhost:3000/users
body = {
login: string;
password: string;
age: number;
isDeleted: boolean;
}


2. http://localhost:3000/users/{userId}
GET
http://localhost:3000/users/{userId}


DELETE
http://localhost:3000/users/{userId}
and Body = {
login: string;
password: string;
age: number;
isDeleted: boolean;
}

PUT
http://localhost:3000/users/{userId}
and Body = {
login: string;
password: string;
age: number;
isDeleted: boolean;
}

GROUPS
GET
http://localhost:3000/groups

POST
http://localhost:3000/groups
and Body = {
name: string;
permissions: Permission[];
}
export enum Permission {
READ = "READ",
WRITE = "WRITE",
DELETE = "DELETE",
SHARE = "SHARE",
UPLOAD_FILES = "UPLOAD_FILES",
}
GET ID
http://localhost:3000/groups/{groupId}
DELETE
http://localhost:3000/groups/{groupId}
PUT
http://localhost:3000/groups/{groupId}
and Body = {
name: string;
permissions: Permission[];
}
export enum Permission {
READ = "READ",
WRITE = "WRITE",
DELETE = "DELETE",
SHARE = "SHARE",
UPLOAD_FILES = "UPLOAD_FILES",
}

TASK6.3
PUT
http://localhost:3000/groups/{groupId}
body = {
userIds: UserId[];
}
body = {
userIds: [
"....ID..........",
"....ID..........",
"....ID.........."
]
}

TASK8.1
POST
http://localhost:3000/login
an Example
body = {
"login": "111petua100",
"password": "TnJNLRxouPu5U8v",
}
