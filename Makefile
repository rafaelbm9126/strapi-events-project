.DEFAULT_GOAL := help

include .env.local
export  $(shell sed 's/=.*//' .env.local)

up:
	docker-compose up --no-build

restart:
	docker-compose restart

stop:
	docker-compose stop

logs:
	docker-compose logs --tail="all" --follow

bash:
	docker run -it --rm -v ${PWD}:/app -w /app node:latest bash

dependencies:
	docker run -it --rm  -v ${PWD}:/app -w /app node:latest npm i
