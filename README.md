# Pokedex React

### Simple Pokedex Web App created with ReactJS library

*by Jeffry*

---

## App Features

In the main page, user can view list of available Pokemon. By clicking one of the Pokemon info, user will be redirected to page containing detail of that Pokemon (image, types, abilities, and possible moves to learn).

The app also simulate the Pokemon catching, with 50% success rate. After successfully caught, user can give an unique nickname for that Pokemon.

List of caught Pokemon can be seen in My Pokemon List page. In this page, user can release the caught Pokemon to the wild.

## Getting Started

1. Open command line 
2. Type `npm install` to download the required dependencies
3. Type `npm start` to start the application
4. Open [localhost:3000](localhost:3000) in browser to access the application

## Project Structures

- **/public**: contain image files
- **/src/components**: contain UI components used in the pages, ex. Header, Accordion, Loading, and card containing Pokemon info
- **/src/constants**: contain constant values, ex. list of GraphQL queries and list of Pokemon types' background color
- **/src/pages**: contain UI pages, that seen by users. Consist of Pokemon List page, Pokemon Detail page, and captured Pokemon List page
- **/src/providers**: contain provider components, for Apollo Client and React Context
- **App.js**: main file