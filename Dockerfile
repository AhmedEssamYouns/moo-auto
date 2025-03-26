# Build Stage
FROM node:18 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Build the project
ENV CI=true
RUN npm run build

# Install JavaScript Obfuscator
RUN npm install -g javascript-obfuscator

# Minify and Obfuscate JavaScript
RUN find build/static/js -type f -name "*.js" -exec terser {} --compress --mangle --output {} \;
RUN find build/static/js -type f -name "*.js" -exec javascript-obfuscator {} --output {} \;

# Serve with Nginx
FROM nginx:alpine

# Copy built React files to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
