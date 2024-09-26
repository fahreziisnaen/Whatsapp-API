# Gunakan base image node yang sesuai
FROM node:18-bullseye-slim

# Install dependencies yang dibutuhkan oleh Puppeteer dan git
RUN apt-get update && apt-get install -y \
    git \
    libnss3 \
    libxss1 \
    libasound2 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    fonts-liberation \
    libappindicator3-1 \
    lsb-release \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy files ke container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh project
COPY . .

# Jalankan server
CMD ["npm", "run", "start-server"]

