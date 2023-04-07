FROM node

WORKDIR /app/BE_Notification_Service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

# Use for deploy ( production)
CMD ["npm", "start"]
