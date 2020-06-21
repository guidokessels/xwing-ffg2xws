type XWS = {
  description?: string;
  faction: string;
  name: string;
  points?: number;
  pilots: Array<XWSPilot>;
  vendor: XWSVendor;
  version: string;
};

type XWSVendor = {
  [key: string]: {
    builder: string;
    builder_url: string;
    link: string;
  };
};

type XWSSlot = {
  [key: string]: Array<string>;
};

type XWSPilot = {
  id: string;
  ship?: string;
  points?: number;
  upgrades: XWSSlot;
};

type FFG2XWSMap = {
  pilots: { [key: string]: string };
  upgrades: { [key: string]: string };
  slots: { [key: string]: string };
  factions: { [key: string]: string };
  ships: { [key: string]: string };
};

type FFGPilot = {
  id: number;
  name: string;
  ship_type: number;
};

type FFGUpgrade = {
  id: number;
  name: string;
  upgrade_types: Array<number>;
};
type FFGShip = {
  pilot_card: FFGPilot;
  slots: Array<FFGUpgrade>;
  cost: number;
};

type FFGFaction = {
  id: number;
};

type FFGSquad = {
  id: string;
  name: string;
  description: string;
  deck: Array<FFGShip>;
  faction: FFGFaction;
  cost: number;
};

const validateMap = (map: FFG2XWSMap) => {
  if (
    typeof map !== 'object' ||
    typeof map.pilots !== 'object' ||
    typeof map.upgrades !== 'object' ||
    typeof map.slots !== 'object' ||
    typeof map.factions !== 'object'
  ) {
    throw new Error('Invalid map');
  }
};

const validateSquad = (ffgSquad: FFGSquad) => {
  if (typeof ffgSquad !== 'object') {
    throw new Error('Invalid squad');
  }
  if (!ffgSquad.faction || !ffgSquad.faction.id) {
    throw new Error("Invalid squad: Invalid 'faction'");
  }
  if (!Array.isArray(ffgSquad.deck)) {
    throw new Error("Invalid squad: Invalid 'deck'");
  }
};

const createVendor = (id: string): XWSVendor => ({
  ffg: {
    builder: 'FantasyFlightGames Squadbuilder',
    builder_url: 'https://squadbuilder.fantasyflightgames.com',
    link: `https://squadbuilder.fantasyflightgames.com/squad-preview/${id}/`,
  },
});

const convert = (ffgSquad: FFGSquad, xwsMap: FFG2XWSMap): XWS => {
  validateMap(xwsMap);
  validateSquad(ffgSquad);

  const { faction, id, description, name, deck, cost } = ffgSquad;

  const pilots = deck.map(({ pilot_card, slots, cost: points }, index) => {
    const { id: pilotId, name: pilotName, ship_type } = pilot_card;
    const xwsId = xwsMap.pilots[pilotId];
    if (!xwsId) {
      throw new Error(
        `Unknown pilot with ID "${pilotId}" (name: "${pilotName}") in ship ${index + 1}`
      );
    }
    const ship = xwsMap.ships[ship_type];
    const upgrades: XWSSlot = {};
    slots.forEach(({ upgrade_types, id: upgradeId, name: upgradeName = '' }) => {
      const slotId = upgrade_types[0];
      const slot = xwsMap.slots[slotId];
      if (!slot) {
        throw new Error(`Unknown slot with ID "${slotId}" for upgrade "${upgradeName}"`);
      }
      const upgradeXwsID = xwsMap.upgrades[upgradeId];
      if (!upgradeXwsID) {
        throw new Error(
          `Unknown upgrade with ID "${upgradeId}" (name: "${upgradeName}") for pilot ${pilotName}`
        );
      }
      if (!Array.isArray(upgrades[slot])) {
        upgrades[slot] = [];
      }
      upgrades[slot].push(upgradeXwsID);
    });

    const result: XWSPilot = {
      id: xwsId,
      upgrades,
      points,
    };

    // Ship is optional; Add it if we can find it, but don't break if we can't
    if (ship) {
      result.ship = ship;
    }

    return result;
  });

  const xws = {
    name,
    description,
    pilots,
    points: cost,
    faction: xwsMap.factions[faction.id],
    vendor: createVendor(id),
    version: '2.0.0',
  };

  return xws;
};

module.exports = { convert };
