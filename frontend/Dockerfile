FROM node:alpine

RUN mkdir -p /app

COPY ./ /app/frontend

WORKDIR /app/frontend
RUN npm init -y
RUN npm install
RUN npm run build

EXPOSE $PORT

# Set host to localhost / the docker image
ENV NUXT_HOST=0.0.0.0
# Set app port
ENV NUXT_PORT=$PORT
# Set the base url
ENV PROXY_API=$PROXY_API
# Set the browser base url
ENV PROXY_LOGIN=$PROXY_LOGIN

# CMD [ "npm", "start" ]
CMD [ "tail", "-f" ]
