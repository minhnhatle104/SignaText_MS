FROM node

WORKDIR /app/BE_Document_Service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5050

# Use for deploy ( production)
CMD ["npm", "start"]
