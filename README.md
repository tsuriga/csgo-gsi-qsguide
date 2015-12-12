#CS:GO Game State Integration Quick Start Guide

This is a quick start guide to the [CS:GO Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration "CS:GO Game State Integration"), referenced on 2015-12-10.

By the end of this guide you'll have a program running in your console printing out information about rounds as you play.


##The Steps

1. Clone this repository. If you're unfamiliar with the process, you can alternatively just copy the files above to some directory on your computer.

2. Copy the *gamestate_integration_quickstartguide.cfg* into your csgo/config directory (likely located at *Steam\SteamApps\common\Counter-Strike Global Offensive\csgo\cfg*).

To learn more about available configurations read up on [Endpoint Section Settings](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration#Endpoint_Section_Settings "Endpoint Section Settings").

3. Install [Node.js Stable programming environment](https://nodejs.org/en/download/stable/ "Node.js Stable"). The server may work on the Mature version (v4 at the time of writing) as well, I only tested the guide on Stable (v5.2 at the time of writing).

4. Run the endpoint server and leave it running in the background. You can do this by opening up a shell (e.g. Command Prompt) and running this in the directory you copied the files to: `node quickstartguide.js`

5. Start up CS:GO and play offline against bots. For easiest testing set `mp_maxrounds 2` in console once you load into a map. You can play online against other players just as well, it's just faster to see how the program works if you do it against bots. Note that the sample program I made doesn't work correctly on hostage or arms race maps (I assume).


## Payloads

Payloads are packages the CS:GO client sends to your server. Their contents depend on components you subscribe to in your endpoint server configuration file under *data*. For example they can contain information such as ammo count, round endings, bringing up menus, weapon skins, player kill and headshot counts, players' clan tags, when and which weapons are selected, etc.

Below is a list of subscribable components that could be found in the Game State integration article on Valve Developer wiki at the time of writing. The article doesn't have a definite list, however, so there could be more.

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

To learn more about what kind of data the CS:GO client sends out run [the Node sample server from Valve Developer wiki](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration#Sample_HTTP_POST_Endpoint_Server "Sample Endpoint Server") using all of the components from the list above. You can direct all of the output to a file by running `node mysample.js > out.txt`. Then just run the game and try to play out different scenarios: different maps, different side winning in different situations, spectate players that are using different guns with different skins, play different modes, etc.


##What's next

Now you can start building your own service. From the script you'll quickly notice that parsing information out of the payloads is quite an arduous task at the moment – we can only hope they come up with an easier format in the future.

Need ideas what to do with all this information? Create a live, detailed tournament feed for your website. Tweet every time you get a headshot. Hook up your Christmas lights to make your whole house pulse red when the bomb is planted. Have your ice machine drop a cube every time you shoot a bullet. Track what sort of skins your co-players' are rocking. Anything you can think of. Go bananas!
