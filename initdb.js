const sql = require('better-sqlite3');
const db = sql('stocks.db');

const dummyStocks = [
    {
        stockName: 'Innodata',
        slug: 'innodata',
        currValue: '57.8',
        boughtValue: '70.2',
        quantity: "15.35",
        image: "/images/innodata.png"
    },
    {
        stockName: 'Calestica',
        slug: 'calestica',
        currValue: '320',
        boughtValue: '58',
        quantity: "3.35",
        image: "/images/Calestica.png"
    }, {
        stockName: 'Nvidia',
        slug: 'nvidia',
        currValue: '185',
        boughtValue: '110',
        quantity: "2",
        image: "/images/Nvidia.png"
    }, {
        stockName: 'Amazon',
        slug: 'amazon',
        currValue: '260',
        boughtValue: '322',
        quantity: "0.514",
        image: "/images/Amazon.png"
    }, {
        stockName: 'Tesla',
        slug: 'tesla',
        currValue: '420',
        boughtValue: '350',
        quantity: "0",
        image: "/images/Tesla.png"
    }
];
db.exec("DROP TABLE IF EXISTS stocks");

db.prepare(`
   CREATE TABLE IF NOT EXISTS stocks (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       stockName TEXT NOT NULL UNIQUE,
       slug TEXT NOT NULL UNIQUE,
       currValue TEXT NOT NULL,
       boughtValue TEXT NOT NULL,
       quantity TEXT NOT NULL,
       image TEXT NOT NULL
    )
`).run();

async function initData() {
    const stmt = db.prepare(`
      INSERT INTO stocks VALUES (
         null,
         @stockName,
         @slug,
         @currValue,
         @boughtValue,
         @quantity,
         @image
      )
   `);

    for (const stock of dummyStocks) {
        stmt.run(stock);
    }
}

initData();