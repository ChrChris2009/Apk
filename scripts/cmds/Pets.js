const { getTime } = global.utils;

module.exports.config = {
  name: "pet",
  version: "7.0.0",
  hasPermission: 0,
  credits: "chris st",
  description: "ULTIMATE PET UNIVERSE v7.0",
  commandCategory: "Game",
  usages: "[shop/buy/view/feed/train/battle/evolve/daily/explore/...]",
  cooldowns: 2
};

// ===== TA LISTE COMPLETE DE PETS =====
const PET_SHOP = {
  "COMMON": [
    { name: "Puppy", emoji: "🐶", evolve: "🐕", price: 2000000, maxLv: 50, power: 98 },
    { name: "Dog", emoji: "🐕", evolve: "🦮", price: 25000000, maxLv: 75, power: 190 },
    { name: "Kitten", emoji: "🐱", evolve: "🐈", price: 2500000, maxLv: 50, power: 103 },
    { name: "Cat", emoji: "🐈", evolve: "🐈‍⬛", price: 30000000, maxLv: 75, power: 207 },
    { name: "Hamster", emoji: "🐹", evolve: null, price: 2200000, maxLv: 40, power: 110 },
    { name: "Bunny", emoji: "🐰", evolve: "🐇", price: 1800000, maxLv: 40, power: 102 },
    { name: "Mouse", emoji: "🐭", evolve: null, price: 1000000, maxLv: 35, power: 85 },
    { name: "Calf", emoji: "🐮", evolve: "🐄", price: 3000000, maxLv: 45, power: 135 },
    { name: "Piglet", emoji: "🐷", evolve: "🐗", price: 1500000, maxLv: 40, power: 115 },
    { name: "Frog", emoji: "🐸", evolve: null, price: 1200000, maxLv: 38, power: 105 },
    { name: "Duckling", emoji: "🦆", evolve: "🦅", price: 1000000, maxLv: 35, power: 82 }
  ],
  "UNCOMMON": [
    { name: "Wild Rabbit", emoji: "🐇", evolve: null, price: 20000000, maxLv: 60, power: 198 },
    { name: "Cow", emoji: "🐄", evolve: null, price: 18000000, maxLv: 65, power: 227 },
    { name: "Raccoon", emoji: "🦝", evolve: null, price: 25000000, maxLv: 60, power: 190 },
    { name: "Deer", emoji: "🦌", evolve: "🦌🌟", price: 30000000, maxLv: 65, power: 210 },
    { name: "Parrot", emoji: "🦜", evolve: null, price: 50000000, maxLv: 70, power: 215 }
  ],
  "RARE": [
    { name: "Service Dog", emoji: "🦮", evolve: null, price: 150000000, maxLv: 100, power: 370 },
    { name: "Shadow Cat", emoji: "🐈‍⬛", evolve: null, price: 200000000, maxLv: 100, power: 370 },
    { name: "Fox", emoji: "🦊", evolve: "🦊❄️", price: 150000000, maxLv: 80, power: 235 },
    { name: "Wolf", emoji: "🐺", evolve: "🐺👑", price: 200000000, maxLv: 90, power: 250 },
    { name: "Boar", emoji: "🐗", evolve: null, price: 80000000, maxLv: 75, power: 240 },
    { name: "Horse", emoji: "🐴", evolve: "🦄", price: 100000000, maxLv: 80, power: 280 },
    { name: "Dolphin", emoji: "🐬", evolve: "🐬💎", price: 180000000, maxLv: 85, power: 320 },
    { name: "Shark", emoji: "🦈", evolve: "🦈⚡", price: 250000000, maxLv: 95, power: 330 },
    { name: "Octopus", emoji: "🐙", evolve: null, price: 200000000, maxLv: 90, power: 335 },
    { name: "Crocodile", emoji: "🐊", evolve: null, price: 220000000, maxLv: 90, power: 320 },
    { name: "Eagle", emoji: "🦅", evolve: "🦅🌙", price: 300000000, maxLv: 95, power: 325 },
    { name: "Butterfly", emoji: "🦋", evolve: null, price: 120000000, maxLv: 80, power: 260 },
    { name: "Rhino", emoji: "🦏", evolve: null, price: 400000000, maxLv: 100, power: 350 },
    { name: "Elephant", emoji: "🐘", evolve: "🐘👑", price: 500000000, maxLv: 110, power: 425 }
  ],
  "EPIC": [
    { name: "Arctic Fox", emoji: "🦊❄️", evolve: null, price: 800000000, maxLv: 120, power: 420 },
    { name: "Alpha Wolf", emoji: "🐺👑", evolve: null, price: 1000000000, maxLv: 150, power: 460 },
    { name: "Royal Deer", emoji: "🦌🌟", evolve: null, price: 500000000, maxLv: 110, power: 420 },
    { name: "Thunder Shark", emoji: "🦈⚡", evolve: null, price: 1500000000, maxLv: 160, power: 655 },
    { name: "Peacock", emoji: "🦚", evolve: null, price: 600000000, maxLv: 110, power: 345 },
    { name: "Lion", emoji: "🦁", evolve: "🦁🌟", price: 800000000, maxLv: 130, power: 390 },
    { name: "Bear", emoji: "🐻", evolve: "🐻‍❄️", price: 700000000, maxLv: 120, power: 380 },
    { name: "Leopard", emoji: "🐆", evolve: null, price: 900000000, maxLv: 140, power: 425 },
    { name: "Tiger", emoji: "🐅", evolve: "🐅⚡", price: 1100000000, maxLv: 150, power: 455 }
  ],
  "LEGENDARY": [
    { name: "Crystal Dolphin", emoji: "🐬💎", evolve: null, price: 5000000000, maxLv: 200, power: 700 },
    { name: "Moon Eagle", emoji: "🦅🌙", evolve: null, price: 4000000000, maxLv: 200, power: 690 },
    { name: "Unicorn", emoji: "🦄", evolve: "🦄🌟", price: 2000000000, maxLv: 200, power: 400 },
    { name: "Dragon", emoji: "🐉", evolve: "🐲", price: 5000000000, maxLv: 250, power: 475 },
    { name: "Polar Bear", emoji: "🐻‍❄️", evolve: null, price: 3000000000, maxLv: 220, power: 780 },
    { name: "Divine Elephant", emoji: "🐘👑", evolve: null, price: 6000000000, maxLv: 240, power: 890 }
  ],
  "MYTHIC": [
    { name: "Celestial Unicorn", emoji: "🦄🌟", evolve: null, price: 10000000000, maxLv: 300, power: 760 },
    { name: "Ancient Dragon", emoji: "🐲", evolve: "🐲👑", price: 25000000000, maxLv: 400, power: 810 },
    { name: "Solar Lion", emoji: "🦁🌟", evolve: null, price: 8000000000, maxLv: 280, power: 830 },
    { name: "Storm Tiger", emoji: "🐅⚡", evolve: null, price: 9000000000, maxLv: 290, power: 950 },
    { name: "Phoenix", emoji: "🔥🐦", evolve: null, price: 20000000000, maxLv: 500, power: 1140 },
    { name: "Sea Serpent", emoji: "🌊🐉", evolve: null, price: 18000000000, maxLv: 450, power: 1010 },
    { name: "Thunder Hawk", emoji: "⚡🦅", evolve: null, price: 15000000000, maxLv: 400, power: 1060 },
    { name: "Crystal Lion", emoji: "💎🦁", evolve: null, price: 30000000000, maxLv: 550, power: 1260 },
    { name: "Void Wolf", emoji: "🌑🐺", evolve: null, price: 22000000000, maxLv: 480, power: 1200 }
  ],
  "DIVINE": [
    { name: "God Dragon", emoji: "🐲👑", evolve: null, price: 100000000000, maxLv: 600, power: 1500 },
    { name: "Divine Emperor", emoji: "👑", evolve: null, price: 50000000000000, maxLv: 999, power: 2350 }
  ]
};

