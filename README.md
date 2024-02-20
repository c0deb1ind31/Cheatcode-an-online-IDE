# Algouniversity IDE Assignment

### Deployment link : http://16.171.195.145/

## Run with docker-compose
```
docker compose up -d
```
Access webapp at http://localhost:3000


## Refer this for running without docker
## Setup

Create virtual environment and source it

```
python3 -m venv ~/django-venv
source ~/django-venv/bin/activate
```
Install Backend Requirements

```
cd backend
pip install -r requirements.txt
```
Add Env Variables (Postgres and RabbitMQ)

```
cd backend
mv .env.example .env
```

Install Frontend Requirements

```
cd frontend
npm install
```

## Run

Start backend server at port 5000

```
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runsever 0.0.0.0:5000

```

Start frontend server at port 3000

```
cd frontend
npm run dev
```

## System Design
![System Design](./images/system-design.png)

## Database Design
![Database Design](./images/db-design.png)
