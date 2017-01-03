define({ "api": [  {    "type": "post",    "url": "/roles",    "title": "Create a role",    "name": "CreateRole",    "group": "Role",    "permission": [      {        "name": "admin",        "title": "",        "description": ""      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of new role</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "slug",            "description": "<p>Slug from name of new role</p>"          }        ]      }    },    "success": {      "fields": {        "Created 201": [          {            "group": "Created 201",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of new role</p>"          },          {            "group": "Created 201",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of new role</p>"          },          {            "group": "Created 201",            "type": "String",            "optional": false,            "field": "slug",            "description": "<p>Slug of new role</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created\n{\n  \"id\": 3,\n  \"name\": \"Custom\",\n  \"slug\": \"custom\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/role/doc/doc.js",    "groupTitle": "Role",    "sampleRequest": [      {        "url": "http://localhost/roles"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "delete",    "url": "/roles/:id",    "title": "Delete role from id",    "name": "DeleteRole",    "group": "Role",    "permission": [      {        "name": "admin",        "title": "",        "description": ""      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/role/doc/doc.js",    "groupTitle": "Role",    "sampleRequest": [      {        "url": "http://localhost/roles/:id"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/roles/:id",    "title": "Get role by id",    "name": "GetRole",    "group": "Role",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of role</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of role</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "slug",            "description": "<p>Slug of role</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 2,\n  \"name\": \"User\",\n  \"slug\": \"user\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/role/doc/doc.js",    "groupTitle": "Role",    "sampleRequest": [      {        "url": "http://localhost/roles/:id"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/roles",    "title": "Get all roles",    "name": "GetRoles",    "group": "Role",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array[]",            "optional": false,            "field": "raw",            "description": "<p>Return table of roles</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"name\": \"Administrator\",\n    \"slug\": \"administrator\"\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/role/doc/doc.js",    "groupTitle": "Role",    "sampleRequest": [      {        "url": "http://localhost/roles"      }    ],    "error": {      "fields": {        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/roles/:id",    "title": "Update role from id",    "name": "UpdateRole",    "group": "Role",    "permission": [      {        "name": "admin",        "title": "",        "description": ""      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>New role name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "slug",            "description": "<p>New role slug</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of role</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>Name of role</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "slug",            "description": "<p>Slug of role</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"name\": \"Customer\",\n  \"slug\": \"customer\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/role/doc/doc.js",    "groupTitle": "Role",    "sampleRequest": [      {        "url": "http://localhost/roles/:id"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/roles/:idRole/users",    "title": "Create a user",    "name": "CreateUser",    "group": "User",    "permission": [      {        "name": "user",        "title": "",        "description": ""      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username of new user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of new user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of new user</p>"          }        ]      }    },    "success": {      "fields": {        "Created 201": [          {            "group": "Created 201",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of new user</p>"          },          {            "group": "Created 201",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username of new user</p>"          },          {            "group": "Created 201",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of new user</p>"          },          {            "group": "Created 201",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of new user</p>"          },          {            "group": "Created 201",            "type": "Number",            "optional": false,            "field": "role_id",            "description": "<p>Role id of new user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created\n{\n  \"id\": 3,\n  \"username\": \"John\",\n  \"email\": \"john@example.com\",\n  \"password\": \"encrypted\",\n  \"role_id\": 2\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/user/doc/doc.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://localhost/roles/:idRole/users"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "permission": [      {        "name": "user",        "title": "",        "description": ""      }    ],    "type": "delete",    "url": "/roles/:idRole/users/:idUser",    "title": "Delete user from id",    "name": "DeleteUser",    "group": "User",    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/user/doc/doc.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://localhost/roles/:idRole/users/:idUser"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/roles/:idRole/users/:idUser",    "title": "Get user by id",    "name": "GetUser",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of user</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "role_id",            "description": "<p>Role id of user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"username\": \"John\",\n  \"email\": \"john@example.com\",\n  \"password\": \"encrypted\",\n  \"role_id\": 2\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/user/doc/doc.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://localhost/roles/:idRole/users/:idUser"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/roles/:idRole/users",    "title": "Get all users from specific role",    "name": "GetUsers",    "group": "User",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array[]",            "optional": false,            "field": "raw",            "description": "<p>Return table of users</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 3,\n    \"username\": \"John\",\n    \"email\": \"john@example.com\",\n    \"password\": \"encrypted\",\n    \"role_id\": 1\n  }\n]",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/user/doc/doc.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://localhost/roles/:idRole/users"      }    ],    "error": {      "fields": {        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  },  {    "type": "put",    "url": "/roles/:idRole/users/:idUser",    "title": "Update user from id",    "name": "UpdateUser",    "group": "User",    "permission": [      {        "name": "user",        "title": "",        "description": ""      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>New user name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>New user email</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>New user password</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "role_id",            "description": "<p>New userrole_id</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "id",            "description": "<p>Id of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>Username of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>Email of user</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>Password of user</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "role_id",            "description": "<p>Role id of user</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 3,\n  \"username\": \"Johnny\",\n  \"email\": \"johnny@example.com\",\n  \"password\": \"secured\",\n  \"role_id\": 2\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/bundles/user/doc/doc.js",    "groupTitle": "User",    "sampleRequest": [      {        "url": "http://localhost/roles/:idRole/users/:idUser"      }    ],    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "NotFound",            "description": "<p>Impossible to found resource</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BadRequest",            "description": "<p>Wrong parameters</p>"          }        ],        "Error 5xx": [          {            "group": "Error 5xx",            "optional": false,            "field": "InternalServerError",            "description": "<p>The server has encountered an internal error</p>"          }        ]      },      "examples": [        {          "title": "Error-Client:",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Error-Client:",          "content": "HTTP/1.1 400 Bad Request",          "type": "json"        },        {          "title": "Error-Server:",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    }  }] });