const SHOP_ITEMS = {
  food: { apple: 50000, meat: 200000, fish: 150000, candy: 100000, bread: 80000 },
  items: { potion: 500000, elixir: 2000000, revive: 5000000, xpboost: 3000000 },
  accessories: { hat: 1000000, collar: 1500000, wings: 10000000, armor: 8000000 }
};

module.exports.onStart = async function({ api, event, args, usersData, currencies, message }) {
  const { senderID } = event;
  const cmd = args[0]?.toLowerCase();
  const user = await usersData.get(senderID);
  const money = await currencies.getData(senderID);

  // Init data
  if (!user.data.pets) user.data.pets = [];
  if (!user.data.petInv) user.data.petInv = { food: {}, items: {}, accessories: {} };
  if (!user.data.petAchievements) user.data.petAchievements = [];
  if (!user.data.weeklyPurchases) user.data.weeklyPurchases = { count: 0, reset: 0 };
  if (!user.data.lastExplore) user.data.lastExplore = 0;
  if (!user.data.lastDaily) user.data.lastDaily = 0;
  if (!user.data.lastCollect) user.data.lastCollect = 0;
  if (user.data.activePet == undefined) user.data.activePet = -1;

  // Reset weekly
  const now = getTime();
  if (now - user.data.weeklyPurchases.reset > 604800000) {
    user.data.weeklyPurchases = { count: 0, reset: now };
  }

  const getActivePet = () => {
    if (user.data.activePet == -1 ||!user.data.pets[user.data.activePet]) {
      message.reply("❌ Aucun pet actif. pet buy <name>");
      return null;
    }
    return user.data.pets[user.data.activePet];
  };

  // ===== HELP =====
  if (!cmd) {
    return message.reply(`🌟 𝖴𝖫𝖳𝖨𝖬𝖠𝖳𝖤 𝖯𝖤𝖳 𝖴𝖭𝖨𝖵𝖤𝖱𝖲𝖤 𝗏𝟩.𝟢 🌟\n\n🛍️ 𝐒𝐇𝐎𝐏:\n• pet shop [rarity] → Voir le shop\n• pet buy <name> → Adopter\n• pet egg bronze/silver/gold\n🐾 𝐏𝐄𝐓 𝐂𝐀𝐑𝐄:\n• pet view/pets/select/inventory\n• pet feed/water/train/evolve\n• pet rename/release/safe\n\n🗺️ 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒:\n• pet explore/daily/collect/quest\n• pet gift @user <item>\n• pet battle @user\n• pet ability/achievements/leaderboard\n\n📅 Weekly Purchases: ${user.data.weeklyPurchases.count}/2\n⚠️ Releasing pets does NOT restore your weekly limit.`);
  }

  // ===== SHOP =====
  if (cmd == "shop") {
    const rarity = args[1]?.toUpperCase();
    if (!rarity) {
      let msg = `🐾 𝖯𝖤𝖳 𝖲𝖧𝖮𝖯 🐾\n💰 Balance: $${money.money.toLocaleString()}\n📅 Weekly: ${user.data.weeklyPurchases.count}/2\n\n`;
      for (const [tier, pets] of Object.entries(PET_SHOP)) msg += `${tier}: ${pets.length} pets\n`;
      return message.reply(msg + `\nUsage: pet shop [RARITY]\n⚠️ Releasing pets does NOT restore weekly limit.`);
    }
    if (!PET_SHOP[rarity]) return message.reply("❌ Rarités: COMMON, UNCOMMON, RARE, EPIC, LEGENDARY, MYTHIC, DIVINE");
    let msg = `🐾 𝖯𝖤𝖳 𝖲𝖧𝖮𝖯 🐾\n💰 Balance: $${money.money.toLocaleString()}\n\n${rarity}:\n\n`;
    PET_SHOP[rarity].forEach(p => {
      msg += `${p.emoji} ${p.name}${p.evolve? ` → ${p.evolve}` : ""}\n💰 $${p.price.toLocaleString()} | Lv.Max ${p.maxLv} | Power ${p.power}\n\n`;
    });
    return message.reply(msg + `📅 Weekly: ${user.data.weeklyPurchases.count}/2\n💡 pet buy <name>`);
  }

  // ===== BUY PET =====
  if (cmd == "buy") {
    const petName = args.slice(1).join(" ");
    if (!petName) return message.reply("Usage: pet buy <pet name>");
    if (user.data.weeklyPurchases.count >= 2) return message.reply("⚠️ Weekly Purchases: 2/2\nReleasing pets does NOT restore your weekly limit.");

    let foundPet = null;
    for (const [rarity, pets] of Object.entries(PET_SHOP)) {
      const pet = pets.find(p => p.name.toLowerCase() == petName.toLowerCase());
      if (pet) { foundPet = {...pet, rarity }; break; }
    }
    if (!foundPet) return message.reply("❌ Pet introuvable. pet shop [rarity]");
    if (money.money < foundPet.price) return message.reply(`❌ Il te faut $${foundPet.price.toLocaleString()}`);

    await currencies.decreaseMoney(senderID, foundPet.price);
    const newPet = {
      name: foundPet.name, emoji: foundPet.emoji, rarity: foundPet.rarity,
      type: foundPet.rarity.toLowerCase(), level: 1, exp: 0,
      hp: foundPet.power * 10, maxHp: foundPet.power * 10,
      atk: Math.floor(foundPet.power / 2), def: Math.floor(foundPet.power / 3),
      hunger: 100, thirst: 100, happy: 100, safe: false, evolved: false,
      maxLv: foundPet.maxLv, evolve: foundPet.evolve, born: getTime(), abilityCD: 0
    };
    user.data.pets.push(newPet);
    user.data.weeklyPurchases.count++;
    if (user.data.activePet == -1) user.data.activePet = 0;
    await usersData.set(senderID, user);
    return message.reply(`🎉 Adopté: ${foundPet.emoji} ${foundPet.name} [${foundPet.rarity}]\n❤️ HP: ${newPet.hp} | ⚔️ ATK: ${newPet.atk}\n📅 Weekly: ${user.data.weeklyPurchases.count}/2`);
  }

  // ===== EGG SYSTEM =====
  if (cmd == "egg") {
    const type = args[1]?.toLowerCase();
    const eggTypes = { bronze: 1000000, silver: 10000000, gold: 50000000 };
    if (!eggTypes[type]) return message.reply("❌ Types: bronze/silver/gold\nUsage: pet egg [type]");
    if (user.data.weeklyPurchases.count >= 2) return message.reply("⚠️ Weekly limit: 2/2");
    if (money.money < eggTypes[type]) return message.reply(`❌ Il te faut $${eggTypes[type].toLocaleString()}`);

    await currencies.decreaseMoney(senderID, eggTypes[type]);
    const rarityPool = type == "gold"? "LEGENDARY" : type == "silver"? "RARE" : "COMMON";
    const pool = PET_SHOP[rarityPool];
    const pet = pool[Math.floor(Math.random() * pool.length)];

    const newPet = {
      name: pet.name, emoji: pet.emoji, rarity: rarityPool,
      type: rarityPool.toLowerCase(), level: 1, exp: 0,
      hp: pet.power * 10, maxHp: pet.power * 10,
      atk: Math.floor(pet.power / 2), def: Math.floor(pet.power / 3),
      hunger: 100, thirst: 100, happy: 100, safe: false, evolved: false,
      maxLv: pet.maxLv, evolve: pet.evolve, born: getTime(), abilityCD: 0
    };
    user.data.pets.push(newPet);
    user.data.weeklyPurchases.count++;
    if (user.data.activePet == -1) user.data.activePet = 0;
    await usersData.set(senderID, user);
    return message.reply(`🥚 Éclosion ${type}!\n🎉 ${pet.emoji} ${pet.name} [${rarityPool}]\n❤️ HP: ${newPet.hp} | ⚔️ ATK: ${newPet.atk}`);
  }

  // ===== VIEW =====
  if (cmd == "view" || cmd == "stats") {
    const p = getActivePet(); if (!p) return;
    const expNeed = p.level * 100;
    return message.reply(`${p.emoji} ${p.name} [${p.rarity}]\n⭐ Niveau: ${p.level}/${p.maxLv} | Exp: ${p.exp}/${expNeed}\n❤️ HP: ${p.hp}/${p.maxHp}\n⚔️ ATK: ${p.atk} | 🛡️ DEF: ${p.def}\n🍖 Faim: ${p.hunger}% | 💧 Soif: ${p.thirst}% | 😊 Bonheur: ${p.happy}%\n${p.evolve? `🔄 Évolution: ${p.evolve}` : ""}\n🛡️ Protégé: ${p.safe? "Oui" : "Non"}\n${p.evolved? "🌟 Évolué" : ""}`);
  }

  // ===== PETS LIST =====
  if (cmd == "pets") {
    if (user.data.pets.length == 0) return message.reply("❌ Aucun pet. pet shop");
    let msg = `🐾 TES PETS [${user.data.pets.length}]\n\n`;
    user.data.pets.forEach((p, i) => {
      msg += `${i == user.data.activePet? "►" : "•"} ${i}. ${p.emoji} ${p.name} Lv.${p.level}/${p.maxLv} [${p.rarity}] ${p.safe? "🛡️" : ""}\n`;
    });
    return message.reply(msg + `\nUsage: pet select [numéro]`);
  }

  // ===== SELECT =====
  if (cmd == "select") {
    const idx = parseInt(args[1]);
    if (isNaN(idx) ||!user.data.pets[idx]) return message.reply("❌ Numéro invalide. pet pets");
    user.data.activePet = idx;
    await usersData.set(senderID, user);
    return message.reply(`✅ Pet actif: ${user.data.pets[idx].emoji} ${user.data.pets[idx].name}`);
  }

  // ===== FEED =====
  if (cmd == "feed") {
    const p = getActivePet(); if (!p) return;
    const food = args[1];
    if (!food ||!user.data.petInv.food || (user.data.petInv.food <= 0)) {
      return message.reply("❌ Pas de nourriture. pet shop food");
    }
    user.data.petInv.food--;
    p.hunger = Math.min(100, p.hunger + 30);
    p.happy = Math.min(100, p.happy + 10);
    await usersData.set(senderID, user);
    return message.reply(`🍖 ${p.name} a mangé!\nFaim: ${p.hunger}% | Bonheur: ${p.happy}%`);
  }

  // ===== WATER =====
  if (cmd == "water") {
    const p = getActivePet(); if (!p) return;
    p.thirst = 100;
    p.happy = Math.min(100, p.happy + 5);
    await usersData.set(senderID, user);
    return message.reply(`💧 ${p.name} a bu!\nSoif: ${p.thirst}%`);
  }

  // ===== TRAIN =====
  if (cmd == "train") {
    const p = getActivePet(); if (!p) return;
    if (p.hunger < 20 || p.thirst < 20) return message.reply("❌ Ton pet a faim/soif");
    if (p.level >= p.maxLv) return message.reply(`❌ Niveau max atteint: ${p.maxLv}`);
    p.hunger -= 15; p.thirst -= 15;
    const expGain = Math.floor(Math.random() * 20) + 10;
    p.exp += expGain;
    if (p.exp >= p.level * 100) {
      p.level++; p.exp = 0;
      p.maxHp += 20; p.hp = p.maxHp;
      p.atk += 5; p.def += 3;
      await usersData.set(senderID, user);
      return message.reply(`🎉 LEVEL UP! ${p.name} Lv.${p.level}\n+20 HP +5 ATK +3 DEF`);
    }
    await usersData.set(senderID, user);
    return message.reply(`💪 Entraînement!\n+${expGain} EXP | ${p.exp}/${p.level * 100}`);
  }

  // ===== EVOLVE =====
  if (cmd == "evolve") {
    const p = getActivePet(); if (!p) return;
    if (!p.evolve) return message.reply("❌ Ce pet ne peut pas évoluer");
    if (p.level < p.maxLv) return message.reply(`❌ Niveau max requis: ${p.maxLv}. Actuel: ${p.level}`);
    if (p.evolved) return message.reply("❌ Déjà évolué");

    let evolvePet = null;
    for (const pets of Object.values(PET_SHOP)) {
      evolvePet = pets.find(x => x.emoji == p.evolve || x.name == p.evolve.replace(/[^\w\s]/gi, '').trim());
      if (evolvePet) break;
    }
    if (!evolvePet) return message.reply("❌ Évolution introuvable");

    p.evolved = true;
    p.name = evolvePet.name;
    p.emoji = evolvePet.emoji;
    p.maxLv = evolvePet.maxLv;
    p.maxHp = evolvePet.power * 10;
    p.hp = p.maxHp;
    p.atk = Math.floor(evolvePet.power / 2);
    p.def = Math.floor(evolvePet.power / 3);
    p.evolve = evolvePet.evolve;
    await usersData.set(senderID, user);
    return message.reply(`✨ ÉVOLUTION!\n${p.emoji} ${p.name}\n❤️ HP: ${p.maxHp}\n⚔️ ATK: ${p.atk} | 🛡️ DEF: ${p.def}`);
  }

  // ===== EXPLORE =====
  if (cmd == "explore") {
    const p = getActivePet(); if (!p) return;
    if (now - user.data.lastExplore < 3600000) {
      const wait = Math.ceil((3600000 - (now - user.data.lastExplore)) / 60000);
      return message.reply(`⏰ Cooldown: ${wait}min`);
    }
    user.data.lastExplore = now;
    const events = [
      { name: "Forêt mystique", loot: 500000, exp: 30 },
      { name: "Grotte sombre", loot: 800000, exp: 50 },
      { name: "Montagne enneigée", loot: 300000, exp: 20 },
      { name: "Plage tropicale", loot: 600000, exp: 40 }
    ];
    const e = events[Math.floor(Math.random() * events.length)];
    await currencies.increaseMoney(senderID, e.loot);
    p.exp += e.exp;
    p.hunger -= 10; p.thirst -= 10;
    await usersData.set(senderID, user);
    return message.reply(`🗺️ ${p.name} a exploré ${e.name}\n💰 Loot: +$${e.loot.toLocaleString()}\n✨ EXP: +${e.exp}`);
  }

  // ===== DAILY =====
  if (cmd == "daily") {
    if (now - user.data.lastDaily < 86400000) {
      const h = Math.floor((86400000 - (now - user.data.lastDaily)) / 3600000);
      return message.reply(`⏰ Reviens dans ${h}h`);
    }
    user.data.lastDaily = now;
    await currencies.increaseMoney(senderID, 2000000);
    user.data.petInv.food.apple = (user.data.petInv.food.apple || 0) + 3;
    user.data.petInv.items.potion = (user.data.petInv.items.potion || 0) + 1;
    await usersData.set(senderID, user);
    return message.reply(`🎁 DAILY CLAIMED!\n💰 +$2,000,000\n🍎 +3 pommes\n💊 +1 potion`);
  }

  // ===== COLLECT =====
  if (cmd == "collect") {
    const hours = Math.floor((now - user.data.lastCollect) / 3600000);
    if (hours < 1) return message.reply(`⏰ Reviens dans ${60 - Math.floor((now - user.data.lastCollect) / 60000)}min`);
    const income = user.data.pets.length * hours * 50000;
    await currencies.increaseMoney(senderID, income);
    user.data.lastCollect = now;
    await usersData.set(senderID, user);
    return message.reply(`💵 Revenu passif: +$${income.toLocaleString()}\n${user.data.pets.length} pets × ${hours}h × $50,000`);
  }

  // ===== SAFE =====
  if (cmd == "safe") {
    const p = getActivePet(); if (!p) return;
    p.safe =!p.safe;
    await usersData.set(senderID, user);
    return message.reply(`🛡️ ${p.name} ${p.safe? "protégé des combats" : "peut combattre"}`);
  }

  // ===== BATTLE =====
  if (cmd == "battle") {
    const target = Object.keys(event.mentions)[0];
    if (!target) return message.reply("Usage: pet battle @user");
    const p1 = getActivePet(); if (!p1) return;
    const targetUser = await usersData.get(target);
    if (!targetUser.data.pets || targetUser.data.activePet == -1) return message.reply("❌ L’adversaire n’a pas de pet actif");
    const p2 = targetUser.data.pets[targetUser.data.activePet];
    if (p1.safe || p2.safe) return message.reply("🛡️ Un des pets est protégé");

    const dmg1 = Math.max(1, p1.atk - p2.def + Math.floor(Math.random() * 10));
    const dmg2 = Math.max(1, p2.atk - p1.def + Math.floor(Math.random() * 10));
    p1.hp -= dmg2; p2.hp -= dmg1;

    let result = "";
    if (p1.hp <= 0 && p2.hp <= 0) result = "🤝 Match nul!";
    else if (p1.hp <= 0) {
      result = `💀 ${p1.name} K.O.!\n🏆 Gagnant: ${p2.name}`;
      p1.hp = 1;
    } else if (p2.hp <= 0) {
      result = `💀 ${p2.name} K.O.!\n🏆 Gagnant: ${p1.name}`;
      p2.hp = 1;
      await currencies.increaseMoney(senderID, 1000000);
      p1.exp += 50;
      result += `\n💰 +$1,000,000 | ✨ +50 EXP`;
    } else {
      result = `⚔️ Combat continue...`;
    }
    p1.hp = Math.max(1, p1.hp); p2.hp = Math.max(1, p2.hp);
    await usersData.set(senderID, user);
    await usersData.set(target, targetUser);
    return message.reply(`⚔️ BATAILLE\n\n${p1.emoji} ${p1.name} Lv.${p1.level}\n❤️ ${p1.hp}/${p1.maxHp} HP | Dégâts: ${dmg1}\n\n${p2.emoji} ${p2.name} Lv.${p2.level}\n❤️ ${p2.hp}/${p2.maxHp} HP | Dégâts: ${dmg2}\n\n${result}`);
  }

  // ===== INVENTORY =====
  if (cmd == "inventory" || cmd == "inv") {
    let msg = `🎒 INVENTAIRE PET\n\n`;
    for (const cat of Object.keys(SHOP_ITEMS)) {
      msg += `**${cat.toUpperCase()}**\n`;
      let empty = true;
      for (const [item, qty] of Object.entries(user.data.petInv[cat])) {
        if (qty > 0) { msg += `• ${item}: ${qty}\n`; empty = false; }
      }
      if (empty) msg += `Vide\n`;
      msg += `\n`;
    }
    return message.reply(msg);
  }

  // ===== RELEASE =====
  if (cmd == "release") {
    if (user.data.activePet == -1) return message.reply("❌ Pas de pet actif");
    const p = user.data.pets[user.data.activePet];
    if (args[1]!= "confirm") return message.reply(`⚠️ Tu vas relâcher ${p.emoji} ${p.name}. Tape: pet release confirm\n⚠️ Weekly limit NOT restored.`);
    user.data.pets.splice(user.data.activePet, 1);
    user.data.activePet = user.data.pets.length > 0? 0 : -1;
    await usersData.set(senderID, user);
    return message.reply(`😢 ${p.name} a été relâché...\n📅 Weekly: ${user.data.weeklyPurchases.count}/2`);
  }

  // ===== LEADERBOARD =====
  if (cmd == "leaderboard") {
    const allUsers = await usersData.getAll();
    const top = allUsers
    .filter(u => u.data.pets && u.data.pets.length > 0)
    .map(u => ({
        name: u.name,
        maxLevel: Math.max(...u.data.pets.map(p => p.level)),
        totalPets: u.data.pets.length
      }))
    .sort((a, b) => b.maxLevel - a.maxLevel)
    .slice(0, 10);
    let msg = `🏆 LEADERBOARD PETS\n\n`;
    top.forEach((u, i) => {
      const medal = i == 0? "🥇" : i == 1? "🥈" : i == 2? "🥉" : `${i + 1}.`;
      msg += `${medal} ${u.name}\n Lv.${u.maxLevel} | ${u.totalPets} pets\n\n`;
    });
    return message.reply(msg);
  }

  return message.reply(`❌ Commande inconnue. Tape: pet`);
};
