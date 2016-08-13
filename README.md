# lol-chime
Summary
--------
A terminal utility serving the League of Legends community and notifies them when their friends are finished with their game. 
  
Use
--------
Users can enter a summoner name, choose a region in an HTML form, and submit it and receive an audio notification when their friend finishes the game.

Dependencies
--------

*   Open up terminal and run
'''
npm install
'''
*   Sign in on your league of legends account on [the Riot Games developer portal](https://developer.riotgames.com/sign-in).
*   In the repository's root directory, do
'''
vim ./leagueLib/.env.example
'''
*   and replace '''<%= FILL IN API KEY HERE %>''' with your api key.
*   finally copy over the example to the actual .env
''' cp ./leagueLib/.env.example ./leagueLib/.env '''
   
FSM Diagram of Query Control Flow
-------
 ![FSM](/docs/FSM.png "FSM")

Current Implementation/Design Issues (Deprecated, no longer doing a web app)
--------
[Link to problems I've found while implementing and designing this webapp out](docs/issues.md)

