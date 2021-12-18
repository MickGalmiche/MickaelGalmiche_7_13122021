# Groupomania - Backend
## API specifications
### User
|   |Access point|Request Body|Response|
|---|---|---|---|
|POST|/api/user/signup|{ email: string, firstname: string, lastname: string, password: string}|{ message: string }|
|POST|/api/user/login|{ email: string, password: string }|{ userId: string, token: string }|

### Post
|   |Access point|Request Body|Response|
|---|---|---|---|
|GET|/api/post| - |Array of Posts|
|POST|/api/post|{ title: string, content: string, authorId: string }|{ message: string }|
|GET|/api/post/:id| - |Single post|
|PUT|/api/post/:id|{ title: string, content: string }|{ message: string }|
|DELETE|/api/post/:id| - |{ message: string }|