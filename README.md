# xwing-ffg2xws

[![Greenkeeper badge](https://badges.greenkeeper.io/guidokessels/xwing-ffg2xws.svg)](https://greenkeeper.io/)

A simple Node module that takes a X-Wing squad in the [FFG Squadbuilder format](https://squadbuilder.fantasyflightgames.com) and returns the matching [XWS2 JSON object](https://github.com/elistevens/xws-spec/blob/master/README.md).

## Installation

Install using `yarn` or `npm`:

```
$ yarn add xwing-ffg2xws
```

```
$ npm install xwing-ffg2xws --save
```

## API

### convert(squad, map)

- `squad` An object representing the squad ([example](https://squadbuilder.fantasyflightgames.com/api/squads/8d86dd8d-1ff8-4e07-a9cb-37582fe0655f/))
- `map` An object that contains a map from FFG to XWS (We recommend to use the [map file from xwing-data2](https://github.com/guidokessels/xwing-data2/blob/master/data/ffg-xws.json))
- Returns: `Object` A XWS representation of the squad ([XWS spec](https://github.com/elistevens/xws-spec/blob/master/README.md))

An error will be thrown if the squad is invalid or if the squad cannot be converted.

## License
[MIT](http://guidokessels.mit-license.org/)

---

Star Wars, X-Wing: The Miniatures Game and all related properties are owned by Fantasy Flight Games, Lucasfilm Ltd., and/or Disney.
