Sample project of Spring Boot and ReactJS with JWT authentication.

1. Install JDK 1.8
2. Install Maven 3
3. Install Node (tested on v7.4.0)

4. Install js dependencies.
```
> npm install
```

5. Install webpack.
```
> npm install --save-dev webpack
```

6. Compile ReactJS files (The result is bundle.js file copied to src/webapp/js).
```
> webpack
```

7. Run spring boot application.
```
> mvn spring-boot:run
```

IN MEMORY DB
To access H2 console go to: http://localhost:8080/h2-console

DEVELOPMENT MODE (running only Front-End app.)

1. Run ReactJS app on development server.
```
> npm run start
```

2. In order to mock REST calls, implement mocks in "mock_server.js" files and run.

```
> npm run mockserver
```

3. By default application is available at [http://localhost:3000/](http://localhost:3000/), Mock server is run on port: 3001, every REST calls /api/** are redirected.

DEFAULT USER
```
username: admin
password: admin
```

Technology stack:
![Alt text](/tech-stack.png?raw=true "tech stack")
