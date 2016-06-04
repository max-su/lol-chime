Issues
-------
*       One of the issues I found while implementing this was that node.js is async so it doesn't always execute in sequential order, I couldn't exactly structure it synchronously like I could it basically every other language I wrote in before.
*      Trying to fix 


Potential Solutions/Design
-------
*       The goal is to find summoners who are inGame and relay a message to the client when they finish the game, so maybe I'll have emit an event for each state? 4, being looping until it 404's on checkSummonerInGame.
*       Summoners should be in a few states(oh shit this is a FSM CS233 comp architecture nightmare):
    1. HTML Form Submission
    2. notFound (getSummonerID 404)
    3. Found (getSummonerID 200)
    4. Found&NotInGame (getSummonerID 200 & checkSummonerInGame 404) 
    5. Found&InGame (getSummonerID 200 & checkSummonerInGame 200)
    6. Finished (checkSummonerInGame now 404's) 
*       Diagram as shown: ![FSM](/docs/FSM.png "FSM")

Networking & Connecting With the Client
-------
*       Tie each username/region to a GET query, provide them with a status of the user and follow the FSM.
    0. Begin tracking summoners that are GET queried.
    1. How do I make a new summonerEmitter object when a username/region is queried, when one is already made I shouldn't make a new one.
    2. Have to figure out how to architect the above this Express someonehow
*       State2, State3, and State4 should all tell the client side webpage that an error has occurred.
*       The client side should deal with this by making a div or whatever appear with an error message.
*       When State5 is found, have it continually run every 30seconds.
*       Have the Client side have a variable like State5 = True the first time state5 is found, a div pops up with the current game info and a chime thing that will pop later.
*       When the currentGame 404's and we go into State6 from State5, have the audio chime ring in the div from State5.
 
