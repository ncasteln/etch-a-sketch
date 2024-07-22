# build stage
FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
	npm

# WORKDIR /app

# RUN npm install && npm cache clean --force
# COPY . .

# EXPOSE 3000

# COPY package*.json ./

ENTRYPOINT [ "tail", "-f" ]
