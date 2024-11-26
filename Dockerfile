# Set the base image
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# expose 5173
EXPOSE 5173

# start the dev server
CMD ["npm", "run", "dev"]

