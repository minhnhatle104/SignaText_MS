FROM node

WORKDIR /app/BE_Authentication_Service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

# Use for deploy ( production)
CMD ["npm", "start"]