Issues
-------
*       One of the issues I found while implementing this was that node.js is async so it doesn't always execute in sequential order, I couldn't exactly structure it synchronously like I could it basically every other language I wrote in before.
*      Am now trying to string getSummonerID, and checkSummonerInGame together with event emitters but I'm not sure that would scale later on in server code, when I have maybe many summonerListeners going on at the same time and not just one summonerListener for testing.


Potential Solutions/Design
-------
*       The goal is to find summoners who are inGame and relay a message to the client when they finish the game, so maybe I'll have emit an event for each state? 4, being looping until it 404's on checkSummonerInGame.
*       Summoners should be in a few states(oh shit this is a FSM CS233 nightmares):
    0. HTML Form Submission
    1. notFound (getSummonerID 404)
    2. Found (getSummonerID 200)
    3. Found&NotInGame (getSummonerID 200 & checkSummonerInGame 404) 
    4. Found&InGame (getSummonerID 200 & checkSummonerInGame 200)
    5. Finished (checkSummonerInGame now 404's) 
*       Diagram as shown: ![FSM](/docs/FSM.png "FSM")

Networking
-------
*       I think only get requests are necessary, we only want to ping the server with an IGN and region.
*       Currently setting up an Express Server, I think I'll just have clients make AJAX requests to it to see where their summonerState is. If there is a better way to do this please let me know!
*       Not sure if I need a DB for something like this, if two people query a person it could save on API call's.
    
