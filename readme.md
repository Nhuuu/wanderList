# WanderList

## https://my-pwanderlist.herokuapp.com
WanderList allows you to keep track and plan multiple places at once. A sort-of travel bucket list.  

![] Image 
![] mobile img

## How to use?
* Sign up/Log in.
* Go to the Search page.
* Type in a city or country to get started.
* Add the destination and then add attractions that you'd like to partake in.
* Go to "My List" to view all of your saved destinations.
* Click each destination to go view all of the attractions you have added.


## Requirements
* Build a full stack Node app with at least 2 models
* Include sign up/log in functionality with hashed passwords and authorization.
* Incorporate at least one API/web scraping
* Have RESTful routes
* Utilize an ORM to create a database table structure
* Have DRY code
* Deploy online

## Technologies used
* Modules:
	* Node/Express
	* body-parser
	* dotenv
	* express-session
	* Passport
	* Bcryptjs
	* PostgreSQL
	* Sequelize 
	* connect-flash
	* request
	* yelp-fusion
* Other:
	* jQuery
	* MaterializeCSS


# API References:
* Google Places
* Yelp
* mapbox

## User Stories
Target user for this app are travel enthusiasts who need guidance on what to do at a specific destination. These are people who enjoy traveling, eating, and going to popular, tried and true attractions.


## Sprints and Process

### Sprint 1
* Planned out features and functionality
* Developed wireframes for each page
* Researched APIs to use and reviewed documentation
* Stubbed out Routes and Set up Models
* Got database running with models and associations
* Setup Auth

### Sprint 2
* Built out key pages for profile, search-results and show page.
* Integrated Google Places to retrieve photos of place and Yelp APIs to get points of interest
* Completed routes with get, post, put, and delete functionality
   * Users can add/delete places and add/delete points of interest


### Sprint 3
* Built out CSS further for subpages

### Sprint 4


#### Backlog


## Routes and Models
* Routes

| CRUD     | Route                | Function                                                         |
|----------|----------------------|------------------------------------------------------------------|
| `GET`    | `/`                  | home page                                     |
| `GET`    |  `/auth/login`       | renders login page                                               |
| `POST`   | `/auth/login`        | signs in existing user                                           |
| `GET`    | `/auth/signup`       | renders sign up page                                             |
| `POST`   | `/auth/signup`       | creates new user in database                                     |
| `GET`    | `/auth/logout`       | logs out user                                                    | 
| `GET`    | `/profile`            | loads all user's places                                        |
| `GET`    | `/show/:id`        | loads individual place                                           |
| `DELETE`   | `/profile/delete-poi/:id`            |deletes point of interest from place                       |
| `DELETE` | `/profile/:id`        | deletes place from user           |
| `GET`    | `/search`     | get the search-results page      |
| `GET`    | `/search/results`   | runs query using Google and Yelp API based on user input |
| `POST`   | `/search/add`          | adds place tp user                               |
| `post` | `/search/add-poi`      | adds point of interest to place                                      

* Models

| Model   | Schema                                                                   | Assocations                                    |
|---------|--------------------------------------------------------------------------|------------------------------------------------------------------|
| Place | description, lng, lat, image                           | Has many poi(points of interest), belongs to many users                                |                                          |
| Poi(points of interest)   | name, categories, image, rating, url, placeId | Belongs to places                                        |
| User    | firstname, lastname, email, password                     | Belongs to many places

## Steps to Set Up
If you'd like to set this project up on your own local server:
* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start your application
* Create .env file, which will need to include:
  * `SESSION_SECRET` (you determine this)
  * `DATABASE_URL` (where you will deploy the site)
  * A Google API Key (you will need to get this from google's API)
  * A Yelp API Key (you will need to get this from yelp's API)


## Credits 
* Here's where to put main-page photo sources.



