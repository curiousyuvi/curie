#dev

build:
	cd client && ${MAKE} build
	cd server && ${MAKE} build

run:
	docker-compose -f docker-compose-dev.yml up

stop:
	docker-compose -f docker-compose-dev.yml stop

remove:
	docker-compose -f docker-compose-dev.yml down --volumes