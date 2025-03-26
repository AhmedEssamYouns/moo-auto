# Build Stage
FROM node:18 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Prevent React from generating source maps (hides JSX source)
ENV CI=true
ENV GENERATE_SOURCEMAP=false

# Build the React project
RUN npm run build

# Install JavaScript Minifier and Obfuscator
RUN npm install -g terser javascript-obfuscator

# Minify and Obfuscate JavaScript
RUN find build/static/js -type f -name "*.js" -exec terser {} --compress --mangle --output {} \;
RUN find build/static/js -type f -name "*.js" -exec javascript-obfuscator --compact true --output {} \;

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
