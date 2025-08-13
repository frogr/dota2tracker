// Data mappings for heroes and items

export const heroNames = {
    1: "Anti-Mage", 2: "Axe", 3: "Bane", 4: "Bloodseeker", 5: "Crystal Maiden",
    6: "Drow Ranger", 7: "Earthshaker", 8: "Juggernaut", 9: "Mirana", 10: "Morphling",
    11: "Shadow Fiend", 12: "Phantom Lancer", 13: "Puck", 14: "Pudge", 15: "Razor",
    16: "Sand King", 17: "Storm Spirit", 18: "Sven", 19: "Tiny", 20: "Vengeful Spirit",
    21: "Windranger", 22: "Zeus", 23: "Kunkka", 25: "Lina", 26: "Lion",
    27: "Shadow Shaman", 28: "Slardar", 29: "Tidehunter", 30: "Witch Doctor", 31: "Lich",
    32: "Riki", 33: "Enigma", 34: "Tinker", 35: "Sniper", 36: "Necrophos",
    37: "Warlock", 38: "Beastmaster", 39: "Queen of Pain", 40: "Venomancer", 41: "Faceless Void",
    42: "Wraith King", 43: "Death Prophet", 44: "Phantom Assassin", 45: "Pugna", 46: "Templar Assassin",
    47: "Viper", 48: "Luna", 49: "Dragon Knight", 50: "Dazzle", 51: "Clockwerk",
    52: "Leshrac", 53: "Nature's Prophet", 54: "Lifestealer", 55: "Dark Seer", 56: "Clinkz",
    57: "Omniknight", 58: "Enchantress", 59: "Huskar", 60: "Night Stalker", 61: "Broodmother",
    62: "Bounty Hunter", 63: "Weaver", 64: "Jakiro", 65: "Batrider", 66: "Chen",
    67: "Spectre", 68: "Ancient Apparition", 69: "Doom", 70: "Ursa", 71: "Spirit Breaker",
    72: "Gyrocopter", 73: "Alchemist", 74: "Invoker", 75: "Silencer", 76: "Outworld Destroyer",
    77: "Lycan", 78: "Brewmaster", 79: "Shadow Demon", 80: "Lone Druid", 81: "Chaos Knight",
    82: "Meepo", 83: "Treant Protector", 84: "Ogre Magi", 85: "Undying", 86: "Rubick",
    87: "Disruptor", 88: "Nyx Assassin", 89: "Naga Siren", 90: "Keeper of the Light", 91: "Io",
    92: "Visage", 93: "Slark", 94: "Medusa", 95: "Troll Warlord", 96: "Centaur Warrunner",
    97: "Magnus", 98: "Timbersaw", 99: "Bristleback", 100: "Tusk", 101: "Skywrath Mage",
    102: "Abaddon", 103: "Elder Titan", 104: "Legion Commander", 105: "Techies", 106: "Ember Spirit",
    107: "Earth Spirit", 108: "Underlord", 109: "Terrorblade", 110: "Phoenix", 111: "Oracle",
    112: "Winter Wyvern", 113: "Arc Warden", 114: "Monkey King", 119: "Dark Willow", 120: "Pangolier",
    121: "Grimstroke", 123: "Hoodwink", 126: "Void Spirit", 128: "Snapfire", 129: "Mars",
    135: "Dawnbreaker", 136: "Marci", 137: "Primal Beast", 138: "Muerta"
};

