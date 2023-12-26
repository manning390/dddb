import puppet from 'puppeteer';
import fsp from 'fs/promises';

const domain = 'http://dnd5e.wikidot.com';
const outputDir = 'web_scrape/';

async function scrapeIndex(page) {
    await page.goto(domain + '/spells');

    return await page.evaluate(() => {
        return Array.from(
            document.querySelectorAll('.wiki-content-table tr a')
        ).map((el) => el.getAttribute('href'));
    });
}

async function scrapeSpell(page, url) {
    await page.goto(url);

    return await page.evaluate(() => {
        const name = document.querySelector('.page-title').textContent;

        const ps = Array.from(document.querySelectorAll('#page-content p')).map(
            (el) => el.textContent
        );

        return {
            name,
            source: ps[0],
            category: ps[1],
            mechs: ps[2],
            desc: ps.filter((_, i) => i > 2 && i !== ps.length - 1),
            lists: ps[ps.length - 1],
        };
    });
}

(async () => {
    console.log('Starting Spells');
    const browser = await puppet.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    const spells = [];

    const hrefs = await scrapeIndex(page);
    for(let i = 0, l = hrefs.length; i < l; ++i) {
        const spell = await scrapeSpell(page, domain+hrefs[i]);
        spells.push(spell);
    }
    const now = new Date()
        .toLocaleString('en-UK')
        .replace(',', '')
        .replaceAll('/', '-')
        .replaceAll(' ', '_');
    await fsp.writeFile(
        outputDir + `spells_${now}.json`,
        JSON.stringify(spells, null, 2)
    );

    await browser.close();
    console.log('Finished Spells');
})();
