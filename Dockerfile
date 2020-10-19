FROM debian:stable
COPY . /app

# Install standard apt packages
RUN apt-get update -y && \
  apt-get install -y curl vim git python3 python3-pip python3-dev
# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app


# Install Python dependencies
RUN pip3 install -r requirements.txt
# Install JavaScript dependencies
RUN npm install

RUN npm link gulp

# Install gulp for global use
# RUN npm install -g gulp

COPY . /app
ENTRYPOINT [ "python3" ]
CMD [ "clueless/server.py" ]