// Hero image name mappings for CDN
const heroImageMap = {
    1: 'antimage', 2: 'axe', 3: 'bane', 4: 'bloodseeker', 5: 'crystal_maiden',
    6: 'drow_ranger', 7: 'earthshaker', 8: 'juggernaut', 9: 'mirana', 10: 'morphling',
    11: 'nevermore', 12: 'phantom_lancer', 13: 'puck', 14: 'pudge', 15: 'razor',
    16: 'sand_king', 17: 'storm_spirit', 18: 'sven', 19: 'tiny', 20: 'vengefulspirit',
    21: 'windrunner', 22: 'zuus', 23: 'kunkka', 25: 'lina', 26: 'lion',
    27: 'shadow_shaman', 28: 'slardar', 29: 'tidehunter', 30: 'witch_doctor', 31: 'lich',
    32: 'riki', 33: 'enigma', 34: 'tinker', 35: 'sniper', 36: 'necrolyte',
    37: 'warlock', 38: 'beastmaster', 39: 'queenofpain', 40: 'venomancer', 41: 'faceless_void',
    42: 'skeleton_king', 43: 'death_prophet', 44: 'phantom_assassin', 45: 'pugna', 46: 'templar_assassin',
    47: 'viper', 48: 'luna', 49: 'dragon_knight', 50: 'dazzle', 51: 'rattletrap',
    52: 'leshrac', 53: 'furion', 54: 'life_stealer', 55: 'dark_seer', 56: 'clinkz',
    57: 'omniknight', 58: 'enchantress', 59: 'huskar', 60: 'night_stalker', 61: 'broodmother',
    62: 'bounty_hunter', 63: 'weaver', 64: 'jakiro', 65: 'batrider', 66: 'chen',
    67: 'spectre', 68: 'ancient_apparition', 69: 'doom_bringer', 70: 'ursa', 71: 'spirit_breaker',
    72: 'gyrocopter', 73: 'alchemist', 74: 'invoker', 75: 'silencer', 76: 'obsidian_destroyer',
    77: 'lycan', 78: 'brewmaster', 79: 'shadow_demon', 80: 'lone_druid', 81: 'chaos_knight',
    82: 'meepo', 83: 'treant', 84: 'ogre_magi', 85: 'undying', 86: 'rubick',
    87: 'disruptor', 88: 'nyx_assassin', 89: 'naga_siren', 90: 'keeper_of_the_light', 91: 'wisp',
    92: 'visage', 93: 'slark', 94: 'medusa', 95: 'troll_warlord', 96: 'centaur',
    97: 'magnataur', 98: 'shredder', 99: 'bristleback', 100: 'tusk', 101: 'skywrath_mage',
    102: 'abaddon', 103: 'elder_titan', 104: 'legion_commander', 105: 'techies', 106: 'ember_spirit',
    107: 'earth_spirit', 108: 'abyssal_underlord', 109: 'terrorblade', 110: 'phoenix', 111: 'oracle',
    112: 'winter_wyvern', 113: 'arc_warden', 114: 'monkey_king', 119: 'dark_willow', 120: 'pangolier',
    121: 'grimstroke', 123: 'hoodwink', 126: 'void_spirit', 128: 'snapfire', 129: 'mars',
    135: 'dawnbreaker', 136: 'marci', 137: 'primal_beast', 138: 'muerta'
};

