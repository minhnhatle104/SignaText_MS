FROM node

WORKDIR /app/BE_Signature_Service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# Use for deploy ( production)
# CMD ["npm", "start"]

# Use for development ( in localhost)
CMD [ "npm","run","dev" ]