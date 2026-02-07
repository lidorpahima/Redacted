# Debian-based image: Prisma engines work reliably (Alpine/musl often causes "not compatible with your system")
FROM node:18-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Prisma generate (schema already in image; DATABASE_URL can be set at runtime)
RUN npx prisma generate

EXPOSE 3000

# Dev: hot reload. For production use: npm run build && npm start
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
