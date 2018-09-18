import { convert } from "../lib/index";
import ffgSquad from "./fixtures/ffg-squad.json";
import ffg2xwsMap from "./fixtures/ffg2xws-map.json";
import xws from "./fixtures/xws.json";
import squadWithUnknownPilot from "./fixtures/unknown-pilot.json";
import squadWithUnknownUpgrade from "./fixtures/unknown-upgrade.json";
import squadWithUnknownSlot from "./fixtures/unknown-slot.json";

describe("xwing-ffg2xws", () => {
  it("throws an error when called with an invalid map", () => {
    let invalidMap;
    expect(() => convert(ffgSquad, invalidMap)).toThrowError("Invalid map");
    invalidMap = {};
    expect(() => convert(ffgSquad, invalidMap)).toThrowError("Invalid map");
    invalidMap = { pilots: {} };
    expect(() => convert(ffgSquad, invalidMap)).toThrowError("Invalid map");
    invalidMap = { pilots: {}, upgrades: {} };
    expect(() => convert(ffgSquad, invalidMap)).toThrowError("Invalid map");
    invalidMap = { pilots: {}, upgrades: {}, slots: {} };
    expect(() => convert(ffgSquad, invalidMap)).toThrowError("Invalid map");
    invalidMap = { pilots: {}, upgrades: {}, slots: {}, factions: {} };
    expect(() => convert(ffgSquad, invalidMap)).not.toThrowError("Invalid map");
  });
  it("throws an error when called with an incorrect FFG squad", () => {
    let invalidSquad;
    expect(() => convert(invalidSquad, ffg2xwsMap)).toThrowError(
      "Invalid squad"
    );
    invalidSquad = {};
    expect(() => convert(invalidSquad, ffg2xwsMap)).toThrowError(
      "Invalid squad: Invalid 'faction'"
    );
    invalidSquad = { faction: {} };
    expect(() => convert(invalidSquad, ffg2xwsMap)).toThrowError(
      "Invalid squad: Invalid 'faction'"
    );
    invalidSquad = { faction: { id: 3 } };
    expect(() => convert(invalidSquad, ffg2xwsMap)).toThrowError(
      "Invalid squad: Invalid 'deck'"
    );
    invalidSquad = { faction: { id: 3 }, deck: [] };
    expect(() => convert(invalidSquad, ffg2xwsMap)).not.toThrowError();
  });
  it("throws an error when it cannot map a pilot", () => {
    expect(() => convert(squadWithUnknownPilot, ffg2xwsMap)).toThrowError(
      `Unknown pilot with ID "99999" (name: "JarJar") in ship 1`
    );
  });
  it("throws an error when it cannot map an upgrade", () => {
    expect(() => convert(squadWithUnknownUpgrade, ffg2xwsMap)).toThrowError(
      `Unknown upgrade with ID "42" (name: "Spinning") for pilot Biggs Darklighter`
    );
  });
  it("throws an error when it cannot map a slot", () => {
    expect(() => convert(squadWithUnknownSlot, ffg2xwsMap)).toThrowError(
      `Unknown slot with ID "1337" for upgrade "Fearless"`
    );
  });
  it("converts an FFG squad to XWS", () => {
    expect(convert(ffgSquad, ffg2xwsMap)).toEqual(xws);
  });
});
