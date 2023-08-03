var mod = {
    EnableProfiler: false,
    // StorageBoundForSpawnRecovery: 10*1000,
    // StorageBoundForSpawn: 15*1000,
    // StorageBoundForGuardian: 18*1000,
    // StorageBoundForAddUpgrader: 50*1000,
    // StorageBoundForPlaceHighLevelStructures: 60*1000,
    // StorageBoundForWallMaintainer: 80*1000,
    // RampartMaintainThreshold: {
        //this value shouldn't be too high since it is used by getRampartSitesCanBuild(),
        //  if it is too high, then rampart site can only be built by bigger builder which
        //  have many limitation.
    //     Lowest: 10*1000,
    //     Low: 60*1000,
    //     Normal: 120*1000,
    // },
    // WallMaxHits: 30*1000*1000,
    // EnergyForDefend: 600,
    // SellExtraResourceBound: 10*1000,
    // RebuildStructures: true,
    // TerminalHelpRoomDistanceMax: 10,
    // TerminalHelpEnergyMin: 10*1000,
    // Storage store configuration
    // StorageReserveForEnergy: 233*1000
};

module.exports = mod;