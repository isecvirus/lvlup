
class LvlUp {
    constructor(container, settings) {
        this.container = container;
        this.settings = settings;
        this.bars = [];
        this.total = 0;
        this.taken_points = 0;
        this.current_level;
    }

    getPoints() {
        /* taken points for this level */

        const levels = this.settings.levels;
        let points = 0;

        for (const name in levels) {
            let point = levels[name]?.value;
            point = point ? point : 0;

            points += point;
        }

        return points;
    }

    create() {
        const lvlup = document.querySelector(this.container);
        const points = this.settings.options.points;
        const levels = this.settings.levels;

        lvlup.style = `
        display: flex;
        width: fit-content;
        flex-direction: row;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        gap: 5px;`;

        for (const name in levels) {
            let globalShowLabel = this.settings.options.label;
            let showLabel = levels[name]?.label;
            const progressPoint = levels[name].point;
            let progressValue = levels[name]?.value || 0;

            let labelColor = "#cfcfcf";
            const theme = this.settings.options.theme;

            this.total += progressPoint;
            this.taken_points += progressValue;


            if (!globalShowLabel) {
                showLabel = false;
            } else {
                showLabel = true;
            }

            if (progressValue >= 100) {
                labelColor = theme;
            };

            const lvl = document.createElement("div");
            lvl.classList.add("level-458aa88bfc22bf7f52f48450274c894f");
            lvlup.appendChild(lvl);

            const progressBar = document.createElement("progress");
            progressBar.min = 0;
            progressBar.max = 100;
            // progressBar.value = progressValue;
            // progressBar.style.backgroundColor = "transparent";
            progressBar.style.setProperty("--theme", theme);
            this.bars.push(progressBar);

            lvl.appendChild(progressBar);

            if (showLabel) {
                const label = document.createElement("span");
                label.textContent = levels[name]['point'];
                label.style.setProperty("--theme", theme);

                lvl.appendChild(label);
            }

            let CSSs = levels[name]?.css;

            if (CSSs) {
                Object.entries(CSSs).forEach(function ([k, v]) {
                    progressBar.style[k] = v;
                });
            }
        }

        this.current_level = Object.keys(levels)[0];
        this.taken_points = Math.min(this.taken_points, this.total);

        console.log(`points: ${this.taken_points}/${this.total}`);
    }

    setProgress(n) {
        for (var i = 0; i < this.bars.length; i++) {
            const bar = this.bars[i];
            const level = Object.keys(this.settings.levels)[i];

            const level_settings = this.settings.levels[level];
            const points = level_settings.point;
            const taken = level_settings.value;
            const percent = Math.min(taken / points * 100, 100);

            if (percent > 0) {
                this.current_level = level;
                bar.value = percent;
            }
        }
    }

    getLevel() {
        return this.current_level;
    }

    getBars() {
        return this.bars;
    }
}

const lu = new LvlUp(".player-level", {
    levels: {
        "amateur": {
            point: 100,
            value: 100
        },
        "beginner": {
            point: 250,
            value: 250
        },
        "hacker": {
            point: 650,
            value: 650
        },
        "elite": {
            point: 1250
        },
        "master": {
            point: 2350
        },
        "guru": {
            point: 4950
        }
    },
    options: {
        theme: "#ff0000",
        points: 3330,
        label: true
    }
});
lu.create();
lu.setProgress(5000);
console.log(lu.getLevel())
console.log(lu.getPoints());