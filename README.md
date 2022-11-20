# CS:GO GSI Stream Tools
This project uses [CS:GO Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
to provide web pages you can use on your stream.  

It does not cause a VAC ban because it does not exploit CS:GO files. It uses Game State Integration, which only provides information the player can see inside the game. CS:GO GSI is an official VALVE api. Other software like Logitech G Hub and Razer Synaptic uses it too!

If you like it, don't forget to [follow me on twitch](https://twitch.tv/rickvdd) :) 

## Features  
By now, only one feature is available. It is a box that you can use to highlight C4 planted, terrorist and counter-terrorist wins. The box border will
glow and pulse in yellow when a C4 is planted. It will have a fixed color of orange if the terrorist wins and a fixed color of blue if the counter-terrorist wins.
The glow will disappear after the end of the freeze time.

### CT wins with a bomb planted
https://user-images.githubusercontent.com/2130182/202932273-503cc7f3-961c-464b-81ac-6001c163dffc.mp4

### TR wins with a bomb planted
https://user-images.githubusercontent.com/2130182/202932277-75a54f9b-909e-450f-b77b-6cb5dbebb271.mp4

## Running
To run this project you need node.js 18.x. So basically, run `npm` install` and then `npx ts-node src/index`. It will
start a web server in the port `3000`.
Then copy the file `gamestate_integration_backlight.cfg` and paste it inside CS:GO cfg folder. The default path is `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg`.

Then you can navigate to `http://localhost:3000` and see a black rectangle. Open any competitive CS:GO match, it can be with bots, and plant the bomb. Enjoy the animations!

## Adding to Streamlabs OBS or OBS
Is very easy, you only need to add a browser source with URL `localhost:3000`. I play and stream in 1080p, so I recommend to use width 1600 and height 900. After that just adjust to have exactly the same size of your game capture and place it behind the game capture!

## Developing
You can easily develop more features by using VS Code and a dev container. Also you can use Github Codespaces to develop this project. If you use Codespaces just change the `gamestate_integration_backlight.cfg` to point to your Codespace address.

All the logic of the game state is inside the `utils/gameStateHandler.ts`, the client connect through websocket and this file emit events to the client. The client is a simple html with a bunch of javascript code inside it.

I'm not an expert in HTML and CSS, so any help will be appreciated. Also, I recommend a read on [this Reddit post](https://www.reddit.com/r/GlobalOffensive/comments/cjhcpy/game_state_integration_a_very_large_and_indepth/) that explains very well the GSI and what information is available when you're a player and what information are available when you're a spectator.

## Known Problems
The events are not pinpoint precise. There are some delays in the communication between server and client, and CS:GO does add some random delay in the C4 event to avoid people using it to build hacks. But for streaming, it is still cool!

Feel free to create issues and bring more ideas! And again, I appreciate the follow :) https://twitch.tv/rickvdd .

## Usage License
There is no specific license. Feel free to use it as you wish. I ask you to give me the credits and maybe add a link to my twitch channel in your description. Feel free to use it commercially, also.

If you liked this idea and wants to hire me, take a look at [my Curriculum](https://github.com/ricardovsilva/resume)]