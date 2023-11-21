# InstaIV

## A basic social media app inspired by Instagram.

### Client-side

- **Pages/Components**
  - Login (`/login`)
  - Dashboard (`/dashboard`)
    - Home (`/`)
    - Search (`/search`)
    - Messages (`/messages`)
    - Create post (`/create-post`)
    - Profile (`/profile`)

### Server-side

- **Models**
  - User
    - Email (type _String_)
    - Password (type _String_)
    - Username (type _String_)
    - Bio (type _String_)
    - Number of posts (type _Number_)
    - Followers (type _[User]_)
    - Following (type _[User]_)
    - Posts (type _[Post]_)
    <!-- - Saved posts (type _[Post]_) -->
    - Chats (type _[Chat]_)
  - Content
    - PublicId (type _String_)
      - From cloudinary
    - ImageUrl (type _String_)
      - From cloudinary
  - Post
    - Content (type _Content_)
    - User (type _User_)
    - Description (type _String_)
    - Number of likes (type _Number_)
    - Comments (type _[Comment]_)
  - Comment
    - User (type _User_)
    - Comment (type _String_)
  - Chat
    - Name (type _String_)
    - Users (type _[User]_)
    - Messages (type _[Message]_)
  - Message
    - User (type _User_)
    - Message (type _String_)
- **Controllers**
  - Auth route (`/api/v1/auth`)
    - Register (`/register`)
    - Login (`/login`)
    - Logout (`/logout`)
  - User route (`/api/v1/user`)
    - Get user info (`/`)
      - Retrieves
        - Username
        - Bio
        - Number of posts
        - Followers
        - Following
        - Posts
        <!-- - Saved posts -->
  - Chat route (`/api/v1/chats`)
    - Get user chats (`/`)
    - Get chat (`/:id`)
  - Post route
    - `TODO`
- **Routes**
  - Authentication routes
    - Public routes
    - 3 routes (`/api/v1/auth`)
      - Register (_POST_, `/register`)
      - Login (_POST_, `/login`)
      - Logout (_GET_, `/logout`)
  - User routes
    - Restricted routes
    - 3 routes (`/api/v1/users`)
      - Get followers (_GET_, `/followers`)
      - Get following (_GET_, `/following`)
      - Follow user (_UPDATE_, `/follow/:id`)
      - Unfollow user (_UPDATE_ `/unfollow/:id`)
      - Get user profile (_GET_, `/:id`)
  - Post routes
    - Restricted routes
    - x routes (`/api/v1/posts`)
      - Create post (_CREATE_, `/create`)
      - Delete post (_DELETE_, `/delete`)
      - Update post (_UPDATE_, `/update`)
