'use stinct';

const fs = require('fs');
const readline = require('readline');
const rs = fs.createReadStream('./population-pref.csv');
const rl = readline.createInterface({ input: rs, output: {} });
const prefMap = new Map();

rl.on('line', lineString => {
    const cols = lineString.split(',');
    const year = parseInt(cols[0]);
    const prefecture = cols[2];
    const population = parseInt(cols[4]);

    if (year === 2010 || year === 2015) {
        let value = prefMap.get(prefecture);
        if (!value) {
            value = {
                population2010: 0,
                population2015: 0,
                change: null
            };
        }

        if (year === 2010) {
            value.population2010 += population;
        }
        if (year === 2015) {
            value.population2015 += population;
        }
        prefMap.set(prefecture, value);
    }
});

rl.on('close', () => {
    for (let [k, v] of prefMap) {
        v.change = v.population2015 / v.population2010;
    }

    const rankingArray = Array.from(prefMap).sort((p1, p2) => {
        return p2[1].change - p1[1].change;
    });

    const rankingStr = rankingArray.map(([k, v]) => {
        return (
            k + ': ' + v.population2010 + ' => ' + v.population2015 +
            ' 変化率: ' + v.change
        );
    });

    console.log(rankingStr);
});
