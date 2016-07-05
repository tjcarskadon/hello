FROM node
RUN mkdir /letters
WORKDIR /letters
COPY package.json /letters
RUN npm install
COPY . /letters
EXPOSE 3000
CMD ["npm", "start"]