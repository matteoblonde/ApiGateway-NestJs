# Create a primary Node Image to build the Production App
FROM node:18.12

# Setting Env Variables
# HOSTNAME
ARG HOST=${HOST}
ENV HOST=${HOST}

# Filemaker Database Login Username
ARG USERNAME=${USERNAME}
ENV USERNAME=${USERNAME}

# Filemaker Database Login Password
ARG PASSWORD=${PASSWORD}
ENV PASSWORD=${PASSWORD}

# Filemaker API Version
ARG API_VERSION=${API_VERSION}
ENV API_VERSION=${API_VERSION}

# Set the Working Directory
WORKDIR /src/app

# Copy the Package Descriptor
COPY package*.json ./

# Install the Dependencies
RUN npm install

# Copy all file from source to workdir
COPY . .

# Build
RUN npm run build

# Expose the Port used by Api Gateway
EXPOSE 26799

# Run the serve
CMD ["node", "dist/main"]
