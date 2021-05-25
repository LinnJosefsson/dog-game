![](https://media.giphy.com/media/h7Ft1qPnW1egSSlslC/giphy.gif)

# Feed the Corgi

In this project we built a game with Phaser 3. Your player is an adorable corgi, and the goal is to eat fruits, vegetables and chicken but be on the lookout and avoid the dreaded vacuums! Kudos to you if you can to play the whole game with music on :grimacing:

# Game Preview

[Feed the Corgi](https://carrotcorgi.netlify.app/)

# Installation

- after cloning or downloading the repo, cd into the folder containing it
- open up your terminal and:
  - `npm install` to get all the plugins
  - `npm start` to start the game

# Changelog

- [#1 - Implemented a Phaser starter template, added our Game scene, changed bg and created a Title Scene](https://github.com/LinnJosefsson/dog-game/commit/a31c853922b2c3f461936bb0b6ce05ac64089eca)
- [#2 - Created Winter Scene, Rule Scene and an End Scene, added music and sounds and some small fixes](https://github.com/LinnJosefsson/dog-game/pull/2)
- [#3 - Vacuum/enemy moves in GameScene](https://github.com/LinnJosefsson/dog-game/pull/3)
- [#4 - Vacuum/enemy moves in WinterScene](https://github.com/LinnJosefsson/dog-game/pull/4)
- [#5 - Deploys with assets folder](https://github.com/LinnJosefsson/dog-game/pull/6)
- [#6 - README updates, stopped debug mode, started music](https://github.com/LinnJosefsson/dog-game/pull/7)
- [#7 - Resized game](https://github.com/LinnJosefsson/dog-game/pull/8)
- [#8 - vacuum cleaners are evil](https://github.com/LinnJosefsson/dog-game/pull/9)

# Code Review

1. `TitleScene.js:46` - It would be nice to have some type of indication that the input field for the dog's name is in focus. It's not really clear that you can start typing.
2. Not sure if it's intended, but the moving vacuums doesn't do any damage on the player, could be a little confusing.
3. `TitleScene.js:278` - You could add a check that prompts a game over if score is less than zero.
4. `TitleScene.js:247` - It's not really clear that you have to click the "Winter Wonderland" button in order to move on to the next level. Maybe you could add something that automatically sends the player to the next scene at a certain X value?
5. `WinterScene.js:252` - Same thing here, it would be nice to automatically be shown your score at the end of the scene.
6. It would be fun to be able to win or lose the game.
7. `TitleScene.js:278 & WinterScene.js:277` - When you touch a vacuum, it keeps on damaging the player forever, maybe you could add something that makes you invincible for a couple of seconds after taking damage.
8. `TitleScene.js:36` - The sound on/off feature is really nice!
9. Nice parallax background!
10. `EndScene.js:24-32` - Maybe you could present the dog's name on the end screen, since it's not shown anywhere in the game.

# Testers

Tested by the following people:


1. Gilda Eklöf
2. Evelyn Fredin
3. Ida From
4. John Doe

Tested by the following muggles (non-coders):

1. Peter Szabo
2. Marie Pell
3. Liza Madarasz
4. Ellen Danielsson
