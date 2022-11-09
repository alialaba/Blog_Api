# Blog App
___
This is an api for a Blog App

## Requirement
____
1. Users should be able to signup.
2. Already signup user should be able to login using passport JWT.
3. Logged in and not logged in users should be able to get a list of published blogs created.
4. Logged in and not logged in users should be able to to get a published blog.
5. Logged in users should be able to create a blog.
6. The owner of a blog should be able to edit the blog in draft or published state.
7. The owner of the blog should be able to delete the blog in draft or published state and also be able to edit title, description, body and tags.
8. The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated and should be searchable by title, tags and should be orderable by reading time, read count and timestamp.

## Setup
___
* Fork:- fork the Repo and clone to your local machine
* Install:- yarn install / npm install
* Run :- nodemon app.js / node app.js

## Live URL
https://blog-api-vvib.onrender.com/

## Models
____

### User

| Field          | Data_type     | Constraints  |
| -------------  |:-------------:| ------------:|
| email          | string        | required     |
| firstname      | string        | required     |
| lastname       | string        | required     |
| password       | string        | required     |
| created_at     | Date          | optional     |


### Blog
___

| Field          | Data_type     | Constraints                   |
| -------------  |:-------------:| ----------------------------: |
| title          | string        | required/ unique              |
| description    | string        | optional                      |
| state          | string        | default:draft                 |
| read_count     | Number        | optional default:0            |
| reading_time   | Number        | optional                      |
| tags           | Array         | optional                      |
| body           | string        | required                      |

## APIs
___
###  Signup User
* Route: /signup
* Method: POST
* body

```json
{
  "email": "jay@example.com",
  "password": "password1",
  "firstname": "Jay",
  "lastname": "Doe",
}
```

*Response
Success created

```json
{
  "message": "Sign up successfully",
  "user": {
    "created_at": "2022-11-08T19:53:52.621Z",
    "email": "taiwo@gmail.com",
    "password": "$2b$10$xExoqkk1xDgCdb9IAVDhq.clZ7sPeide7CFlpo8QVgIf6u9nvBKE.",
    "blogs": [],
    "firstname": "Taiwo",
    "lastname": "Ali",
    "_id": "636ab3f1a11954d59b0941bb",
    "__v": 0
  }
}
```

### Login User
* Route:- /login
* Method:- POST
* Body


```json
{
  "password": "Password1",
  "email": 'jon_doe@gmail.com",
}
```

* Response
  Success

```js
{ 
    token: 'sjlkafjkghiopelksaslpwoeldsfjsd'
}
```

## Create Blog
* Route: /blogs
* Method: POST
* Header
  * Authorization: Bearer {token}
*  Body:
  
```json
  {
    "title": "Backend Engineering",
    "description" : "Build Api with Backend",
    "tags": ["Javascript", "API", "node", "expressjs"],
    "body":"A backend engineer is responsible for designing, building, and maintaining the server-side of web applications. In other words, a backend engineer's primary responsibility is to build the structure of a software application. They set the software team's foundations of what they need to do to achieve the main goals."
  }
```

*  Success

```json
  {
  "status": true,
  "message": "Blog created Successfully",
  "newBlogCreated": {
    "title": "Frontend Engineering",
    "description": "Build User Interface",
    "author": "636ab3f1a11954d59b0941bb",
    "state": "draft",
    "read_count": 0,
    "reading_time": 1,
    "tags": ["Javascript", "API","CSS3","React"],
    "body": "Front end engineers plan, design, build, and implement the user interface systems of websites, software programs, and web-based applications. Their primary goal is to provide a satisfactory user experience with no issues, errors, or downtime.",
    "created_at": "2022-11-09T03:00:34.264Z",
    "updated_at": "2022-11-09T03:00:34.264Z",
    "_id": "636b18276efe260f9e1345cc",
    "__v": 0
  }
}
```

### Get Blogs

* Route: /blogs
* Method: GET
* Header:
  * Authorization: Bearer {token}
* Query params:
  * page (default: 0)
  * per_page (default: 20)
  * blog_by (default: created_at)
  * blog (options: asc | desc, default: desc)
  * state
  * created_at

* Responses
Success (state:"published")

```json
{
  "status": true,
  "blogs": [
    {
      "_id": "6369c948f30c83c444074de8",
      "title": "Tweaking In The Browser",
      "description": "Crossing In The  Browser",
      "author": "6369c215367495adaf6dd2f9",
      "state": "published",
      "read_count": 1,
      "reading_time": 2,
      "tags": ["Browser","Css3","web developer"
      ],
      "body": "A while ago, I got to think about the term “Designing in the browser” and if it’s a valid thing at all. The term “designing” in the browser indicates that we can add design elements quickly, but if we compare that to a design tool, like Figma, then the tool will win in terms of speed. When we have an already implemented design in the browser, then it’s so much easier to tweak it, and eventually, we might “design” something different from what we started with. I like the term “tweaking” better for that context. The question is, what do we need to be able to design in the browser? And what we can do in the browsers with the current developer tools? Introduction The term “designing in the browser” is so vague to the point that some designers and developers think that web browsers are design tools. This thinking implies that if we have an HTML markup, then we can start designing in the browser, just like a design tool (e.g: Figma). No, that’s not the point! Let’s take the following example for a recipes website. We have the following sections: header search featured recipes recipes listingand so on.Can we design the following in the browser at the same time we do it in a design tool?",
      "created_at": "2022-11-08T03:00:21.657Z",
      "updated_at": "2022-11-08T03:00:21.657Z",
      "__v": 0
    }
  ]
}

```


### Get Blog
* Route: /blogs/id
* Method: GET
* Header:
  * Authorization: Bearer {token} 
  *Note: token expires in 1hr*

* Responses
Success


### Update Blog State

* Route: /blogs/id
* Method: PATCH
* Header:
  * Authorization: Bearer {token}
  *Note: token expires in 1hr*

* Responses
  
Success (change state to published)

```json
{
  "status": true,
  "blog": {
    "_id": "636b18276efe260f9e1345cc",
    "title": "Frontend Engineering",
    "description": "Build User Interface",
    "author": "636ab3f1a11954d59b0941bb",
    "state": "published",
    "read_count": 0,
    "reading_time": 1,
    "tags": [ "Javascript","API","CSS3", "React"],
    "body": "Front end engineers plan, design, build, and implement the user interface systems of websites, software programs, and web-based applications. Their primary goal is to provide a satisfactory user experience with no issues, errors, or downtime.",
    "created_at": "2022-11-09T03:00:34.264Z",
    "updated_at": "2022-11-09T03:00:34.264Z",
    "__v": 0
  }
}
```

### Update Blog 

* Route: /blogs/id
* Method: PUT
* Header:
  * Authorization: Bearer {token}
  *Note: token expires in 1hr*

* Responses
Success(update any part of the blog body)

```json
{
  "status": true,
  "message": "updated successfully",
  "updateBlog": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

### Delete Blog 

* Route: /blogs/id
* Method: DELETE
* Header:
  * Authorization: Bearer {token}
  *Note: token expires in 1hr*

* Responses
Success

```json
{
  "status": true,
  "message": "Deleted Successful",
  "deleteBlog": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
```

## Contributor
* Aliyu AbdulGaniy