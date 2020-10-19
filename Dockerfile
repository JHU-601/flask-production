FROM debian:stable AS base

# Install standard apt packages
RUN apt-get update -y && \
  apt-get install -y curl python3 python3-pip nginx 
# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN pip3 install pipenv

FROM base AS dev
RUN apt-get install -y vim

FROM base AS prod

COPY . /app
WORKDIR /app

RUN addgroup --system nginx && \
    adduser --system --disabled-login --ingroup nginx --no-create-home --home /nonexistent --gecos "nginx user" --shell /bin/false nginx

COPY nginx.conf /etc/nginx/nginx.conf
RUN nginx -t

# Install Python dependencies
RUN pipenv install --dev
# Install JavaScript dependencies
RUN npm install

COPY entrypoint.sh /root/entrypoint.sh

ENTRYPOINT [ "sh", "/root/entrypoint.sh" ]
