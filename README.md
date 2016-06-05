# lol-chime
Summary
--------
A web-app serving the League of Legends community and notifies them when their friends are finished with their game. 
  
Use
--------
Users can enter a summoner name, choose a region in an HTML form, and submit it and receive an audio notification when their friend finishes the game.

Dependencies
--------

*   npm install dotenv 
*   npm install events
*   npm install request
*   npm install express
*   npm install url
*   Riot Games API key in /js/.env
   
Directory Structure
--------
*   HTML in /public
*   Client Side JS in /public/js
*   CSS in public/css
*   Image assets in public/images
*   Node.JS User Modules in /leagueJS
*   More documentation in /docs

Current Implementation/Design Issues
--------
[Link to problems I've found while implementing and designing this webapp out](docs/issues.md)

FSM Diagram of Query Control Flow
-------
 ![FSM](/docs/FSM.png "FSM")

