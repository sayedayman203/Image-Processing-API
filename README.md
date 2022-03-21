# Image-Processing-API

> default format for all images is jpeg `POST image can be any image format`

> there is no ui `Postman collection provided`

## start

- `npm i`
- for development `npm run start:dev`
- for production `npm run start:prod`

## Scripts

| Script     | Description                                    |
| ---------- | ---------------------------------------------- |
| start      | start server `run build first`                 |
| start:prod | build & start                                  |
| start:dev  | start dev mode                                 |
| build      | build project to ./dist                        |
| lint       | run ESLint                                     |
| lint:f     | run ESLint and fix                             |
| prettier   | run prettier `lint configered to run prettier` |
| jasmine    | run test `need to build`                       |
| test       | build & test                                   |

# End Points

# image-proccessing-api

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->

1. [get thumbnail](#1-get-thumbnail)
   1. [SUCCESS](#i-example-request-success)
   1. [404](#ii-example-request-404)
1. [get image](#2-get-image)
   1. [SUCCESS](#i-example-request-success-1)
   1. [Wrong Params](#ii-example-request-wrong-params)
   1. [404](#iii-example-request-404)
1. [upload image](#3-upload-image)
   1. [Wrong Format](#i-example-request-wrong-format)
   1. [img Missing](#ii-example-request-img-missing)
   1. [SUCCESS](#iii-example-request-success)
1. [get images](#4-get-images)
   1. [get random images](#i-example-request-get-random-images)

## Variables

| Key  | Value                     | Type   |
| ---- | ------------------------- | ------ |
| host | http://localhost:3000     | string |
| img  | fjord.jpeg                | string |
| API  | http://localhost:3000/api | string |

## Endpoints

---

### 1. get thumbnail

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{host}}/{{img}}
```

**_More example Requests/Responses:_**

#### I. Example Request: SUCCESS

**_Body: None_**

#### I. Example Response: SUCCESS

```js
Response with img
```

**_Status Code:_** 200

<br>

#### II. Example Request: 404

**_Body: None_**

#### II. Example Response: 404

```js
{
    "status": "fail",
    "data": "Not Found"
}
```

**_Status Code:_** 404

<br>

### 2. get image

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API}}/{{img}}
```

**_More example Requests/Responses:_**

#### I. Example Request: SUCCESS

**_Query:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| width  | 800   |             |
| height | 400   |             |

**_Body: None_**

#### I. Example Response: SUCCESS

```js
Response with img
```

**_Status Code:_** 200

<br>

#### II. Example Request: Wrong Params

**_Query:_**

| Key    | Value | Description |
| ------ | ----- | ----------- |
| width  | asd   |             |
| height | -400  |             |

**_Body: None_**

#### II. Example Response: Wrong Params

```js
{
    "status": "fail",
    "data": [
        {
            "value": "asd",
            "msg": "NUMBER_MIN_0",
            "param": "width"
        },
        {
            "value": "-400",
            "msg": "NUMBER_MIN_0",
            "param": "height"
        }
    ]
}
```

**_Status Code:_** 400

<br>

#### III. Example Request: 404

**_Body: None_**

#### III. Example Response: 404

```js
{
    "status": "fail",
    "data": "Not Found"
}
```

**_Status Code:_** 404

<br>

### 3. upload image

**_Endpoint:_**

```bash
Method: POST
Type: FORMDATA
URL: {{API}}/
```

**_Body:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| img |       |             |

**_More example Requests/Responses:_**

#### I. Example Request: Wrong Format

**_Body:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| img |       |             |

#### I. Example Response: Wrong Format

```js
{
    "status": "fail",
    "data": "Please upload an image"
}
```

**_Status Code:_** 400

<br>

#### II. Example Request: img Missing

#### II. Example Response: img Missing

```js
{
    "status": "fail",
    "data": [
        {
            "msg": "REQUIRED",
            "param": "img"
        }
    ]
}
```

**_Status Code:_** 400

<br>

#### III. Example Request: SUCCESS

**_Body:_**

| Key | Value | Description |
| --- | ----- | ----------- |
| img |       |             |

#### III. Example Response: SUCCESS

```js
{
    "status": "success",
    "data": {
        "filename": "f5bc9587-984c-43ac-97ee-77a457e764e0.jpg"
    }
}
```

**_Status Code:_** 201

<br>

### 4. get images

**_Endpoint:_**

```bash
Method: GET
Type:
URL: {{API}}/
```

**_More example Requests/Responses:_**

#### I. Example Request: get random images

**_Body: None_**

#### I. Example Response: get random images

```js
{
    "status": "success",
    "data": [
        "04beb68e-b3cf-4bae-9d40-ea3feb0e2307.jpg",
        "1604beaa-5591-4231-941a-e8744f24f79d.jpg",
        "1b38528b-99f1-4f55-b214-a6af969fbf27.jpg",
        "3851eb83-f1e3-46d4-b91b-2623940f1947.jpg",
        "3cda7405-b5c7-458a-a676-c49394207ce2.jpg",
        "437bb067-e5ca-45cf-bdb7-d755ba850d95.jpg",
        "51369111-5e86-4ca4-bc09-d05f8bbf944d.jpg",
        "57c63776-400f-444b-a1b0-6b8cc2631fa0.jpg",
        "6a188308-6f4f-4016-b22f-b4a6e1474229.jpg",
        "7aba1f69-ea8e-477b-9212-2e40a7ec878c.jpg",
        "ba389c0a-484a-474b-b49e-49fde21fd142.jpg",
        "daa7e6b9-e508-4d96-845a-b13b401a91f3.jpg",
        "e4e72370-6fee-467c-968d-24991a36e063.jpg",
        "e8aaf1dc-c183-4809-ba9f-0c6b39445310.jpg",
        "f5bc9587-984c-43ac-97ee-77a457e764e0.jpg"
    ]
}
```

**_Status Code:_** 200

<br>

---

[Back to top](#image-proccessing-api)

> Generated at 2022-03-21 15:23:14 by [docgen](https://github.com/thedevsaddam/docgen)
