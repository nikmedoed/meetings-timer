# Meetings Timer
Helps to plan and track every stage of your activity

![](https://github.com/nikmedoed/gifs-share/blob/main/timer.gif)

This solution allows you to follow the event plan non-linearly.
You can go ahead or be late, the app will help you control the time difference. Switch in stages, as required by the process.
I created this application for online meetings with multiple stages plans and screen demonstration (power point, miro...).

![](src-tauri/icons/icon128x128.png)
## How to use
1. Install the app
2. Create your meetup plan in `.txt` file, use [template](example_plan.txt)
```plain-text
Event name
stage 1 name	time_in_minutes
stage 2 name	time_in_minutes
stage 3 name	time_in_minutes
```
3. Run the app
4. Choose plan
5. Start
6. Switch stages when you're ready
7. Gotcha


## Develop

1. Configure the environment [Tauri + Svelte + TypeScript](https://tauri.app/)
2. Install dependencies via `yarn`, `npm` , `pnpm`
3. Run (`yarn tauri dev`)
4. Build (`yarn tauri build`)


#### Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

## ToDo
- [x] Fix fonts & layout on MacOs
- [ ] Make it movable across the screen
	- [ ] Alignment at the edges of the screen
- [ ] Automating builds via github actions
- [ ] Checking for updates and auto-updating
- [ ] Localization i18
- [ ] Fullscreen mode
- [ ] Scaling

[![Инструкция](https://img.youtube.com/vi/QMqqukRwSs4/0.jpg)](https://youtu.be/QMqqukRwSs4)
