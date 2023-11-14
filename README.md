# Members Only
## Description:
A simple messageboard in which, if the user isn't logged in, the posts are anonymous, and if the user is logged in, they can see who wrote the posts and create their own posts. This was done as part of The Odin Project's curriculum: [https://www.theodinproject.com/lessons/nodejs-mini-message-board](https://www.theodinproject.com/lessons/nodejs-members-only).

## Demo:
![Screenshot 2023-11-13 180527](https://github.com/bobandash/members-only/assets/74850332/a4a8951d-dcbc-47fe-ade3-c7169da9eb82)

## Live View
https://brucecreates-membersonly.fly.dev/

## Technologies Used:
Backend:
- Node.js / Express
- MongoDB
- Pug

## Concepts Learned:
- PassportJS and basic user authentication
- Hashing and salting passwords
- Greater understanding of Pug (mixins and includes)

## Quick Start:
1. Fork the project
2. Clone the project using git clone git@github.com:<YOUR-USERNAME>/members-only.git
3. Open the project using the editor of your choice
4. Run npm install
5. Create a database on mongoDB
7. Create an .env file with your database URL (include password) as MONGODB_URL
8. Run npm run devStart to compile the project

## Docs:
### To-Do:
- [ ] Add specific error handling pages for each error type
- [ ] Create a redirect to home when you click outside the form
