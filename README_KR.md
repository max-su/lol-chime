# lol-chime [![Build Status](https://travis-ci.org/max-su/lol-chime.svg?branch=master)](https://travis-ci.org/max-su/lol-chime) [![npm version](https://badge.fury.io/js/lol-chime.svg)](https://badge.fury.io/js/lol-chime) [![dependencies Status](https://david-dm.org/max-su/lol-chime/status.svg)](https://david-dm.org/max-su/lol-chime) [![WTFPL Badge](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png)](http://www.wtfpl.net/) [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome) [![Umma approved](https://img.shields.io/badge/nicole's%20umma-approved-brightgreen.svg)]()

요약 
--------
Lol Chime 은 사용자들에게 그들의 친구가 게임이 끝났음을 알려주는 ‘리그 오브 레전드’의 터미널 유틸리티이다. 웹 어플 버젼 열람 위해 [여기](https://github.com/max-su/lol-chime-web) 를 클릭. 

이용
--------
*   다음 터미널 실행
```
chime <IGN>
```
```
chime boostedAnimal
```
*   구성파일에서 사용하는 지역에 관계없이summoner boostedAnimal 의 문의가 될 수 있음  
*   ‘Bot’ 의 Live Game 데이타는 Riot 의 공식 API에서 찾을 수 없음.

#설치

윈도우 사용시
--------
*   [Node.js & NPM](https://nodejs.org/dist/v4.5.0/node-v4.5.0-x86.msi) 를 설치
*   노드에서 차임벨 오디오를 실행하기 위해[mplayer](https://sourceforge.net/projects/mplayerwin/)가 필요 (설치하지 않을 시 오디오가 들리지 않을 수 있음!) 
*   CMD를 열고 다음을 실행
```
setx MYPATH "%PATH%;C:\Program Files (x86)\MPlayer for Windows"
```
*   CMD에 ```mplayer``` 라 입력하고 enter키 누름. 오류 없을 시 블러 텍스트가 나타남.  
*   다음을 실행
```
npm install lol-chime -g
```
*   [구성파일 섹션](https://github.com/max-su/lol-chime#are-you-on-windows-config) 으로 이동

OSX 사용시
--------
*   [Node.js & NPM](https://nodejs.org/dist/v4.5.0/node-v4.5.0.pkg) 를 설치
*   노드에서 차임벨 오디오를 실행하기 위해[mplayer](http://download.cnet.com/MPlayer-OSX-Extended/3000-2139_4-203274.html)가 필요 (설치하지 않을 시 오디오가 들리지 않을 수 있음!) 
*   터미널을 열고 mplayer 설치를 위해 다음을 실행 
*   다음을 실행 
```
npm install lol-chime -g
```
*   [구성파일 섹션](https://github.com/max-su/lol-chime#are-you-on-linuxosx-config) 으로 이동

Linux 사용시 
--------
*   linux 마스터 게임ㅋ kek  ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
*   [Node.js & NPM](https://nodejs.org/en/download/package-manager/) 를 설치 
*   노드에서 차임벨 오디오를 실행하기 위해mplayer 가 필요 (설치하지 않을 시 오디오가 들리지 않을 수 있음!) 
*   터미널을 열고 mplayer 설치를 위해
*   다음을 실행
```
sudo apt-get install mplayer
```
*   다음을 실행
```
npm install lol-chime -g
```
*   [구성파일 섹션](https://github.com/max-su/lol-chime#are-you-on-linuxosx-config) 으로 이동

Windows 사용시 (구성파일) 
--------
*   노트패드를 열고 다음과 같은 공 텍스트 파일을 만듬: ```C:\Users\<USERNAME>\.chimerc```
*   예를 들어 필자의 퍼스너 유저는:```C:\Users\<USERNAME>\.chimerc 임```
*   [The Riot Games developer portal](https://developer.riotgames.com/sign-in) 에서 리그 오브 레전드 계정에 로그인하고 API 키를 발급받음. 
*   노트패드를 열고[.chimerc](./.chimerc) 에서 텍스트를 복사, 붙여넣음
*   Make sure the file name is only ```.chimerc``` not ```.chimerc.txt```, if you need additional help doing this please look [here]
*   파일 이름이 ```.chimerc.txt``` 이 아닌```.chimerc``` 임을 확인. 더 도움이 필요할 시 여기를 클릭. [More help](https://gist.github.com/ozh/4131243)

Are You On Linux/OSX? (Config)
Linux/OSX 이용시 (구성파일) 
--------
*   터미널을 열고 다음을 실행
```
cd ~ && wget https://raw.githubusercontent.com/max-su/lol-chime/master/.chimerc
```  
*   [The Riot Games developer portal](https://developer.riotgames.com/sign-in) 에서 리그 오브 레전드 계정에 로그인하고 API 키를 발급받음. 

입력 (OSX/Windows/Linux 구성파일) 
---------
*   ```.chimerc``` 파일을 사용 위해 사용자가 익히 쓰던 텍스트 에디터를 열고  
*   지역코드에 ```APIKEY``` 을 설정 (다음 섹션 참조) 
*   재활성주기(초단위)에REFRESHRATE 을 설정 * 
*   Riot 의 제한에 맞게 재활성 주기는 2초에서 10초 사이가 가장 알맞음  
*   10초에 10개의 요청
*   10분에 500개의 요청 
*   각 일련과 숫자에 따옴표 붙일 필요 없음 

예시: 

```
APIKEY=my_api_key
REGION=NA
REFRESHRATE=5
```

지역
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
*   사용자의 지역이 없는 것은 저희 측에서 해결할 수 있는 사안이 아닙니다. CN 과 SEA 이용자분들 죄송해요! 

라이센스 
-------
이 어플리케이션은[WTFPL License](./LICENSE.md) 의 적용을 받음

권리포기 
-------
Lol-Chime 은 Riot Games에서 보증된 프로그램이 아니며 Riot Games 혹은 리그 오브 레전드를 만들고 관리하는 그 어떤 사람의 관점과 의견을 포함하고 있지 아니하다. League of Legends 와 Riot  Games 는Riot Games, Inc. League of Legends © Riot Games, Inc. 의 상표 혹은 등록상표이다.  

Credits
-------
Thank you so much for helping me translate this Sue :>  네가 최고야  