// Item name mappings for CDN
const itemMap = {
    1: 'blink', 2: 'blades_of_attack', 3: 'broadsword', 4: 'chainmail',
    5: 'claymore', 6: 'helm_of_iron_will', 7: 'javelin', 8: 'mithril_hammer',
    9: 'platemail', 10: 'quarterstaff', 11: 'quelling_blade', 12: 'ring_of_protection',
    13: 'gauntlets', 14: 'slippers', 15: 'mantle', 16: 'branches',
    17: 'belt_of_strength', 18: 'boots_of_elves', 19: 'robe', 20: 'circlet',
    21: 'ogre_axe', 22: 'blade_of_alacrity', 23: 'staff_of_wizardry', 24: 'ultimate_orb',
    25: 'gloves', 26: 'lifesteal', 27: 'ring_of_regen', 28: 'sobi_mask',
    29: 'boots', 30: 'gem', 31: 'cloak', 32: 'talisman_of_evasion',
    34: 'magic_stick', 36: 'magic_wand', 37: 'ghost', 38: 'clarity',
    39: 'flask', 40: 'dust', 41: 'bottle', 42: 'ward_observer',
    43: 'ward_sentry', 44: 'tango', 45: 'courier', 46: 'tpscroll',
    48: 'travel_boots', 50: 'phase_boots', 63: 'power_treads',
    65: 'hand_of_midas', 67: 'oblivion_staff', 69: 'medallion_of_courage',
    73: 'bracer', 75: 'wraith_band', 77: 'null_talisman', 79: 'mekansm',
    81: 'vladmir', 86: 'buckler', 88: 'ring_of_basilius', 90: 'pipe',
    92: 'urn_of_shadows', 94: 'headdress', 96: 'sheepstick', 98: 'orchid',
    100: 'cyclone', 102: 'force_staff', 104: 'dagon', 106: 'necronomicon',
    108: 'ultimate_scepter', 110: 'refresher', 112: 'assault', 114: 'heart',
    116: 'black_king_bar', 117: 'aegis', 119: 'shivas_guard', 121: 'bloodstone',
    123: 'sphere', 125: 'vanguard', 127: 'blade_mail', 129: 'soul_ring',
    131: 'hood_of_defiance', 133: 'rapier', 135: 'monkey_king_bar', 137: 'radiance',
    139: 'butterfly', 141: 'greater_crit', 143: 'basher', 145: 'bfury',
    147: 'manta', 149: 'lesser_crit', 151: 'armlet', 152: 'invis_sword',
    154: 'sange_and_yasha', 156: 'satanic', 158: 'mjollnir', 160: 'skadi',
    162: 'sange', 164: 'helm_of_the_dominator', 166: 'maelstrom', 168: 'desolator',
    170: 'yasha', 172: 'mask_of_madness', 174: 'diffusal_blade', 176: 'ethereal_blade',
    178: 'soul_booster', 180: 'arcane_boots', 181: 'orb_of_venom', 185: 'ancient_janggo',
    187: 'veil_of_discord', 190: 'rod_of_atos', 206: 'rod_of_atos', 208: 'abyssal_blade',
    210: 'heavens_halberd', 212: 'ring_of_aquila', 214: 'tranquil_boots', 215: 'shadow_amulet',
    220: 'travel_boots_2', 223: 'meteor_hammer', 225: 'nullifier', 226: 'lotus_orb',
    229: 'solar_crest', 231: 'guardian_greaves', 232: 'aether_lens', 234: 'octarine_core',
    235: 'dragon_lance', 236: 'faerie_fire', 237: 'enchanted_mango', 240: 'blight_stone',
    242: 'crimson_guard', 244: 'wind_lace', 247: 'moon_shard', 249: 'silver_edge',
    250: 'bloodthorn', 252: 'echo_sabre', 254: 'glimmer_cape', 256: 'aeon_disk',
    257: 'tome_of_knowledge', 259: 'kaya', 261: 'trident', 263: 'hurricane_pike',
    265: 'infused_raindrop', 267: 'spirit_vessel', 269: 'holy_locket', 271: 'vambrace',
    273: 'kaya_and_sange', 277: 'yasha_and_kaya', 287: 'keen_optic', 288: 'grove_bow',
    289: 'quickening_charm', 290: 'philosophers_stone', 291: 'force_boots', 292: 'desolator_2',
    294: 'swift_blink', 295: 'arcane_blink', 296: 'overwhelming_blink', 297: 'aghanims_shard',
    299: 'mage_slayer', 301: 'eternal_shroud', 302: 'elixer', 304: 'faded_broach',
    306: 'paladin_sword', 309: 'stormcrafter', 311: 'penta_edged_sword', 312: 'princes_knife',
    313: 'phylactery', 325: 'princes_knife', 326: 'spider_legs', 328: 'possessed_mask',
    330: 'witchblade', 331: 'penta_edged_sword', 334: 'imp_claw', 335: 'flicker',
    336: 'spy_gadget', 349: 'arcane_ring', 354: 'ocean_heart', 355: 'broom_handle',
    356: 'trusty_shovel', 357: 'nether_shawl', 358: 'wizard_glass', 359: 'fluffy_hat',
    360: 'clumsy_net', 361: 'enchanted_quiver', 362: 'ninja_gear', 363: 'illusionsts_cape',
    364: 'havoc_hammer', 365: 'panic_button', 366: 'apex', 367: 'ballista',
    368: 'woodland_striders', 370: 'demonicon', 371: 'fallen_sky', 372: 'pirate_hat',
    373: 'dimensional_doorway', 374: 'ex_machina', 375: 'fae_grenade', 376: 'ceremonial_robe',
    377: 'psychic_headband', 378: 'book_of_shadows', 379: 'giants_ring', 381: 'craggy_coat',
    485: 'blitz_knuckles', 533: 'witch_blade', 534: 'wind_waker', 569: 'orb_of_corrosion',
    571: 'firecrackers', 573: 'elven_tunic', 574: 'cloak_of_flames', 575: 'venom_gland',
    576: 'trickster_cloak', 577: 'ninja_gear', 585: 'stormcrafter', 588: 'overflowing_elixir',
    589: 'mysterious_hat', 593: 'fluffy_hat', 594: 'orb_of_destruction', 596: 'falcon_blade',
    597: 'mage_slayer', 598: 'unbounded_sphere', 599: 'ring_of_tarrasque', 600: 'tiara_of_selemene',
    603: 'swift_blink', 604: 'arcane_blink', 606: 'overwhelming_blink', 608: 'harpoon',
    609: 'helm_of_the_overlord', 610: 'gungir', 611: 'ethereal_blade_2', 612: 'witch_blade',
    633: 'rapier_2', 635: 'aghanims_shard', 638: 'voodoo_mask', 640: 'quicksilver_amulet',
    653: 'shadow_dagger', 655: 'parasma', 672: 'khanda', 674: 'arcane_scout',
    675: 'barricade', 676: 'harpoon', 677: 'occult_bracelet', 678: 'tome_of_omniscience',
    680: 'seeds_of_serenity', 686: 'elven_bracers', 692: 'eternal_shroud', 725: 'aghanims_blessing',
    727: 'guardian_shell', 731: 'satchel', 821: 'diadem', 824: 'health_potion',
    825: 'magic_potion', 826: 'ambrosia', 827: 'icarus_wings', 828: 'force_field',
    829: 'boots_of_bearing', 834: 'witchbane', 835: 'gungir_2', 836: 'force_boots',
    837: 'desolator_3', 838: 'mirror_shield', 840: 'telescope', 908: 'destination',
    911: 'revenants_brooch', 931: 'satchel'
};

