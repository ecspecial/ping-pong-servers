## Table of Contents
- [English version](#english-version)
    - [Running with Docker](#running-with-docker)
    - [Running without Docker](#running-without-docker)
- [Русская версия](#русская-версия)
    - [Запуск с Docker](#запуск-с-docker)
    - [Запуск без Docker](#запуск-без-docker)

## English Version
# Ping Pong Servers

This project consists of two Fastify servers running in Docker containers that communicate with each other in a ping-pong manner. The sender server sends a 'ping' message to the receiver server, and the receiver server responds with a 'pong' message.

Sequence is initialized with receiver server by accessing sender '/start' endpoint. Sequence is repeated every 10 seconds and upon success logs 'Contract success'.

### Running with Docker
## Prerequisites

- Docker
- Docker Compose

## Local Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open Docker client or start Docker daemon in shell
4. Run the following command to build and start the Docker containers:

```shell
docker-compose up --build
```

## Successful contract completion example
```shell 
[+] Running 2/2
 ✔ Container sender    Recreated                                                                                   0.1s
 ✔ Container receiver  Recreated                                                                                   0.1s
Attaching to receiver, sender
sender    |
sender    | > sender_server@1.0.0 start
sender    | > node dist/sender.js
sender    |
sender    | Sender server running on http://0.0.0.0:3000
receiver  |
receiver  | > receiver_server@1.0.0 start
receiver  | > node dist/receiver.js
receiver  |
receiver  | Receiver server running on http://0.0.0.0:3001
sender    | Received /start request
sender    | Contract Success
receiver  | Sender server is online. Starting sequence.
sender    | Received /start request
sender    | Contract Success
```

### Running without Docker
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Uncomment '//Nodejs local configuration' and comment out 'Docker configuration' both in [sender.ts](sender/sender.ts) and in [receiver.ts](receiver/receiver.ts)
4. Install node packages both from sender and receiver folder using:

```shell
npm install
```
5. Run both servers from separate terminal windows using:

```shell
npm run start
```

Tech stack:
- TypeScript
- Fastify 
- Docker


## Русская версия

# Ping Pong Servers

Этот проект состоит из двух серверов Fastify, работающих в контейнерах Docker и взаимодействующих друг с другом в режиме пинг-понг. Sender отправляет сообщение 'ping' серверу-приемнику, а Receiver отвечает сообщением 'pong'.

Последовательность инициализируется с сервера Receiver, обращаясь к конечной точке Sender '/start'. Последовательность повторяется каждые 10 секунд и при успешном выполнении выводит в лог 'Contract success'.

### Запуск с Docker
## Для запуска необходимы:

- Docker
- Docker Compose

## Локальная настройка

1. Клонируйте репозиторий на локальную машину.
2. Перейдите в папку проекта.
3. Откройте клиент Docker или запустите Docker daemon в shell.
4. Выполните следующую команду для сборки и запуска Docker контейнеров:

```shell
docker-compose up --build
```

## Пример успешного запуска
```shell 
[+] Running 2/2
 ✔ Container sender    Recreated                                                                                   0.1s
 ✔ Container receiver  Recreated                                                                                   0.1s
Attaching to receiver, sender
sender    |
sender    | > sender_server@1.0.0 start
sender    | > node dist/sender.js
sender    |
sender    | Sender server running on http://0.0.0.0:3000
receiver  |
receiver  | > receiver_server@1.0.0 start
receiver  | > node dist/receiver.js
receiver  |
receiver  | Receiver server running on http://0.0.0.0:3001
sender    | Received /start request
sender    | Contract Success
receiver  | Sender server is online. Starting sequence.
sender    | Received /start request
sender    | Contract Success
```

### Запуск без Docker
### Running without Docker
1. Клонируйте репозиторий на локальную машину.
2. Перейдите в папку проекта.
3. Уберите комментарий '//Nodejs local configuration' и добавьте комментарий к 'Docker configuration' в обоих файлах [sender.ts](sender/sender.ts) и [receiver.ts](receiver/receiver.ts)
4. Установите npm модули из обеих папок sender и receiver:

```shell
npm install
```
5.Запустите оба сервера в разных терминалах при помощи команды:

```shell
npm run start
```

Использованные технологии:
- TypeScript
- Fastify 
- Docker
