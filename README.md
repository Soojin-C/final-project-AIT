# Note Keeper

## Overview

Have lots of ideas and things to do but can't find a simple solution to organize them? Have all the options that you've tried so far been either only well suited for only task control/notetaking or neither? Want to find an easy and clean solution?

Note Keeper is a web app that allows users to organize their thoughts and tasks into list and notes. Users will login and create lists and notes that can be tagged and be customized. For more orginization, list items can link to notes and vice versa. 


## Data Model

The application will store Users, Lists and Items

* users can have multiple lists, folders and notes(via references)
* each list can have multiple items (by embedding)
* each folder can have multiple notes (by references)

An Example User:

```javascript
{
  user: "schoi",
  token: // a password token for this specific user,
  lists: // an array of references to List documents,
  folders: // array of references to Folder documents,
  notes: // array of references to Note documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  title: "Tasks for AIT",
  font: //name of class that sets the font of choices,
  color: "pink",
  items: [
    { num: 1, text: "Quiz 7", checked: false, linked:false, link: null},
    { num: 2, text: "hw 5", checked: true, linked:true, link: //Note Reference},
  ]
}
```

An Example Note:

```javascript
{
  user: // a reference to a User object
  id: //unique number for each note
  title: "Notes on Mongo",
  font: //name of class that sets the font of choices,
  color: "pink",
  text: "- Wow some notes and stuff
  - about some stuff
  - on the hw"
  linked: true
  link: //reference for List
  folder: //reference for Folder
}
```

An Example Folder:

```javascript
{
  user: // a reference to a User object
  name: "Notes for hw",
  color: "pink",
  notes: // Array of references to Note documents
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/home - page for non signed in users
![home](documentation/home.png)

/welcome - page for signed in users
![welcome](documentation/welcome.png)

/newList - page for creating a new list
![newList](documentation/newList.png)

/list - page for editing a already made list
![list](documentation/list.png)

/lists - page for viewing all lists made
![lists](documentation/lists.png)

/newNote - page for creating a new note
![newNote](documentation/newNote.png)

/note - page for editing a already made note
![note](documentation/note.png)

/notes - page for viewing all notes made
![notes](documentation/notes.png)

/folders - page for viewing all folders
![folders](documentation/folders.png)

## Site map

![sitemap](documentation/sitemap.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as non-registered user, I can create a new note and list but cannot save
3. as a user, I can log in to the site
4. as a user, I can create a new task list
5. as a user, I can create a new note
6. as a user, I can create a new folder
7. as a user, I can view all of the task lists I've created
8. as a user, I can view all of the folders I've created
9. as a user, I can view all of the notes lists I've created
10. as a user, I can add items to a task list
11. as a user, I can remove items off a task list
12. as a user, I can edit a note
13. as a user, I can delete a note
14. as a user, I can custimize all the three: folders, notes, task lists

## Research Topics

* (3 points) Integrate user authentication
    * I'm going to be using passport and JSON web tokens for user authentication and password decoding
* (3 points) Perform Unit Tests with Mocha
    * Perform both client and server side unit testing
* (2 points) Bootstrap
    * used Bootstrap as the frontend framework

8 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

(__TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

