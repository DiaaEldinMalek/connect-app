FROM node:18-alpine AS builder
LABEL email=diaamalek3@gmail.com

WORKDIR /connect-app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

################
FROM node:18-alpine

WORKDIR /connect-app       

COPY --from=builder /connect-app/node_modules ./node_modules 
COPY --from=builder /connect-app/package*.json ./            
COPY --from=builder /connect-app/dist ./dist 

ENV NODE_ENV=production            
EXPOSE 3000                        
CMD ["npm", "run", "start:prod"]   