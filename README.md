# Administration-panel

A web application for managing movies with role-based access control. The system allows users to view movies, while administrators can add, edit, and delete movies as well as manage users. Authentication is handled using JWT and session cookies for secure access.

## Table of Contents
* [Features](#features)
* [Technologies used](#technologies-used)
* [Setup](#setup)

## Features
1. Secure authentication system using JWT and session cookies.
2. Role-based access control (Admin vs. Regular User).
3. Admin functionalities:
* Create new users and administrators.
* Add, edit, and delete movies from the database.
4. User functionalities:
* View a list of available movies.
* Logout functionality with session invalidation.
5. Secure password storage (encrypted in the database).
6. REST API with authentication-based access control.
7. Two database tables:
* Users (name, surname, username, password, email, phone, isAdmin).
* Movies (or products, adaptable to various content).

## Technologies Used
Backend (IntelliJ, Java Spring Boot)
*Java: Version 17
*Spring Boot: Version 3.4
*Gradle: Build automation tool
*MySQL: Database

Frontend (WebStorm, Angular)
*Angular: Version 19

## Setup
### 1. Clone the repository
```
git clone git@github.com:KacGas/Administration-panel.git
cd spa-project
```
### 2. Run the Application
Use Postman to register an admin via (this endpoint can be deleted after the first admin is created):
```
POST http://localhost:8080/api/auth/register
```
