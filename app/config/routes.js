/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  'post /createschema': {
    controller: 'SchemaController',
    action: 'createSchema'
  },
  'get /listschema': {
    controller: 'SchemaController',
    action: 'listSchema'
  },



  'post /savevalueform/:id': {
    controller:'FormValueController',
    action:'saveValueForm'
  },




  'get /refreshToken': {
    controller: 'TokenController',
    action: 'refreshToken'
  },

  'post /createform': {
    controller: 'FormController',
    action: 'createForm'
  },
  'get /listform': {
    controller: 'FormController',
    action: 'listForm'
  },
  'delete /deleteform/:id': {
    controller: 'FormController',
    action: 'deleteForm'
  },
  'get /findform/:id': {
    controller: 'FormController',
    action: 'findForm'
  },
  'post /updateform/:id': {
    controller: 'FormController',
    action: 'updateForm'
  },

  'get /users/logout': {
    controller: 'UsersController',
    action: 'logout'
  },

  'post /users/register': {
    controller: 'UsersController',
    action: 'register'
  },

  'post /users/login': {
    controller: 'UsersController',
    action: 'login'
  },
  'get /users/listusers': {
    controller: 'UsersController',
    action: 'listusers'
  },

  'get /checkAuth':{
    controller: 'UsersController',
    action: 'checkAuth'
  },

  'get /listStudent': {
    controller:'StudentController',
    action: 'listStudent'
  },

  'post /createStudent': {
    controller:'StudentController',
    action: 'createStudent'
  },
  'post /editStudent/:id': {
    controller:'StudentController',
    action: 'editStudent'
  },

  'delete /student/:id': {
    controller: 'StudentController',
    action: 'deleteStudent'
  },

  'get /student/searchInfo': {
    controller: 'StudentController',
    action: 'searchInfo'
  },

  'post /student/uploadAvatar/:id': {
    controller: 'StudentController',
    action: 'uploadAvatar'
  },

  'post /createClass': {
    controller:'ClassController',
    action: 'createClass'
  },
  'post /editClass/:id': {
    controller:'ClassController',
    action: 'editClass'
  },

  'delete /deleteClass/:id': {
    controller: 'ClassController',
    action: 'deleteClass'
  },

  'get /listClass/':{
    controller: 'ClassController',
    action: 'listClass'
  },

  'post /student/addClass/:id' : {
    controller: 'StudentController',
    action: 'addClass'
  },

  'get /authentication/user/active/:id':{
    controller: 'UsersController',
    action: 'useractive'
  }

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // 'get /api/users': 'UsersController.login',
  // 'get /api/random-quote': 'QuoteController.getQuote',
  // 'get /api/protected/random-quote': 'QuoteController.getProtectedQuote'



};
