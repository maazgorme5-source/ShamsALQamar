const fs = require('fs');
let data = fs.readFileSync('src/data/PortfolioData.ts', 'utf8');
data = data.replace(/thumbnail\?id=&sz=w1000/g, 'uc?export=view&id=');
fs.writeFileSync('src/data/PortfolioData.ts', data);
