const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const searchQuery = 'nginx'; // ← Change this to anything
  const maxPages = 5;
  const outputFile = 'shodan_ips.txt';
  const ips = new Set();

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
    const url = `https://www.shodan.io/search?query=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
    console.log(`🔎 Visiting: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for content to fully render

    const found = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const matches = bodyText.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);
      return matches ? [...new Set(matches)] : [];
    });

    console.log(`✅ Page ${pageNum}: Found ${found.length} possible IPs`);
    found.forEach(ip => ips.add(ip));
  }

  await browser.close();

  // Filter false positives: keep only public IPv4s
  const finalIps = [...ips].filter(ip => {
    return !ip.startsWith("10.") &&
           !ip.startsWith("192.168.") &&
           !ip.startsWith("172.16.") &&
           !ip.startsWith("127.");
  });

  fs.writeFileSync(outputFile, finalIps.join('\n'));
  console.log(`💾 Done! Saved ${finalIps.length} public IPs to ${outputFile}`);
})();
