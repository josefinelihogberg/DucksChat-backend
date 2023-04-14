# DucksChat-backend Examinationsuppgift 
**Keywords: Node.js, Express, Mongodb, JWT token, Socket.io and RestAPI.**

FE22 KYH Group Chit Chat

* Josefine Li Högberg

* Erica Eklund

The backend contains the following endpoints. 

* [POST] http://address:port/auth/register

* [POST] http://address:port/auth/login

* [GET] - http://address:port/ducks/api/channel/ <-- retrieves a list of commercial channels

* [GET] - http://adress:port/ducks/api/channel/:id <-- retrieves the messages of an identified channel.

* [PUT] - http://address:port/ducks/api/channel/ <-- creates a new channel. 

* [POST] - http://address:port/ducks/api/channel/:id <-- create a new message to an identified channel.

* [DELETE] - http://address:port/ducks/api/channel/:id <-- deletes an identified channel.

* [GET] - http://adress:port/ducks/api/broadcast/ <-- retrieves a list of all emergency messages that have been broadcast, e.g.traffic accidents, etc. 

* [POST] - http://address:port/ducks/api/broadcast/ <-- creates a new emergency message by admin.

**Some code examples in the server.js, mongoClient.js, router.js and jwtUtil.js**

<img width="400" src="https://user-images.githubusercontent.com/97985695/232014518-16ee9981-9277-4e6c-9145-9e87688ed48a.png">   <img width="400" src="https://user-images.githubusercontent.com/97985695/232014401-972f5a2d-310d-49de-8987-702d604b5458.png">    <img width="400" src="https://user-images.githubusercontent.com/97985695/232016403-8a42117a-eebf-4c51-9ada-161a81850bce.png">    <img width="700" src="https://user-images.githubusercontent.com/97985695/232014497-3c2d0f0e-e7c0-474a-a577-6e28a60d9cb9.png">

