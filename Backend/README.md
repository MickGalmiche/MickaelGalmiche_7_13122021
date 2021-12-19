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

### Comment
|   |Access point|Request Body|Response|
|---|---|---|---|
|GET|/api/comment| - |Array of Comments|
|POST|/api/comment|{ content: string, authorId: string, postId: string }|{ message: string }|
|GET|/api/comment/:id| - |Single comment|
|PUT|/api/comment/:id|{ content: string }|{ message: string }|
|DELETE|/api/comment/:id| - |{ message: string }|