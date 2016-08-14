# lol-chime [![Build Status](https://travis-ci.org/max-su/lol-chime.svg?branch=master)](https://travis-ci.org/max-su/lol-chime)

Summary
--------
A terminal utility serving the League of Legends community and notifies them when their friends are finished with their game. 
  
Use
--------
*   Run in a terminal
```
node chime.js <%= INSERT IGN HERE %>
```
*   If you want to query an ign with spaces you can with an escape character followed by a space```\ ``` 
| IGN             | IGN Argument     | Correct?|
| ----------------|:----------------:|--------:|
|Quantum Bogosort|Quantum Bogosort   |no       |
|Quantum Bogosort|Quantum\ Bogosort  |yes      |
*   Please keep in mind that Live Game data for 'Bot' cannot be retrieved from Riot’s official API.
*   

Dependencies
--------

*   Open up terminal and run
```
npm install
```
*   Sign in on your league of legends account on [the Riot Games developer portal](https://developer.riotgames.com/sign-in).
*   In the repository's root directory, do
```
vim ./leagueLib/.env.example
```
*   replace ```<%= FILL IN API KEY HERE %>``` with your api key.
*   replace ```<%= FILL IN REGION CODE HERE %>``` with your region code(see the following section).
*   Please keep in mind you do not need to put quotation marks around it!
*   Finally copy over the example to the actual .env
``` cp ./.env.example ./.env ```
   
Regions
-------
*   BR
*   EUNE
*   EUW
*   JP
*   KR
*   LAN
*   LAS
*   NA
*   OCE
*   TR
*   RU
*   If we don't have your region please blame rito & their chinese overlords. Sorry CN/SEA!

FSM Diagram of Query Control Flow
-------
 ![FSM](/docs/FSM.png "FSM")

Travis Notes
-------
*   Not sure how to ci test for anything but a user that is definitely not in a game(me).
*   Would require a user always in a game & require travis not timing out.

Current Implementation/Design Issues (Deprecated, no longer doing a web app)
--------
[Link to problems I've found while implementing and designing this webapp out](docs/issues.md)
