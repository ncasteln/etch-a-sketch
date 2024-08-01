NAME			:=	etch-a-sketch
IMG_NAME		:=	$(NAME)-img
CONT_NAME		:=	$(NAME)-cont

# colors
G	:=	\033[0;32m
Y	:=	\033[0;33m
B	:=	\033[0;34m
R	:=	\033[0;31m
W	:=	\033[0m
N	:=	\033[1;30m

.PHONY: up down build check display rm rm-img stop bash

######################################################################
up: build
	@echo "$(G)* Composing up...$(W)";
	@docker compose up -d;

build:
	@echo "$(G)* Composing build...$(W)";
	@docker compose build;

down:
	@echo "$(G)* Composing down...$(W)";
	@docker compose down;

# checker for running
check:
	@if [ $$(docker ps -a --filter "status=running" | grep $(CONT_NAME) | wc -l) -ge 1 ]; then \
		echo "$(G)* $(NAME) is running$(W)"; \
	else \
		echo "$(R)* $(NAME) not running$(W)"; \
	fi

# checker for running
bash:
	@if [ $$(docker ps -a --filter "status=running" | grep $(CONT_NAME) | wc -l) -ge 1 ]; then \
		docker exec -it $(CONT_NAME) /bin/bash; \
	else \
		echo "$(R)* $(NAME) not running$(W)"; \
	fi

# cleanings for the current project
stop:
	@if [ $$(docker ps -a --filter "status=running" | grep $(CONT_NAME) | wc -l) -ge 1 ]; then \
		docker stop $(CONT_NAME) >/dev/null; \
		echo "$(G)* Container stopped$(W)"; \
	else \
		echo "$(N)* Nothing to stop$(W)"; \
	fi

rm:
	@if [ $$(docker ps -a --filter "status=running" | grep $(CONT_NAME) | wc -l) -ge 1 ]; then \
		echo "$(R)* Container is running, first stop it$(W)"; \
		exit 1; \
	fi
	@if [ $$(docker ps -a | grep $(CONT_NAME) | wc -l) -ge 1 ]; then \
		docker rm $(CONT_NAME) >/dev/null; \
		echo "$(G)* Container removed$(W)"; \
	else \
		echo "$(N)* No container to remove$(W)"; \
	fi

rm-img: rm
	@if [ $$(docker images | grep $(IMG_NAME) | wc -l) -ge 1 ]; then \
		docker rmi -f $$(docker images -a --quiet); \
		echo "$(G)* Image removed$(W)"; \
	else \
		echo "$(N)* No image to remove$(W)"; \
	fi

# clean-vol:
# 	@if [ $$(docker volume ls --quiet | wc -l) -ge 1 ]; then \
# 		docker volume rm $$(docker volume ls --quiet); \
# 		echo "$(G)* All volumes removed$(W)"; \
# 	else \
# 		echo "$(N)* No volumes to remove$(W)"; \
# 	fi

# clean-net:
# 	@if [ $$(docker network ls --quiet | wc -l) -gt 3 ]; then \
# 		docker network rm $$(docker network ls --quiet); \
# 		echo "$(G)* All custom networks removed$(W)"; \
# 	else \
# 		echo "$(N)* No custom networks to remove$(W)"; \
# 	fi

fclean: stop rm-img

display:
	@echo "$(B)------------------------ IMAGES ------------------------$(W)";
	@if [ $$(docker images -a --quiet | wc -l) -ge 1 ]; then \
		docker images -a; \
	else \
		echo "$(N)* No images to display$(W)"; \
	fi

	@echo "$(B)---------------------- CONTAINERS ----------------------$(W)";
	@if [ $$(docker ps -a --quiet | wc -l) -ge 1 ]; then \
		docker ps -a; \
	else \
		echo "$(N)* No containers to display$(W)"; \
	fi

	@echo "$(B)------------------------ VOLUMES -----------------------$(W)";
	@if [ $$(docker volume list | wc -l) -gt 1 ]; then \
		docker volume list; \
	else \
		echo "$(N)* No volumes to display$(W)"; \
	fi

	@echo "$(B)------------------------ NETWORKS ----------------------$(W)";
	@if [ $$(docker network list | wc -l) -gt 1 ]; then \
		docker network list; \
	else \
		echo "$(N)* No networks to display$(W)"; \
	fi
