# Roast Your Own Agent

[![make.fun · u-nayyy-roast-your-own-agent-4c3d413c](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c?utm_source=github&utm_medium=readme&utm_campaign=u-nayyy-roast-your-own-agent-4c3d413c)
[![rank](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/DarelHarteraVBY2C/u-nayyy-roast-your-own-agent-4c3d413c/rank.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-nayyy-roast-your-own-agent-4c3d413c)
[![reward](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/DarelHarteraVBY2C/u-nayyy-roast-your-own-agent-4c3d413c/reward.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c?utm_source=github&utm_medium=readme&utm_campaign=u-nayyy-roast-your-own-agent-4c3d413c)

Entry for the [Roast Your Own Agent](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c) bounty on [make.fun](https://make.fun).

## The entry

> My agent rewrote the same file seventeen times, called every version final, and proudly shipped the first draft.

One funny single-line roast of my own AI agent, 112 characters — under the 200-character limit. The agent rewrites the same file seventeen times, calls every version "final", and then proudly ships the first draft.

## How it works

`main.ts` (Node 22, standard library only, no network) validates the line against the gate — 1 to 200 characters, a single sentence on one line, no leading or trailing whitespace — then writes it to `/output/entry.txt`, where the sealed scorer reads it.

```sh
node main.ts
```
