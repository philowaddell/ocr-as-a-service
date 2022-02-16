# Deployment Guide
This application uses a microservice architecture, it is therefore recommmeded that you use the **production** deployment method, even in your development environment. This way you can verify that your development microservice build will intergrate into the production environment straight away.

## Production Deployment
### Frontend
Frontend not yet production ready, see development deployment method.
### Backend
**Ensure sure the ENV environment variable is set to PROD in the .env file!**

From `/backend` directory, run the command:
```
docker-compose up -d
```
This will create a Docker bridge network and connect a single instance of each microservice to it. 

Further Information:
- The RabbitMQ management portal is available at `localhost:15672`.
- The RabbitMQ microservice is hosted at `172.16.0.24`.
- STOMP connections (frontend) bind on port `15674`.
- AMQP connections  (backend) bind on port `5672`.

## Development
### Frontend
From `/frontend`, run `npm start`. You will need to forward port 3000 (webapp), 15672 (rabbit management), 15674 (STOMP websocket) if working on a remote host.

### Backend
#### RabbitMQ
**Development** builds of RabbitMQ should only be used in specific circumstances. If you are unsure, please used the **production backend deployment** for your RabbitMQ instance.

From the `/backend/rabbit-service` directory:
```
  sh create-network.dev.sh
```
```
  sh build-image.sh
```
```
  sh deploy-container.dev.sh
```

#### Microservice - Code
**Ensure sure the ENV environment variable is set to DEV in the .env file!**

Setup the development environments:
```
sh setup.dev.sh
```` 
From the build directory of the microservice you want to deploy (`/backend/consumers/build/$SERVICE`), active the virtual environment:

```
source table-service-env/bin/activate
```

From the `/backend/consumers/src` directory, run:

```
python server.py
```


#### Microservice - Container
**Ensure sure the ENV environment variable is set to PROD in the .env file!**

From the build directory of the microservice you want to deploy (`/backend/consumers/build/$SERVICE`), run the following commands:

```
sh build-image.sh
```
```
sh deploy-container.sh
```

## Known Issues
- The frontend STOMP websocket is unable to bind to RabbitMQ -> Kill the frontend webserver, close terminal window, run the webserver from a new terminal window.

