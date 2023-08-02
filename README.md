# Introduction

GroupHub is an application built on React and Node.js that allows various groups of people, such as families, friend circles, and clubs, to create private groups. Within these groups, users can collaborate and manage task lists, shopping lists, event details, and other shared information efficiently and securely.

## Some features

- User registration and authentication
- Authorization through **jwt** bearer tokens
- Password encryption using **bcrypt**
- Uses websocket library **Socekt.IO** to sinchronize data between the users in real time

# Getting Started

## Requirements

- The latest version of [Node.js](https://nodejs.org/en) `(at least v18.15.0)`
- [MongoDB](https://www.mongodb.com/)

## Running the Back End

Navigate to the place you want your backend application to be, clone it and then install the required packages

```
    cd C:\nodejs
    git clone https://github.com/algimantaspetkus/fhback
    cd fhback
    npm install
```

Rename the `example.env` in windows `ren example.env .env` or `mv example.env .env` on linux.

Edit the file, and provide your MongoDB credentials and a secret key for JWT generation. You can change the port if needed.

```
    USER=yourmongodbusername
    PWD=yourmongodbpassword
    HOST=nongodbhost
    JWT=jwtsecretkey
    PORT=8080
```

To start your back end application

```
    npm start
```

If everything works, you should secret

```
    Server is listening on port 8080
    Connected to MongoDB
```

## Running Front End

Navigate to the place you want your backend application to be, clone it and then install the required packages

```
    cd C:\nodejs
    git clone https://github.com/algimantaspetkus/fhfront
    cd fhfront
    npm install
```

Rename the `example.env` in windows `ren example.env .env` or `mv example.env .env` on linux.

Edit the file, and provide the backend server IP address and the port. If you are going to use it on your local machine, you can leave the localhost, change the port if needed.

```
    REACT_APP_BASE_SERVER=http://localhost:8080
```

To start your front end application

```
    npm start
```

## Dependencies

### Back End

- bcryptjs: "^2.4.3"
- cors: "^2.8.5"
- dotenv: "^16.1.1"
- express: "^4.18.2"
- joi: "^17.9.2"
- jsonwebtoken: "^9.0.0"
- mongoose: "^7.2.2"
- multer: "^1.4.5-lts.1"
- nodemon: "^2.0.22"
- socket.io: "^4.7.1"

### Front End

- @emotion/react: "^11.11.0"
- @emotion/styled: "^11.11.0"
- @fortawesome/fontawesome-svg-core: "^6.4.0"
- @fortawesome/free-regular-svg-icons: "^6.4.0"
- @fortawesome/free-solid-svg-icons: "^6.4.0"
- @fortawesome/react-fontawesome: "^0.2.0"
- @mui/icons-material: "^5.11.16"
- @mui/lab: "^5.0.0-alpha.132"
- @mui/material: "^5.13.3"
- @mui/x-date-pickers: "^6.10.0"
- @reduxjs/toolkit: "^1.9.5"
- @testing-library/jest-dom: "^5.16.5"
- @testing-library/react: "^13.4.0"
- @testing-library/user-event: "^13.5.0"
- axios: "^1.4.0"
- dayjs: "^1.11.9"
- notistack: "^3.0.1"
- react: "^18.2.0"
- react-dom: "^18.2.0"
- react-long-press: "^0.1.6"
- react-redux: "^8.1.1"
- react-router-dom: "^6.11.2"
- react-scripts: "5.0.1"
- redux: "^4.2.1"
- socket.io-client: "^4.7.1"
- web-vitals: "^2.1.4"

# API Documentation

All requests except for the `auth` route, should have an Authorization header with a bearer token. You can authenticate and receive the token using the `/api/auth/signin` route.

## Sign Up

Endpoint: `POST /api/auth/signup`

Parameters:

| Parameter   | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| email       | string | Required. The email address of the user.   |
| password    | string | Required. The password chosen by the user. |
| displayName | string | Required. The display name or username.    |

## Sign In

Endpoint: `POST /api/auth/signin`

Parameters:

| Parameter | Type   | Description                                                     |
| --------- | ------ | --------------------------------------------------------------- |
| email     | string | Required. The email address of the user signing in.             |
| password  | string | Required. The password provided by the user for authentication. |

## Create a New Group

Endpoint: `POST /api/group/addgroup`

Parameters:

| Parameter | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| name      | string | Required. The name of the new group. |

## Delete a Group

Endpoint: `POST /api/group/disablegroup`

Parameters:

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| groupId   | string | Required. The ID of the group to disable. |

## Leave a Group

Endpoint: `POST /api/group/leavegroup`

Parameters:

| Parameter | Type   | Description                             |
| --------- | ------ | --------------------------------------- |
| groupId   | string | Required. The ID of the group to leave. |

## Join a Group

Endpoint: `POST /api/group/joingroup`

Parameters:

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| secret    | string | Required. The secret code of the group to join. |

## Get List of Group Members

Endpoint: `GET /api/group/listmembers/:listId`

Parameters:

| Parameter | Type   | Description                                             |
| --------- | ------ | ------------------------------------------------------- |
| listId    | string | Required. The ID of the list to get group members from. |

## Get Group Secret

Endpoint: `GET /api/group/groupsecret/:groupId`

Parameters:

| Parameter | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| groupId   | string | Required. The ID of the group to get the secret. |

## Get List of Groups

Endpoint: `GET /api/group/getgroups`

## Update Display Name

Endpoint: `PUT /api/user/updatedisplayname`

Parameters:

| Parameter   | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| displayName | string | Required. The new display name for the user. |

## Change Password

Endpoint: `PUT /api/user/updatepassword`

Parameters:

| Parameter   | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| oldPassword | string | Required. The current password.          |
| newPassword | string | Required. The new password for the user. |

## Update Avatar

Endpoint: `PUT /api/user/updateavatar`

Parameters:

| Parameter | Type | Description                                    |
| --------- | ---- | ---------------------------------------------- |
| avatar    | file | Required. The new avatar image file to upload. |

## Update Default Group

Endpoint: `PUT /api/user/updatedefaultgroup`

Parameters:

| Parameter       | Type   | Description                                |
| --------------- | ------ | ------------------------------------------ |
| newDefaultGroup | string | Required. The ID of the new default group. |

## Get User

Endpoint: `GET /api/user/check`

## Add Item List

Endpoint: `POST /api/tasklist/add`

Parameters:

| Parameter | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| listTitle | string  | Required. The title of the new list.      |
| isPrivate | boolean | Required. Specify if the list is private. |

## Make Item List Public

Endpoint: `PUT /api/tasklist/makepublic`

Parameters:

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| itemListId | string | Required. The ID of the list to modify. |

## Delete Item List

Endpoint: `PUT /api/tasklist/disable`

Parameters:

| Parameter  | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| itemListId | string | Required. The ID of the list to disable. |

## Get Item List

Endpoint: `GET /api/tasklist/list`

## Add Task Item

Endpoint: `POST /api/task/addtask`

Parameters:

| Parameter       | Type   | Description                                                |
| --------------- | ------ | ---------------------------------------------------------- |
| itemListId      | string | Required. The ID of the task item list to add the task to. |
| taskTitle       | string | Required. The title of the task.                           |
| taskDescription | string | The description of the task.                               |
| assignedToUser  | string | The ID of the user to whom the task is assigned.           |
| dueBy           | date   | The due date for the task.                                 |
| priority        | number | The priority of the task (0 to 100).                       |

## Get Task Items

Endpoint: `GET /api/task/tasks/:itemListId`

Parameters:

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| itemListId | string | Required. The ID of the task item list. |

## Update Task Item

Endpoint: `PUT /api/task/update`

Parameters:

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| taskId    | string | Required. The ID of the task.    |
| data      | object | Required. The updated task data. |

## Delete Task Item

Endpoint: `DELETE /api/task/:taskId`

Parameters:

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| taskId    | string | Required. The ID of the task. |

## Get Task Item Details

Endpoint: `GET /api/task/:taskId`

Parameters:

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| taskId    | string | Required. The ID of the task. |

## Add Event Item

Adds a new task item to the task item list.

Endpoint: `POST /api/eventitem/additem`

Parameters:

| Parameter        | Type   | Description                                                                                      |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------ |
| eventTitle       | string | Required. The title of the task item.                                                            |
| eventDescription | string | The description of the task item.                                                                |
| eventDate        | date   | The due date for the task item.                                                                  |
| type             | string | The type of the task item (e.g., birthday, gift, medical, travel, graduation, party, pet, food). |

## Get Event Items

Retrieves the list of task items.

Endpoint: `GET /api/eventitem/getitems`

## Delete Event Item

Deletes a task item from the task item list.

Endpoint: `DELETE /api/eventitem/deleteitem/:eventItemId`

Parameters:

| Parameter   | Type   | Description                        |
| ----------- | ------ | ---------------------------------- |
| eventItemId | string | Required. The ID of the task item. |
