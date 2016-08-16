# lol-chime [![Build Status](https://travis-ci.org/max-su/lol-chime.svg?branch=master)](https://travis-ci.org/max-su/lol-chime) [![npm version](https://badge.fury.io/js/lol-chime.svg)](https://badge.fury.io/js/lol-chime) [![dependencies Status](https://david-dm.org/max-su/lol-chime/status.svg)](https://david-dm.org/max-su/lol-chime) [![WTFPL Badge](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png)] [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Summary
--------
A terminal utility serving the League of Legends community that runs client side and notifies them when their friends are finished with their game. 

Use
--------
*   Run in a terminal
```
chime <%= INSERT IGN HERE %>
```
```
chime boostedAnimal
```
*   Would be a query for the summoner boostedAnimal in whatever region you specify in the config file. 
*   Please keep in mind that Live Game data for 'Bot' cannot be retrieved from Riot’s official API.

Dependencies
--------
*   Please install [Node.js & NPM](https://nodejs.org/en/download/) if you haven't already! 
*   We require mplayer to run the audio chime in node. (If you don't install it, that's okay but you might not get the audio chime!)
*   In Ubuntu run
```
sudo apt-get install mplayer
```
*   Mplayer installation for [OSX](http://www.techspot.com/downloads/695-mplayerosx-for-mac.html) & [Windows](http://www.techspot.com/downloads/5141-mplayer-for-windows.html)
*   For Windows Users, add mplayer to your path for executables and stuffers.
```
setx MYPATH "%PATH%;C:\Program Files (x86)\MPlayer for Windows"
```
*   Open up terminal and run
```
npm install lol-chime -g
```

Config
--------
*   Sign in on your league of legends account on [the Riot Games developer portal](https://developer.riotgames.com/sign-in) and grab an API key if you haven't already!
*   In this repository's root directory, do
```
vim .env.example
```
*   replace ```<%= FILL IN API KEY HERE %>``` with your api key.
*   replace ```<%= FILL IN REGION CODE HERE %>``` with your region code(see the following section).
*   replace ```<%= FILL IN REFRESH RATE %>``` with how often time interval(seconds) you want to refresh.
*   We recommend a refresh rate of 2 to 10 to keep in line with Riot's allotted limit.
*   10 requests every 10 seconds
*   500 requests every 10 minutes
*   Please keep in mind you do not need to put quotation marks around these strings or numbers!
*   Finally copy over the example to the actual ```~/.chimerc```
*   On Linux/OSX, you can do
*   ``` cp .env.example ~/.chimerc ```
*   On Windows, you can copy the text in [.env.example](./env.example) and post it in Notepad and save to your root user directory
*   So for me(Max) I would be saving it into ```C:\Users\Max```
   
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

Licenses
-------
This application is under the [WTFPL License](./LICENSE.md).

Disclaimer
-------
Lol-Chime isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
