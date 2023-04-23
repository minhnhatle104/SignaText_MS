FROM node:20

WORKDIR /app/BE_Signature_Service

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 3000

# Use for deploy ( production)
CMD ["npm", "start"]