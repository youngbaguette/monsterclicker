var killCount = 0;
var heroLvl = 0;
var heroCost = 15;
var linkLvl = 0;
var linkCost = 45;
var playerGold = 0;

// use to kill one monster
function kill(){
    killCount ++;
    playerGold += Math.floor((Math.random() * 3) + 1);
    update();
}

// use to kill several monsters at once
function kills(monsters) {
    killCount += monsters;
    for (var i = 0; i < monsters; i++){
        playerGold += Math.floor((Math.random() * 3) + 1);
    };
    update();
}

// unga bunag?
// saves game
function save(){
    localStorage.setItem("killCount", killCount);
    localStorage.setItem("heroLvl", heroLvl);
    localStorage.setItem("linkLvl", linkLvl);
    localStorage.setItem("playerGold", playerGold);
}

// loads game from locally stored data
function load(){
    killCount = localStorage.getItem("killCount");
    killCount = parseInt(killCount);
    heroLvl = localStorage.getItem("heroLvl");
    heroLvl = parseInt(heroLvl);
    updateHeroCost();
    linkLvl = localStorage.getItem("linkLvl");
    linkLvl = parseInt(linkLvl);
    updateLinkCost();
    playerGold = localStorage.getItem("playerGold");
    playerGold = parseInt(playerGold);
    update()
}

// update the game gui
function update(){
    document.getElementById('monsterKills').innerHTML = killCount;
    document.getElementById('gold').innerHTML = playerGold;
    document.getElementById('ammountHero').innerHTML = "You have " + heroLvl + " heroes";
    document.getElementById('costHero').innerHTML = heroCost + " Gold"
    document.getElementById('ammountLink').innerHTML = "You have " + linkLvl + " Link";
    document.getElementById('costLink').innerHTML = linkCost + " Gold";
}

// runs once every second, incrementing the kills done by npcs
setInterval(() => {
    var monstersKilled = 0;
    monstersKilled += heroLvl + (Math.floor(heroLvl * (1/4)));
    monstersKilled += (linkLvl * 2) + Math.floor((1/4) * Math.pow(linkLvl, 2));
    kills(monstersKilled);
    update()
}, 1000)

// buying npcs
function buyHero(){
    if(playerGold >= heroCost){
        playerGold -=heroCost;
        heroLvl ++;
        updateHeroCost();
        update()
    }
}
function buyLink(){
    if(playerGold >= linkCost){
        playerGold -= linkCost;
        linkLvl++;
        updateLinkCost();
        update()
    }
}

// setting npc costs
function updateHeroCost() {
    heroCost = 15 + heroLvl + (Math.floor((1/8) * Math.pow(heroLvl, 3)));
}
function updateLinkCost() {
    linkCost = 45 + linkLvl + (Math.floor((1/2) * Math.pow(linkLvl, 3)));
}
