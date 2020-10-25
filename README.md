# clue-less (flask production)

This repository holds code for the Iron Board Games Clue-less online board game.

## Requirements

You must have Docker installed and running on your system. Alternatively, you can develop locally with pipenv, which can be installed with:

```bash
pip install pipenv
```

## Setup (Docker)

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

## Setup (pipenv)

1. Clone the repository and enter the directory as above.
2. Install the pipenv specified by `Pipfile`.

```bash
pipenv install --dev
```
3. Enter the newly created pipenv.

```bash
pipenv shell
```

Alternatively, if you are using an IDE with python support (e.g. PyCharm) the pipenv will be set up automatically.

## Running Tests

**Client-side**:

```bash
npm test
```

**Server-side**:

The `test.py` python file can be used to run all the tests, running `pylint`, `mypy`, and `pytest`.
```bash
python test.py
```

A single tool (or a combination of these tools) can be run by specifying the name as an argument, e.g.:
```bash
python test.py pytest
python test.py mypy pylint
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