// Get hero icon URL
export function getHeroIcon(heroId) {
    const imageName = heroImageMap[heroId];
    if (!imageName) return '';
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${imageName}.png`;
}

// Get item icon URL
export function getItemIcon(itemId) {
    if (!itemId || itemId === 0) return '';
    const imageName = itemMap[itemId];
    if (!imageName) {
        // Generic recipe image for unknown recipes
        if (itemId >= 317 && itemId <= 400) return 'recipe';
        return '';
    }
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/${imageName}.png`;
}

// Game mode mappings
export const gameModes = {
    1: 'All Pick',
    2: 'Captains Mode',
    3: 'Random Draft',
    4: 'Single Draft',
    5: 'All Random',
    22: 'Ranked',
    23: 'Turbo',
    12: 'Least Played',
    14: 'Limited Heroes'
};

// Rank tier mappings
export const rankTiers = {
    10: { name: 'Herald', medal: '🥉', minMMR: 0 },
    20: { name: 'Guardian', medal: '🛡️', minMMR: 770 },
    30: { name: 'Crusader', medal: '🗡️', minMMR: 1540 },
    40: { name: 'Archon', medal: '🏅', minMMR: 2310 },
    50: { name: 'Legend', medal: '⭐', minMMR: 3080 },
    60: { name: 'Ancient', medal: '⚔️', minMMR: 3850 },
    70: { name: 'Divine', medal: '💎', minMMR: 4620 },
    80: { name: 'Immortal', medal: '🔥', minMMR: 5420 }
};

// Get rank information from MMR or rank tier
export function getRankInfo(mmr, rankTier) {
    if (!mmr && !rankTier) return null;
    
    let estimatedMMR = mmr;
    if (!mmr && rankTier) {
        const medal = Math.floor(rankTier / 10);
        const stars = rankTier % 10;
        estimatedMMR = (medal * 700) + (stars * 100);
    }
    
    // Find appropriate rank
    let rank = rankTiers[10]; // Default to Herald
    for (const [tier, info] of Object.entries(rankTiers)) {
        if (estimatedMMR >= info.minMMR) {
            rank = info;
        }
    }
    
    return {
        ...rank,
        mmr: estimatedMMR
    };
}