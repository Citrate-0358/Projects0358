Even though we wrote it to go up to 5 pages, it may not detect new results due to dynamic rendering (SPA/React)
But a Modified Script Does:
tools:
--Node.js 
--Puppeteer:
*Puppeteer is a Node.js library that lets you control a real browser (like Chrome) with code.
*Scrape data from dynamic pages (like Shodan, which uses JavaScript) where there is shadow dom 

SHADOW DOM:
Shodan now loads IP data in a shadow DOM or virtual rendering, meaning:
The IPs appear visually, but aren't available in document.querySelectorAll()
Even if you "see" the IPs, JavaScript running inside Chrome Extensions can’t access them directly through normal DOM selectors
