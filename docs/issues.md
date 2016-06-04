What Is Functional
-------
*       The ability to query more than one summoner at once and track their in-game status until they get out of the game.
*       The below code will start tracking two summoners and keep tracking until both of them finish the game.
```javascript
summonerTest = new SummonerEmitter("ConstantFighting", "NA");
summonerTest2 = new SummonerEmitter("xKurayami", "NA");
leagueLib.initializeEvents(summonerTest);
leagueLib.initializeEvents(summonerTest2);
```
*       The express server although it doesn't really do much but serve my static assets right now.

What Isn't Functional
-------
*       I need a way to allow the client to make a request to my server start tracking summoners, and allow clients to make a SummonerEmitter job with a GET/POST request.
*       I also need a way to track if clients disconnect, the server removes their job (thus saving on API calls)
*       I need the client to be able to make GET Requests to my server so that they can see the status of their SummonerEmitter 
*       Not sure if the above one is best implemented with a GET(Not sure if there is any better way to do this)

What Could Be Done Better
-------
*       I'm not sure if there's a better approach to what I'm currently doing, there isn't any Event Listener that would ping me when the user is done with the game.
*       My current implementation just pings every 30 seconds, this could be optimized as in most normal games. The average game doesn't end until the 30m mark.
*       In most cases I shouldn't even start pinging until around 15m.
*       Differentiate between Normal/Customs SR/TT to know how often I should ping and when I should start pinging.

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
*       This FSM concept will be implemented with Event Emitters & CallBacks.
*       Diagram as shown: ![FSM](/docs/FSM.png "FSM")

Networking & Connecting With the Client
-------
*       Tie each username/region to a GET query, provide them with a status of the user and follow the FSM model.
    1. Begin tracking summoners who are queried initially
    2. Tell the client if the query was acceptable, IGN200=>GAME200, client side sees a div with the tracker info.
    3. Have the client side keep a variable that their query was found, and continually check the server every 30s.
    4. If State5 = true and we go into State 6, audio chime should activate.
*       State2, State3, and State4 should all tell the client side webpage that an error has occurred.
*       The client side should deal with this by making a div or whatever appear with an error message.
