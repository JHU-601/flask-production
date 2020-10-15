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

**WINDOWS POWERSHELL:**
```PowerShell
docker run -d -p 5000:5000 --name cldev -v ${PWD}:/app clueless
```
**MAC/LINUX:**
```bash
docker run -d -p 5000:5000 --name cldev -v $(pwd):/app clueless
```

5. Visit [localhost:5000](http://localhost:5000) in your web browser.

6. Run the tests using the commands below. If the tests run, then you're all set!

## Running Tests

**Client-side**:

```bash
npm test
```

**Server-side**:

```bash
pytest
```

## More Docker Commands

Enter shell:

```bash
docker exec -it cldev bash
```

Stop:

```bash
docker stop cldev
```

Remove the container:

```bash
docker rm cldev
```

View logs:

```bash
docker logs cldev
```

## Publishing to the Web

To push out the latest code changes on the master branch to the production server, type:

```bash
git push heroku master
```

Pending: possible AWS hosting
