# lol-chime [![Build Status](https://travis-ci.org/max-su/lol-chime.svg?branch=master)](https://travis-ci.org/max-su/lol-chime) [![npm version](https://badge.fury.io/js/lol-chime.svg)](https://badge.fury.io/js/lol-chime) [![dependencies Status](https://david-dm.org/max-su/lol-chime/status.svg)](https://david-dm.org/max-su/lol-chime) [![Crates.io](https://img.shields.io/crates/dv/rustc-serialize.svg)](https://www.npmjs.com/package/lol-chime)


Summary
--------
A terminal utility serving the League of Legends community that runs client side and notifies them when their friends are finished with their game. 
For web app version go [here](https://github.com/max-su/lol-chime-web).

Use
--------
*   Run in a terminal
```
chime <IGN>
```
```
chime boostedAnimal
```
*   Would be a query for the summoner boostedAnimal in whatever region you specify in the config file. 
*   Please keep in mind that Live Game data for 'Bot' cannot be retrieved from Riot’s official API.

#Installation

Are you On Windows?
--------
*   Please install [Node.js & NPM](https://nodejs.org/en/download/) if you haven't already! 
*   We require [mplayer](https://sourceforge.net/projects/mplayerwin/) to run the audio chime in node. (If you don't install it, that's okay but you might not get the audio chime!)
*   Open up CMD and run 
```
setx MYPATH "%PATH%;C:\Program Files (x86)\MPlayer for Windows"
```
*   In CMD, type in ```mplayer``` and hit enter a blur of text should roll by, as long as it runs without a command not found, you're good to go!
*   Also run
```
npm install lol-chime -g
```
*   Move on over to the [config section](https://github.com/max-su/lol-chime#are-you-on-windows-config)

Are you On OSX?
--------
*   Please install [Node.js & NPM](https://nodejs.org/en/download/) if you haven't already! 
*   We require [mplayer](https://sourceforge.net/projects/mplayerwin/) to run the audio chime in node. (If you don't install it, that's okay but you might not get the audio chime!)
*   Open up terminal and type in ```mplayer``` and hit enter a blur of text should roll by, as long as it runs without a command not found, you're good to go!
*   Open up terminal and run 
```
npm install lol-chime -g
```
*   Move on over to the [config section](https://github.com/max-su/lol-chime#are-you-on-linuxosx-config)

Are you On Linux?
--------
*   linux master race kek
*   Please install [Node.js & NPM](https://nodejs.org/en/download/package-manager/) if you haven't already!
*   We require mplayer to run the audio chime in node. (If you don't install it, that's okay but you might not get the audio chime!)
*   Open up terminal and run this to install mplayer
```
sudo apt-get install mplayer
```
*   Also run
```
npm install lol-chime -g
```
*   Move on over to the [config section](https://github.com/max-su/lol-chime#are-you-on-linuxosx-config)

Are You On Windows? (Config)
--------

*   Open up notepad and save an empty text file(we'll fit it in later) as ```C:\Users\<USERNAME>\.chimerc```, as an example my personal user on Windows is ```C:\Users\Max```
*   Sign in on your league of legends account on [the Riot Games developer portal](https://developer.riotgames.com/sign-in) and grab an API key if you haven't already!
*   Open up notepad and copy over the text from [.chimerc](./.chimerc)
*   Make sure the file name is only ```.chimerc``` not ```.chimerc.txt```, if you need additional help doing this please look [here](https://gist.github.com/ozh/4131243)

Are You On Linux/OSX? (Config)
--------
*   Open up terminal and run
```
cd ~ && wget https://raw.githubusercontent.com/max-su/lol-chime/master/.chimerc
```  
*   Sign in on your league of legends account on [the Riot Games developer portal](https://developer.riotgames.com/sign-in) and grab an API key if you haven't already!

What Do We Fill In? (Config for OSX/Windows/Linux) 
---------
*   Open up your favorite text editor for .chimerc and
*   Set ```APIKEY``` to your api key.
*   Set ```REGION``` to your region code (see the following section).
*   Set ```REFRESHRATE``` to how often you want to refresh (in seconds).
*   We recommend a refresh rate of 2 to 10 to keep in line with Riot's allotted limit:
*   10 requests every 10 seconds
*   500 requests every 10 minutes
*   Please keep in mind you do not need to put quotation marks around these strings or numbers!

    Example:

    ```
    APIKEY=my_api_key
    REGION=NA
    REFRESHRATE=5
    ```

Regions
--------
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
