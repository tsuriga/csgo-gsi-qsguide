#Counter-Strike: Global Offensive Game State Integration Quick Start Guide

This is a quick start guide to the [CS:GO Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration "CS:GO Game State Integration"), referenced on 2015-12-10.

By the end of this guide you'll have a program running in your console printing out information about rounds as you play.

**NOTE!** At the time of writing (CS:GO version 13514) [the round payload is different for the first round compared to consecutive ones](http://i.imgur.com/UIijPE9.jpg "Round payloads for rounds 1-3"). I regard it as a bug and hope it'll be fixed in future patches. This is why the sample program prints scores wrong for the first round.


##The Steps

1. Clone this repository. If you're unfamiliar with the process, you can alternatively just copy the files above to some directory on your computer.

2. Copy the *gamestate_integration_quickstartguide.cfg* into your csgo/config directory (likely located at *Steam\SteamApps\common\Counter-Strike Global Offensive\csgo\cfg*).

3. Install either NodeJS or Python 3, depending on which programming language you wish to use:
- [Node.js Stable programming environment](https://nodejs.org/en/download/stable/ "Node.js Stable"). The server may work on the Mature version (v4 at the time of writing) as well, I only tested the guide on Stable (v5.2 at the time of writing).
- [Python 3](https://www.python.org/downloads/ "Python downloads"). Tested on Python 3.4.

4. Run the endpoint server and leave it running in the background. You can do this by opening up a shell (e.g. Command Prompt) and running this in the directory you copied the files to: `node quickstartguide.js` for the NodeJS server, or `python quickstartguide.py` for the Python server.

5. Start up CS:GO and play offline against bots. For easy testing set `mp_maxrounds 2` in console once you load into a map. You can play online against other players just as well, it's just faster to see how the program works if you do it against bots. Note that the quick start sample server most likely does not work correctly on hostage or arms race maps.


## Payloads

Payloads are packages the CS:GO client sends to your server. Their contents depend on components you subscribe to in your endpoint server configuration file under *data*. For example they can contain information such as ammo count, round endings, bringing up menus, weapon skins, player kill and headshot counts, players' clan tags, when and which weapons are selected, etc.

Below is a list of all the subscribable components that could be found in the Game State integration article on Valve Developer wiki at the time of writing. The article doesn't have a definite list, however, so there could be more.

```
"provider"                  "1"
"map"                       "1"
"round"                     "1"
"player_id"                 "1"
"player_state"              "1"
"player_weapons"            "1"
"player_match_stats"        "1"
"allplayers_id"             "1"
"allplayers_state"          "1"
"allplayers_match_stats"    "1"
```

To learn more about what kind of data the CS:GO client sends out run `node outputpayloads.js > out.txt` using all of the components from the list above. Then run the game and try to play out different scenarios: different maps, different side winning in different situations, spectate players that are using different guns with different skins, play different modes, etc. It'll write everything into *out.txt* file.


##What's next

Now you can start building your own service. From the script you'll quickly notice that parsing information out of the payloads is quite an arduous task at the moment – we can only hope they come up with an easier format in the future.

Need ideas what to do with all this information? Create a live, detailed tournament feed for your website. Tweet every time you get a headshot. Hook up your Christmas lights to make your whole house pulse red when the bomb is planted. Have your ice machine drop a cube every time you shoot a bullet. Track what sort of skins your co-players' are rocking. Anything you can think of. Go bananas!
