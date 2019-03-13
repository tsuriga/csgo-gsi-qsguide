# Counter-Strike: Global Offensive Game State Integration Quick Start Guide

Languages: Python 3 & JavaScript (NodeJS)

This is a quick start guide to the [CS:GO Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration "CS:GO Game State Integration"), referenced on 2015-12-10.

By the end of this guide you'll have a program running in your console printing out information about rounds as you play.

**NOTE!** When I was testing the quick start guide (CS:GO version 13514) [the round payload is different for the first round compared to consecutive ones](http://i.imgur.com/UIijPE9.jpg "Round payloads for rounds 1-3"). I regarded it as a bug and hope it'll be or was fixed in future patches. This is why the sample program prints or printed scores wrong for the first round.


## The Steps

1. Clone this repository. If you're unfamiliar with the process, you can alternatively just copy the files above to some directory on your computer.

2. Copy the *gamestate_integration_quickstartguide.cfg* into your CS:GO config directory (likely located at *Steam\SteamApps\common\Counter-Strike Global Offensive\csgo\cfg*).

3. Install either NodeJS or Python 3, depending on which programming language you wish to use:
  - [Node.js](https://nodejs.org/ "Node.js"). Tested on NodeJS 8.5.0.
  - [Python 3](https://www.python.org/downloads/ "Python downloads"). Tested on Python 3.6.4.

4. Run the endpoint server and leave it running in the background. You can do this by opening up a shell (e.g. Command Prompt) and running this in the directory you copied the files to: `node quickstartguide.js` for the NodeJS server, or `python quickstartguide.py` for the Python server.

5. Start up CS:GO and play offline against bots. For easy testing set `mp_maxrounds 2` in console once you load into a map. You can play online against other players just as well, it's just faster to see how the program works if you do it against bots. 

**NOTE!** The *quickstartguide.js* and *.py* scripts monitor only round endings so you will need to play some rounds until the end to see anything in your command prompt. If you wish to see more data, use *outputpayloads* script as described down below.

**NOTE!** The quick start sample server most likely does not work correctly on hostage or arms race maps.


## Payloads

Payloads are packages the CS:GO client sends to your server. Their contents depend on components you subscribe to in your endpoint server configuration file under *data*. For example they can contain information such as ammo count, round endings, bringing up menus, weapon skins, player kill and headshot counts, players' clan tags, when and which weapons are selected, etc.

Below is a list of all the subscribable components that could be found in the Game State integration article on Valve Developer wiki at the time of writing. This list was updated last at the time of writing on Aug 18th, 2018.

```
"map_round_wins" "1"          // history of round wins
"map" "1"                     // mode, map, phase, team scores
"player_id" "1"               // steamid
"player_match_stats" "1"      // scoreboard info
"player_state" "1"            // armor, flashed, equip_value, health, etc.
"player_weapons" "1"          // list of player weapons and weapon state
"provider" "1"                // info about the game providing info 
"round" "1"                   // round phase and the winning team

// Below this line must be spectating or observing
"allgrenades" "1"             // grenade effecttime, lifetime, owner, position, type, velocity
"allplayers_id" "1"           // the steam id of each player
"allplayers_match_stats" "1"  // the scoreboard info for each player
"allplayers_position" "1"     // player_position but for each player
"allplayers_state" "1"        // the player_state for each player
"allplayers_weapons" "1"      // the player_weapons for each player
"bomb" "1"                    // location of the bomb, who's carrying it, dropped or not
"phase_countdowns" "1"        // time remaining in tenths of a second, which phase
"player_position" "1"         // forward direction, position for currently spectated player
```

To learn more about what kind of data the CS:GO client sends out run `node outputpayloads.js > out.txt` using all of the components from the list above in your gamestate integration configuration file. Then run the game and try to play out different scenarios: different maps, different side winning in different situations, spectate players that are using different guns with different skins, play different modes, etc. It'll write everything into *out.txt* file.

## Authentication

The sample scripts show how to authenticate payloads but for simplicity's sake they self-contain the authentication tokens. On local servers the authentication step is optional, but if you plan to run the scripts on an external server, it's best to read the authentication token from outside the script and use SSL on the server to further protect the token.


## What's next

Now you can start building your own service. From the script you'll quickly notice that parsing information out of the payloads is quite an arduous task at the moment – we can only hope they come up with an easier format in the future.

Need ideas what to do with all this information? Create a live, detailed tournament feed for your website. Tweet every time you get a headshot. Hook up your Christmas lights to make your whole house pulse red when the bomb is planted. Have your ice machine drop a cube every time you shoot a bullet. Track what sort of skins your co-players' are rocking. Anything you can think of. Go bananas!
