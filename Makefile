#dev

build:
	cd client && ${MAKE} build
	cd server && ${MAKE} build

run:
	docker-compose -f docker-compose-dev.yml up

stop:
	docker-compose -f docker-compose-dev.yml down

remove:
	docker-compose -f docker-compose-dev.yml down --volumes

hard-remove:
	docker-compose -f docker-compose-dev.yml down --volumes
	docker image rm curie-node-server curie-react-client