FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN cat <<EOF > /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Cross-Origin-Opener-Policy "same-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://res.cloudinary.com; media-src 'self' https://res.cloudinary.com; connect-src 'self' https://portofy-be-482363896451.asia-southeast2.run.app wss://portofy-be-482363896451.asia-southeast2.run.app; font-src 'self' data:; frame-ancestors 'none'; require-trusted-types-for 'script';" always;
    }
}
EOF
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]