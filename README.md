# Rocket_Elevators_Express
Module 4

● What is Node.js?
Is a tool that allows us to run JavaScript outside of the browser. It's used to build backend applications like web servers or tools that interact with files and databases.


● What is Express?
Is a library built on top of Node.js that helps us create web servers and APIs more easily. It simplifies many tasks like handling routes, requests, and responses

● Give three reasons why Node.js Express:
1. It’s fast and efficient — it handles many users at once.
Node.js uses a non-blocking, event-driven system. This means it can handle thousands of requests at the same time without slowing down, which is great for real-time apps like chat or online games.

2.  Normally, developers have to learn different languages for backend and frontend.
But with Node.js and Express, you can use the same language (JavaScript) everywhere.
That makes it easier to learn, build, and maintain your app.

3. Express makes server code simpler and more organized.
Express gives you tools and shortcuts to handle common tasks like routes, data, and responses.
Instead of writing long, complex code with Node.js alone, Express helps you write clean and readable code with fewer lines.


How to Start and Stop the Server
Open your terminal and navigate to the root folder of the project (where app.js is located):
~/Codeboxx/Rocket_Elevators_Express$
Then run the following: node app.js
You should see:
Server listening on port 3000
To stop the server, go to the terminal where it’s running and press: ctrl + c