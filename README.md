# lol-chime [![Build Status](https://travis-ci.org/max-su/lol-chime.svg?branch=master)](https://travis-ci.org/max-su/lol-chime) [![npm version](https://badge.fury.io/js/lol-chime.svg)](https://badge.fury.io/js/lol-chime) [![dependencies Status](https://david-dm.org/max-su/lol-chime/status.svg)](https://david-dm.org/max-su/lol-chime) [![WTFPL Badge](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png)] [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

Summary
--------
A terminal utility serving the League of Legends community that runs client side and notifies them when their friends are finished with their game. 

Use
--------
*   Run in a terminal
```
node chime.js <%= INSERT IGN HERE %>
```
*   Please keep in mind that Live Game data for 'Bot' cannot be retrieved from Riot’s official API.

Dependencies
--------

*   We require mplayer to run the audio chime in node.
*   In Ubuntu run
```
sudo apt-get install mplayr
```
*   Mplayer installation for [OSX](https://sourceforge.net/projects/mplayerosx/) & [Windows](https://sourceforge.net/projects/mplayerwin/)
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

Licenses
-------
This application is under the [WTFPL License](./LICENSE.md).

Disclaimer
-------
Lol-Chime isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
