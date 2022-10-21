sudo docker stop ts-bot

sudo docker rm ts-bot

sudo docker rmi -f ts-bot/node-web

sudo docker build -t ts-bot/node-web -f Dockerfile .