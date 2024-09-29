let money = 50000;
let stationCapacity = 1; // kW
let upgradeCost = 10000;
let newStationCost = 30000;
let currentPrice = 50; // $/kW
let batteryLevel = 0; // percentage
let charging = false;
let chargeTime = 0; // in seconds
let dischargeTime = 60; // in seconds
let isSelling = false;

function chargeStation() {
    if (batteryLevel < 100 && money >= 0) {
        charging = true;
        chargeTime = 120; // Charging takes 2 minutes to charge 1 kW
        updateCharge();
    }
}

function updateCharge() {
    if (charging) {
        let interval = setInterval(() => {
            if (chargeTime > 0 && batteryLevel < 100) {
                chargeTime--;
                batteryLevel += (1 / 120) * 100; // Increase battery level
                document.getElementById('battery-level').style.width = batteryLevel + '%';
                document.getElementById('battery-timer').innerText = formatTime(chargeTime);
            } else {
                clearInterval(interval);
                charging = false;
                document.getElementById('battery-timer').innerText = '0:00';
            }
        }, 1000);
    }
}

function sellPower() {
    if (!isSelling && batteryLevel > 0) {
        isSelling = true;
        setTimeout(() => {
            isSelling = false;
            batteryLevel = 0; // Reset battery level after selling
            document.getElementById('battery-level').style.width = batteryLevel + '%';
            money += currentPrice; // Increase money by current price
            document.getElementById('money-value').innerText = money;
        }, dischargeTime * 1000);
    }
}

function upgradeStation() {
    if (money >= upgradeCost) {
        stationCapacity++;
        money -= upgradeCost;
        document.getElementById('money-value').innerText = money;
        updateUpgradeCost();
    }
}

function buyNewStation() {
    if (money >= newStationCost) {
        money -= newStationCost;
        document.getElementById('money-value').innerText = money;
        // Logic for buying a new station can be added here
    }
}

function changeStation() {
    // Logic for changing station can be added here
}

function toggleMenu() {
    let sideMenu = document.getElementById('side-menu');
    sideMenu.style.width = sideMenu.style.width === '250px' ? '0' : '250px';
}

function updateUpgradeCost() {
    upgradeCost = Math.floor(upgradeCost * 1.5); // Increase upgrade cost
    document.getElementById('upgrade-station-cost').innerText = 'Upgrade Station: $' + upgradeCost;
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

// Randomly change the power selling price every minute
setInterval(() => {
    currentPrice = Math.floor(Math.random() * 100) + 1; // New price between $1 and $100
    document.getElementById('current-price').innerText = currentPrice;
}, 60000);
