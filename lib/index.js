const VERSION = "2.0.0";

const validateMap = map => {
  if (
    typeof map !== "object" ||
    typeof map.pilots !== "object" ||
    typeof map.upgrades !== "object" ||
    typeof map.slots !== "object" ||
    typeof map.factions !== "object"
  ) {
    throw new Error("Invalid map");
  }
};

const validateSquad = ffgSquad => {
  if (typeof ffgSquad !== "object") {
    throw new Error("Invalid squad");
  }
  if (!ffgSquad.faction || !ffgSquad.faction.id) {
    throw new Error("Invalid squad: Invalid 'faction'");
  }
  if (!Array.isArray(ffgSquad.deck)) {
    throw new Error("Invalid squad: Invalid 'deck'");
  }
};

const createVendor = id => ({
  ffg: {
    builder: "FantasyFlightGames Squadbuilder",
    builder_url: "https://squadbuilder.fantasyflightgames.com",
    link: `https://squadbuilder.fantasyflightgames.com/squad_preview/${id}/`
  }
});

const convert = (ffgSquad, xwsMap) => {
  validateMap(xwsMap);
  validateSquad(ffgSquad);

  const { faction, id = "", description = "", name = "", deck = [] } = ffgSquad;

  const pilots = deck.map(({ pilot_card = {}, slots = [] }, index) => {
    const { id: pilotId, name: pilotName = "" } = pilot_card;
    const xwsId = xwsMap.pilots[pilotId];
    if (!xwsId) {
      throw new Error(
        `Unknown pilot with ID "${pilotId}" (name: "${pilotName}") in ship ${index +
          1}`
      );
    }
    const upgrades = {};
    slots.forEach(
      ({ upgrade_types, id: upgradeId, name: upgradeName = "" }) => {
        const slotId = upgrade_types[0];
        const slot = xwsMap.slots[slotId];
        if (!slot) {
          throw new Error(
            `Unknown slot with ID "${slotId}" for upgrade "${upgradeName}"`
          );
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
      }
    );

    return {
      id: xwsId,
      upgrades
    };
  });

  const xws = {
    name,
    description,
    pilots,
    faction: xwsMap.factions[faction.id],
    vendor: createVendor(id),
    version: VERSION
  };

  return xws;
};

module.exports = { convert };
