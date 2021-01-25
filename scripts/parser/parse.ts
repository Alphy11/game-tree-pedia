import { promises } from 'fs';
import path from 'path';
import { formatter as coreRulesFormatter } from './CoreRulesFormatter/formatter';
import { formatter as factonListFormatter } from './FactionListFormatter/formatter';
import * as coreRulesTaskDefinitions from './CoreRulesFormatter/taskDefinitions';
import * as factionListTaskDefinitions from './FactionListFormatter/taskDefinitions';
import { analyze } from './analyze';

const { readFile, writeFile } = promises;
const CONTENT_DIR = 'scripts/contentRaw';
const TARGET_DIR = './src/app/content/';

async function parseRules() {
    const file = await (
        await readFile(path.join(CONTENT_DIR, 'POKRules.txt'))
    ).toString();
    const results = analyze(
        file.split('\n'),
        Object.values(coreRulesTaskDefinitions),
    );
    writeFile(
        path.join(TARGET_DIR, 'POKRules.json'),
        JSON.stringify(coreRulesFormatter(results, []), null, 4),
    );
}

async function parseRaces() {
    const file = await (
        await readFile(path.join(CONTENT_DIR, 'FactionList.txt'))
    ).toString();
    const results = analyze(
        file.split('\n'),
        Object.values(factionListTaskDefinitions),
    );
    writeFile(
        path.join(TARGET_DIR, 'FactionList.json'),
        JSON.stringify(factonListFormatter(results, []), null, 4),
    );
}
parseRules();
parseRaces();

export {};
