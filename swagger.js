const m2s = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')


exports.options = {
  "components": {
    "schemas": { 
      User: m2s(User),
      Product: m2s(Product)
    }
  },
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Products CRUD API",
    "description": "E-shop API"
  },
  "contact": {
    "name": "API support",
    "url": "https://www.google.com",
    "email": "test1@aueb.gr"
  },
  "servers": [
    { url: 'http://localhost:3000', description: 'Local Server' },
    { url: 'https://example.com', description: 'Testing server' }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "API for users"
    },
    {
      "name": "Products",
      "description": "API for products"
    },
    {
      "name": "Users and Products",
      "description": "API for users and products"
    },
  ],
  "paths": {
    "/api/users": {
      "get": { 
        "tags": ["Users"],
        "summary": "Get all users",
        "responses": { 
          "200": { 
            "description": "STATUS CODE OK", 
            "schema": { "$ref": "#/components/schemas/User" },
            "content": { 
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Users"],
        "description": "Create a new user",
        "requestBody": {
          "description": "User that we want to create",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "password": { "type": "string" },
                  "name": { "type": "string" },
                  "surname": { "type": "string" },
                  "email": { "type": "string" },
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": { "type": "string" },
                      "road": { "type": "string" }
                    }
                  },
                  "phone": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "type": { "type": "string" },
                        "number": { "type": "string" }
                      }
                    } 
                  }
                },
                "required": ["username", "password", "email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "New user is"
          }
        }
      }
    },
    "/api/users/{username}": {
      "get" : {
        "tags": ["Users"],
        "parameters": [ 
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of a user that we want to find",
            "type": "string"
          }
        ],
        "description": "Get user with path parameter",
        "summary": "Get user with specific username",
        "responses": { "200": { "description": "User find", "schema": { "$ref": "#/components/schemas/User" } } }
      },
      "patch": {
        "tags": ["Users"],
        "description": "Update a user with a certain username",
        "parameters": [ 
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of a user that we want to update",
            "type": "string"
          }
        ],
        "summary": "Updating a user with the username as depicted in the path",
        "requestBody": {
          "description": "Data of the user that we want to update",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": " string" },
                  "name": { "type": "string" },
                  "surname": { "type": "string" },
                  "email": { "type": "string" },
                  "address": { 
                    "type": "object",
                    "properties": {
                      "area": { "type": "string"},
                      "road": { "type": "string"}
                    }
                  },
                  "phone": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "type": { "type": "string"},
                        "number": { "type": "string"},
                      }
                    }
                  }
                },
                "required": ["email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "User successfully updated",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      },
      "delete": {
        "tags": ["Users"],
        "description": "Delete a user from the database",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "Username of user that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Deleting user with username as given by the path parameter where the DELETE HTTP method is applied"
          }
        }
      }
     },
    "/api/user-products": {
      "get": {
        "tags": ["Users and Products"],
        "summary": "Get all users' products",
        "description": "DESCRIPTION of User and products URI GET",
        "responses": { "200": { "description": "OK", "schema": { "$ref": "#/components/schemas/User" } } }
      },
      "post": {
        "tags": ["Users and Products"],
        "description": "A description for the user-products",
        "requestBody": {
          "description": "The HTTP method POST has in body the following",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {"type": "string"},
                  "products": {
                    "type": "array",
                    "items": {
                      "type": "objects",
                      "properties": {
                        "product": { "type": "string" },
                        "cost": { "type": "number" },
                        "quantity": { "type": "number" }
                      }
                    }
                  }
                },
                "required": ["quantity"]
              }
            }
          }
        },
        "response": {
          "200": {
            "description": "New product is added"
          }
        }
      }
    },
    "/api/user-products/{username}":{
      "get": {
        "tags": ["Users and Products"],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "User's username to find the product",
            "type": "string"
          }
        ],
        "description": "DESCRIPTION TEXT",
        "summary": "SUMMARY TEXT",
        "responses": {
          "200": {
            "description": "All products for a given user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      },
      "patch": {
        "tags": ["Users and Products"],
        "description": "Update Users and Products",
        "requestBody": {
          "description": "Description for request body",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": { "type": "string" },
                  "product": {
                    "type": "object",
                    "properties": {
                      "_id": { "type": "string" },
                      "quantity": { "type": "number" }
                    }
                  }
                },
                "required": ["quantity"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success request"
          }
        }
      }
    },
    "/api/user-products/{username}/products/{product}": {
      "delete": {
        "tags": ["Users and Products"],
        "description": "Delete a product from a user",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "description": "the username of the user",
            "required": true
          },
          {
            "name": "product",
            "in": "path",
            "description": "Product name to delete from the user list",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Success response. Product deleted from the user's list."
          }
        }
      }
    }
  }
}