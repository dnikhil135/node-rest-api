GET:http://localhost:3000/products
GET:http://localhost:3000/products/5b255a922d665c2488018324
DELETE:http://localhost:3000/products/5b255a922d665c2488018324
POST:http://localhost:3000/products
	 BODY:{
			"name":"Nikhil"
		  }
PATCH:http://localhost:3000/products/5b255a662d665c248801830d
BODY:[
	{
	"propNmae":"name", "value":"nik33"
	}

]

==============================================================
POST:/signup
http://localhost:3000/users/signup
{
	"email":"test@g.com",
	"password":"123@nik"
}

POST:/login
http://localhost:3000/users/login
{
	"email":"teszzztd1@g.com",
	"password":"123@nik"
}