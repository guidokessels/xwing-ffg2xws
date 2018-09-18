# xwing-ffg2xws

[![Greenkeeper badge](https://badges.greenkeeper.io/guidokessels/xwing-ffg2xws.svg)](https://greenkeeper.io/)

A simple Node module that takes a X-Wing squad in the [FFG Squadbuilder format](https://squadbuilder.fantasyflightgames.com) and returns the matching XWS2 JSON object.

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

- `squad` An object representing the squad ([example](https://squadbuilder.fantasyflightgames.com/api/squads/ec7553f7-4b74-4295-b921-4e8d883b0ba6/))
- `map` An object that contains a map from FFG to XWS (We recommend to use the [map file from xwing-data2](https://github.com/guidokessels/xwing-data2/blob/master/data/ffg-xws.json))
- Returns: `Object` A XWS representation of the squad

An error will be thrown if the squad is invalid or if the squad cannot be converted.

## License
[MIT](http://guidokessels.mit-license.org/)

---

Star Wars, X-Wing: The Miniatures Game and all related properties are owned by Fantasy Flight Games, Lucasfilm Ltd., and/or Disney.
