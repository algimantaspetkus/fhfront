# Introduction

GroupHub is an application built on React and Node.js that allows various groups of people, such as families, friend circles, and clubs, to create private groups. Within these groups, users can collaborate and manage task lists, shopping lists, event details, and other shared information efficiently and securely.

# Getting Started

## Requirements

- The latest version of [Node.js](https://nodejs.org/en) `(at least v18.15.0)`
- [MongoDB](https://www.mongodb.com/)

## Back End application

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

## Front End application

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

Sign Up

Endpoint: POST [base_url]/signup

Parameters:
Parameter Type Description
email string Required. The email address of the user.
password string Required. The password chosen by the user.
displayName string Required. The display name or username.
Sign In

Endpoint: POST [base_url]/signin

Parameters:
Parameter Type Description
email string Required. The email address of the user signing in.
password string Required. The password provided by the user for authentication.

Create a New Group

Endpoint: POST [base_url]/addgroup

Parameters:
Parameter Type Description
name string Required. The name of the new group.
Disable a Group

Endpoint: POST [base_url]/disablegroup

Parameters:
Parameter Type Description
groupId string Required. The ID of the group to disable.
Leave a Group

Endpoint: POST [base_url]/leavegroup

Parameters:
Parameter Type Description
groupId string Required. The ID of the group to leave.
Join a Group

Endpoint: POST [base_url]/joingroup

Parameters:
Parameter Type Description
secret string Required. The secret code of the group to join.
Get List of Group Members

Endpoint: GET [base_url]/getListMembers/:listId

Parameters:
Parameter Type Description
listId string Required. The ID of the list to get group members from.
Get Group Secret

Endpoint: GET [base_url]/getgroupsecret/:groupId

Parameters:
Parameter Type Description
groupId string Required. The ID of the group to get the secret.
Get List of Groups

Endpoint: GET [base_url]/getgroups

Update Display Name

Endpoint: PUT [base_url]/updatedisplayname

Parameters:
Parameter Type Description
displayName string Required. The new display name for the user.
Change Password

Endpoint: PUT [base_url]/updatepassword

Parameters:
Parameter Type Description
oldPassword string Required. The current password.
newPassword string Required. The new password for the user.
Update Avatar

Endpoint: PUT [base_url]/updateavatar

Parameters:
Parameter Type Description
avatar file Required. The new avatar image file to upload.
Update Default Group

Endpoint: PUT [base_url]/updatedefaultgroup

Parameters:
Parameter Type Description
newDefaultGroup string Required. The ID of the new default group.
Get User

Endpoint: GET [base_url]/check

Add Item List

Endpoint: POST [base_url]/add

Parameters:
Parameter Type Description
listTitle string Required. The title of the new list.
isPrivate boolean Required. Specify if the list is private.
Make Item List Public

Endpoint: PUT [base_url]/makepublic

Parameters:
Parameter Type Description
itemListId string Required. The ID of the list to modify.
Disable Item List

Endpoint: PUT [base_url]/disable

Parameters:
Parameter Type Description
itemListId string Required. The ID of the list to disable.
Get Item List

Endpoint: GET [base_url]/list

Add Task Item

Endpoint: POST [base_url]/addtask

Parameters:
Parameter Type Description
itemListId string Required. The ID of the task item list to add the task to.
taskTitle string Required. The title of the task.
taskDescription string The description of the task.
assignedToUser string The ID of the user to whom the task is assigned.
dueBy date The due date for the task.
priority number The priority of the task (0 to 100).
Get Task Items

Endpoint: GET [base_url]/tasks/:itemListId

Parameters:
Parameter Type Description
itemListId string Required. The ID of the task item list.
Update Task Item

Endpoint: PUT [base_url]/update

Parameters:
Parameter Type Description
taskId string Required. The ID of the task.
data object Required. The updated task data.
Delete Task Item

Endpoint: DELETE [base_url]/:taskId

Parameters:
Parameter Type Description
taskId string Required. The ID of the task.
Get Task Item Details

Endpoint: GET [base_url]/:taskId

Parameters:
Parameter Type Description
taskId string Required. The ID of the task.
