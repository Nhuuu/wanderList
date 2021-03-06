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
* Built out edit profile functionality.


#### Backlog
* Add buttons need to be adjusted for flow.
* Include calendar for when user is estimated to go.
* Scrape data on the best times to go for each destination.
* Include a map API with markers for destinations.
* Include checkboxes instead of add buttons to add all points of interest.
* Share itinerary with friends functionality.

## Routes and Models
* Routes

| CRUD     | Route                | Function                                                         |
|----------|----------------------|------------------------------------------------------------------|
| `GET`    | `/`                  | home page                                                        |
| `GET`    |  `/auth/login`       | renders login page                                               |
| `POST`   | `/auth/login`        | signs in existing user                                           |
| `GET`    | `/auth/signup`       | renders sign up page                                             |
| `POST`   | `/auth/signup`       | creates new user in database                                     |
| `GET`    | `/auth/logout`       | logs out user                                                    | 
| `GET`    | `/myList`            | loads all user's places                                          |
| `GET`    | `/show/:id`          | loads individual place                                           |
| `DELETE` | `/myList/delete-poi/:id`|deletes point of interest from place                           |
| `DELETE` | `/myList/:id`        | deletes place from user           								 |                             
| `GET`    | `/search`     		  | get the search-results page      								 |
| `GET`    | `/search/results`    | runs query using Google and Yelp API based on user input         |
| `POST`   | `/search/add`        | adds place tp user                       			             |
| `POST`   | `/search/add-poi`    | adds point of interest to place                                  |
| `GET`    | `/profile`           | display's user profile.                                          |
| `GET`    | `/profile/edit`      | Show edit page for profile                                 			 |   
| `PUT`    | `/profile/edit/:id`  | edits user's profile                                 			 |



* Models

| Model   | Schema         	| Assocations                                                          |
|--------------------------------------------------------------------------------------------------|
| Place   | description, lng, lat, image | Has many poi(points of interest), belongs to many users |
| Poi(points of interest)| name, categories, image, rating, url, numReviews, placeId | Belongs to many placeUsers|
| User    | firstname, lastname, email, password, image, bio, dob                    | Belongs to many places|
| placeUser | userId, placeId                                                        | Belongs to many pois|
| placeUserPoi | placeUserPlaceId, poiId                                                  | 


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
* Main-image sources: wikimedia.org, abcnews.com



