FROM node:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY  . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]

# Docker port forwarding command: docker run -p 5000:8080 <image-name> localhost:5000