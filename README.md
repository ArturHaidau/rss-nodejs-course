# This branch contains solution for Node.js "REST service: Containerization" assignment

## Technical requirements
- Node.js 18
- Docker

## Running the application
- Add `.env` files for the root and `home-library-service` folders with the environment variables 
listed in the `.env.example` files. Pay attention: environment variables `SERVICE_CONTAINER_LOCAL_PORT` 
and `PORT` (from `home-library-service` folder) should be the same as well as exposed port from the service Dockerfile
- Build and run the application using the following command:
  ```bash
  npm run build
  ```
