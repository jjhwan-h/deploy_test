FROM node:16


COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
RUN yarn install

#RUN mkdir myfolder
COPY . /myfolder/

CMD yarn start:dev