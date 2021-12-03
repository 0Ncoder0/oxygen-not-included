"use strict";
/** 单位：克，焦，秒，千卡，DTU */
exports.__esModule = true;
exports.database = [
    {
        name: '复制人',
        "import": [
            { name: '食物', weight: 1000 / 600 },
            { name: '氧气', weight: 100 }
        ],
        "export": [
            { name: '二氧化碳', weight: 2 },
            { name: '污染土', weight: 6.7 * 1000 }
        ]
    },
    {
        name: '氢气发电机',
        "import": [
            { name: '热量', weight: 4 * 1000 },
            { name: '氢气', weight: 100 }
        ],
        "export": [{ name: '电力', weight: 800 }]
    },
    {
        name: '煤炭发电机',
        "import": [
            { name: '热量', weight: 9 * 1000 },
            { name: '煤炭', weight: 1000 }
        ],
        "export": [
            { name: '电力', weight: 600 },
            { name: '二氧化碳', weight: 20 }
        ]
    },
    {
        name: '电解器',
        "import": [
            { name: '热量', weight: 1.25 * 1000 },
            { name: '水', weight: 1000 },
            { name: '电力', weight: 120 }
        ],
        "export": [
            { name: '氧气', weight: 888 },
            { name: '氢气', weight: 112 }
        ]
    },
    {
        name: '氧气扩散器',
        "import": [
            { name: '热量', weight: 1.5 * 1000 },
            { name: '藻类', weight: 550 },
            { name: '电力', weight: 120 }
        ],
        "export": [{ name: '氧气', weight: 500 }]
    },
    {
        name: '毛刺花',
        "import": [
            { name: '水', weight: (20 * 1000) / 600 },
            { name: '光', weight: 100 }
        ],
        "export": [{ name: '食物', weight: 1600 / 6 / 600 }]
    },
    {
        name: '米虱木',
        "import": [{ name: '泥土', weight: (10 * 1000) / 600 }],
        "export": [{ name: '食物', weight: 600 / 3 / 600 }]
    },
    {
        name: '屋顶光照',
        "import": [
            { name: '热量', weight: 0.5 * 1000 },
            { name: '电力', weight: 10 }
        ],
        "export": [{ name: '光', weight: 500 }]
    },
    {
        name: '反熵热量中和器',
        "import": [{ name: '氢气', weight: 10 }],
        "export": [{ name: '热量', weight: 80 * 1000 }]
    },
    //
    { name: '食物' },
    { name: '氧气' },
    { name: '二氧化碳' },
    { name: '污染土' },
    { name: '煤炭' },
    { name: '藻类' },
    { name: '热量' },
    { name: '泥土' },
    { name: '电力' }
];
