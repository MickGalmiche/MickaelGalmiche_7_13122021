# Groupomania - Backend

## Installation
- Run the `npm install` command in the **Backend** folder
- Create a *.env* file containing the **DATABASE_URL** (string allowing the connection to the database) and **TOKEN_KEY** (string for the token encoding) variables. A modification of the port can also be added with the **PORT** variable.
- Modify the provider of the Schema.prisma file if necessary (*mysql* by default)
- Apply the schema to the database with the command `npx prisma migrate dev`.
- Start the server with the command `npm start`.


## API specifications
### User
|   |Access point|Request Body|Response|
|---|---|---|---|
|POST|/api/auth/signup|{ email: string, firstname: string, lastname: string, password: string }|{ message: string }|
|POST|/api/auth/login|{ email: string, password: string }|{ userId: string, token: string, userRole: string }|
|DELETE|/api/auth/delete/:id| - |{ message: string}|
|GET|/api/auth/profile/:id| - |Single User Profile|
|PUT|/api/auth/profile/:id|{ email: string, firstname: string, lastname: string, password: string }|{ message: string }|

### Post
|   |Access point|Request Body|Response|
|---|---|---|---|
|GET|/api/post| - |Array of Posts|
|POST|/api/post|{ title: string, content: string, authorId: string }|{ message: string }|
|GET|/api/post/:id| - |Single post with array of comments|
|PUT|/api/post/:id|{ title: string, content: string }|{ message: string }|
|DELETE|/api/post/:id| - |{ message: string }|

### Comment
|   |Access point|Request Body|Response|
|---|---|---|---|
|GET|/api/comment| - |Array of Comments|
|POST|/api/comment|{ content: string, authorId: string, postId: string }|{ message: string }|
|GET|/api/comment/:id| - |Single comment|
|PUT|/api/comment/:id|{ content: string }|{ message: string }|
|DELETE|/api/comment/:id| - |{ message: string }|