# clue-less (flask production)

This repository holds code for the Iron Board Games Clue-less online board game.

## Requirements

You must have Docker installed and running on your system.

## Setup

1. Clone this repository.

```bash
git clone https://github.com/JHU-601/flask-production
```

2. Enter the repository.

```bash
cd flask-production
```

3. Build the docker image.

```
docker build -t clueless:latest .
```

4. Start the docker iamge (and run the server).

```bash
docker run -d -p 5000:5000 --name cldev clueless
```

5. Visit [localhost:5000](http://localhost:5000) in your web browser.

## Running Tests

**Client-side**:

```bash
npm run test
```

**Server-side**:

```bash
pytest
```

## Docker Commands

Start:

```bash
docker build -t clueless:latest .
docker run -d -p 5000:5000 --name cldev clueless
```

Stop:

```bash
docker stop cldev
```

View logs:

```bash
docker logs cldev
```

Enter shell:

```bash
docker exec -it cldev bash
```

## Publishing to the Web

To push out the latest code changes on the master branch to the production server, type:

```bash
git push heroku master
```
