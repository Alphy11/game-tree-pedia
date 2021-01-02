import { promises } from 'fs';
import path from 'path';
import { formatter as coreRulesFormatter } from './CoreRulesFormatter/formatter';
import { formatter as factonListFormatter } from './FactionListFormatter/formatter';
import * as coreRulesTaskDefinitions from './CoreRulesFormatter/taskDefinitions';
import * as factionListTaskDefinitions from './FactionListFormatter/taskDefinitions';
import { analyze } from './analyze';

const { readFile, writeFile, readdir } = promises;
const CONTENT_DIR = 'scripts/contentRaw';
const TARGET_DIR = './src/app/content/';

async function parseRules() {
    const DIR = path.join(CONTENT_DIR, 'CoreRules');
    const fileNames = await readdir(DIR);
    const fileBuffers = (
        await Promise.all(
            fileNames.map(async fileName => ({
                [fileName]: await (
                    await readFile(path.join(DIR, fileName))
                ).toString(),
            })),
        )
    ).reduce((acc, entry) => ({
        ...acc,
        ...entry,
    }));
    Object.entries(fileBuffers)
        .map<[string, string[]]>(([fileName, buffer]: [string, string]) => [
            fileName,
            buffer.split('\n').filter(Boolean),
        ])
        .forEach(([fileName, file]) => {
            const results = analyze(
                file,
                Object.values(coreRulesTaskDefinitions),
            );
            writeFile(
                path.join(TARGET_DIR, `${fileName.split('.')[0]}.json`),
                JSON.stringify(
                    coreRulesFormatter(results[1] as any).subtree,
                    null,
                    4,
                ),
            );
        });
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
        JSON.stringify(factonListFormatter(results[1] as any).subtree, null, 4),
    );
}
parseRules();
parseRaces();

export {};
