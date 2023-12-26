
import puppet from 'puppeteer';
import fsp from 'fs/promises';

const domain = 'http://dnd5e.wikidot.com';
const outputDir = 'web_scrape/';

const hrefs = [
    "/lineage:dragonborn",
    "/lineage:dwarf",
    "/lineage:elf",
    "/lineage:gnome",
    "/lineage:half-elf",
    "/lineage:half-orc",
    "/lineage:halfling",
    "/lineage:human",
    "/lineage:tiefling",
    "/lineage:aarakocra",
    "/lineage:aasimar",
    "/lineage:changeling",
    "/lineage:deep-gnome",
    "/lineage:duergar",
    "/lineage:eladrin",
    "/lineage:fairy",
    "/lineage:firbolg",
    "/lineage:genasi-air",
    "/lineage:genasi-earth",
    "/lineage:genasi-fire",
    "/lineage:genasi-water",
    "/lineage:githyanki",
    "/lineage:githzerai",
    "/lineage:goliath",
    "/lineage:harengon",
    "/lineage:kenku",
    "/lineage:locathah",
    "/lineage:owlin",
    "/lineage:satyr",
    "/lineage:sea-elf",
    "/lineage:shadar-kai",
    "/lineage:tabaxi",
    "/lineage:tortle",
    "/lineage:triton",
    "/lineage:verdan",
    "/lineage:bugbear",
    "/lineage:centaur",
    "/lineage:goblin",
    "/lineage:grung",
    "/lineage:hobgoblin",
    "/lineage:kobold",
    "/lineage:lizardfolk",
    "/lineage:minotaur",
    "/lineage:orc",
    "/lineage:shifter",
    "/lineage:yuan-ti",
];

async function scrapeLineage(page, url) {
    await page.goto(url);

    return await page.evaluate(() => {
        const name = document.querySelector('.page-title').textContent;
        const contentTags = document.querySelector('#page-content').children;
        const output = {name, sections: []};
        let bus = {body: ''};
        Array.from(contentTags).forEach((tag) => {
            switch (true) {
                case tag.tagName === 'H1':
                    if (bus !== undefined) output.sections.push(bus);
                    return bus = {name: tag.textContent, body: ''};
                case tag.tagName === 'H2':
                    return bus.body += '## '+tag.textContent + '\n';
                case tag.tagName === 'P':
                    return bus.body += tag.textContent + '\n';
                case tag.tagName === 'UL':
                    return bus.body += '- '+tag.textContent.trim() + '\n';
                case tag.tagName === 'TABLE':
                    const rows = tag.querySelectorAll('tr')
                    bus.body += '<table>\n';
                    rows.forEach((row) => bus.body += Array.from(row.querySelectorAll('td,th')).map((el) => el.textContent).join(',')+'\n')
                    bus.body += '</table>\n';
                    return;
                default:
                    return;
            }
        });
        output.sections.push(bus); // Close out the last one

        output.sections = output.sections.filter((b) => !!b?.body.length);

        return output;
    });
}

(async () => {
    console.log('Starting Lineage');
    const browser = await puppet.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    const output = [];

    for(let i = 0, l = hrefs.length; i < l; ++i) {
        const data = await scrapeLineage(page, domain+hrefs[i]);
        output.push(data);
    }
    const now = new Date()
        .toLocaleString('en-UK')
        .replace(',', '')
        .replaceAll('/', '-')
        .replaceAll(' ', '_');
    await fsp.writeFile(
        outputDir + `lineage_${now}.json`,
        JSON.stringify(output, null, 2)
    );

    await browser.close();
    console.log('Finished Lineage');
})();
