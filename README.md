# Administration-panel

This project is a Single Page Application (SPA) built using Java and Spring Boot. The primary objective is to demonstrate a modern web application using Java 17.0.9 and Spring Boot 3.2.5, leveraging the powerful development tools provided by JetBrains.

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
* Backend (IntelliJ, Java Spring Boot)
Java: Version 17
Spring Boot: Version 3.4
Gradle: Build automation tool
MySQL: Database

* Frontend (WebStorm, Angular)
Angular: Version 19

## Setup
### 1. Clone the repository
```
git clone git@github.com:KacGas/Single-Page-Application.git
cd spa-project
```
### 2. Install Dependencies
Ensure you have Maven and JDK 17 installed. Then, install the dependencies:
```
mvn clean install
```
### 3. Run the Application
Start the Spring Boot application:
```
mvn spring-boot:run
```
### 3. Run the Application
Use Postman to register an admin via (this endpoint can be deleted after the first admin is created):
```
POST http://localhost:8080/api/auth/register
```
