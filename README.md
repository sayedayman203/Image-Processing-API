# Image-Processing-API

> default format for all images is jpeg `POST image can be any image format`

> there is no ui `Postman collection provided`

## prerun

- `.env.template` --> `.env`

- create folder or run `node create-structure.js`:

  - ./public/imgs/full
  - ./public/imgs/custom
  - ./public/imgs/thumbnail
  - ./logs

- `npm i`

## Scripts

| Script     | Description                                    |
| ---------- | ---------------------------------------------- |
| start      | start server                                   |
| start:prod | build & start                                  |
| start:dev  | start dev mode                                 |
| build      | build project to ./dist                        |
| lint       | run ESLint                                     |
| lint:f     | run ESLint and fix                             |
| prettier   | run prettier `lint configered to run prettier` |
| jasmine    | run test `need to build`                       |
| test       | build & test                                   |

## End Points

[Postman collection](https://www.getpostman.com/collections/a8c0c0715ba058605ccc)