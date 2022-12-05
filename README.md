# ***************** save-api ******************
============================================================================
## Base API URL

## route:

## users API route:

- /api/users/registration 'POST';
- /api/users/login 'POST';
- /api/users/logout 'POST';
- /api/users/avatar 'PATCH';

## save API route:

- /api/save/ 'GET' --get all saveData;
- /api/save/:id 'GET'-- get by id owner saveData;
- /api/save/ 'POST' -- create saveData;
- /api/save/:id 'PUT' --update owner saveData by id;
- /api/save/:id 'PATCH' --update owner saveData by id;
- /api/save/:id 'DELETE' --remove owner saveData by id;

## Socket  route wss://save-api.herokuapp.com/game (send any object and why connection will receive it ):

- /game

## shema DB:

user :

- name --String;
- email --String | required
- password --String | required
- avatar --String;

save :

- title --String | required
- description --String | required
- image --String;
- urlMarkbook --String | required
- rating --String;
- ratingCounter --String

===================================================================================
example request for registration user:

- body request

```javascript
{
    "name":"user_name",     optional
    "email":"user_email@email.com",   required
    "password":"user_password min length 8 symbols"  required
}
```

- result if success:

```javascript
{
    "status": "success",
    "code": 201,
    "data": {
        "id": "60a749c0a611ee001c601c92",
        "email": "test@email.com",
        "name": "test",
        "avatar": "https://s.gravatar.com/avatar/93942e96f5acd83e2e047ad8fe03114d?s=250",
    }
}
```

==================================================================================
example request for login user:

- body request

```javascript
{
    "email":"user_email@email.com",   required
    "password":"user_password min length 8 symbols"  required
}
```

- result if success:

```javascript
{
    "status": "success",
    "code": 201,
    "data": {
        "id": "60a749c0a611ee001c601c92",
        "email": "test@email.com",
        "name": "test",
        "avatar": "https://s.gravatar.com/avatar/93942e96f5acd83e2e047ad8fe03114d?s=250",
        "token": "token sdgbjjbndvbsdvsdv234"
    }
}
```

=====================================================================

example request for save game metadata:

- body request

```javascript
{
   
}
```

- result if success:

```javascript
{
   
}
```


## functionality:

- CRUD private collection;
- public collection;
- user signup login logout;
- add user avatar;
- socket game;

### use libs:

- mongodb;
- mongoose;
- morgan;
- joi;
- express;
- dotenv;
- cors;
- cross-env;
- jsonwebtoken;
- passport;
- passport-jwt;
- bcryptjs;
- helmet;
- express-rate-limit;
- multer;
- gravatar;
- jimp;
