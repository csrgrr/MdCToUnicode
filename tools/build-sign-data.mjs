// SPDX-License-Identifier: AGPL-3.0-or-later. Copyright (C) 2024-2026 César Guerra Méndez
//
// Rebuilds the sign table at the end of MdCUnicodeConverter.js from the official
// Unicode Egyptian Hieroglyph Database (Unikemet.txt).
//
//   node tools/build-sign-data.mjs                     downloads the latest Unikemet.txt
//   node tools/build-sign-data.mjs path/Unikemet.txt   uses a local copy

import { readFile, writeFile } from "node:fs/promises";

const UNIKEMET_URL =
  "https://www.unicode.org/Public/UCD/latest/ucd/Unikemet.txt";
const LIBRARY = new URL(
  "../MdCUnicodeConverter Library/MdCUnicodeConverter.js",
  import.meta.url,
);
const BEGIN = "// BEGIN GENERATED SIGN DATA";
const END = "// END GENERATED SIGN DATA";

// Codes used by older versions of this converter. They are still accepted as input.
const OLD_CODES = `
  13031:A42b 13033:A43d 13036:A45c 13059:B47 1308B:rA 130B9:S125 130DC:E100 130E6:E141 130FF:F63
  13127:F37b 1313C:F51a 13145:G139 13157:G90 13175:G247 13192:I24 13194:I31 131AF:M48 131BA:M72
  131BC:1000 131C8:M139 131CA:M139a 131D5:M24b 131DA:M140b 13201:N18b 13202:N102 13220:O121a
  13221:F158 13222:G264 13223:T116a 13224:T64a 13226:E253 13228:T128 1322A:E199 1322B:E201a
  1322C:E211a 1322E:N119 13233:A377 13235:G115 13236:N120 13237:G127 1323A:G266 1323B:I106a
  1323C:R129 1323E:R118 1323F:I31b 13243:N118 13244:N112 13245:N113 13246:E34b 13247:E198
  13248:E145b 1324A:G7e 1324B:S151 13251:O54 1325B:O85a 1325C:O85 1325D:O86 132B3:R3p 132C3:R16b
  132D3:S48 132D8:S50 1330A:T43 13316:T60 13362:100 1339B:H 1339C:V71 1339E:V81 133AD:V20h 133D9:di
  133E8:Z2a 133E9:Z2b 133EC:N33av 13404:Z1a 1340D:J1 1340E:J2 1340F:J3 13410:J4 13411:J5 13412:J6
  13413:J7 13416:J8 13417:J9 13418:J10 13419:J11 1341A:J12 1341B:J13 1341C:J14 1341D:J15 1341E:J16
  1341F:J17 13420:J18 13421:J19 13422:J20 13423:J21 13424:J22 13425:J23 13426:J24 13427:J25
  13428:J26 13429:J27 1342A:J28 1342B:J29 1342C:J30 1342D:J31 1342E:J32`;

// Unicode catalogue name -> MdC code: A005A -> A5a, AA001 -> Aa1, NL001 -> NL1.
function mdcCode(unicodeName) {
  const [, category, number, variant] = unicodeName.match(
    /^([A-Z]+?)0*(\d+)([A-Z]*)$/,
  );
  return (category === "AA" ? "Aa" : category) + number + variant.toLowerCase();
}

// Catalogue numbers look like "A-01-001"; category Aa ("AA-...") goes last, as in Gardiner's list.
function catalogueOrder(a, b) {
  const key = (sign) => sign.catalogue.replace(/^AA-/, "Z~-");
  return key(a).localeCompare(key(b));
}

async function readUnikemet(file) {
  if (file) return readFile(file, "utf8");
  const response = await fetch(UNIKEMET_URL);
  if (!response.ok)
    throw new Error(`Could not download ${UNIKEMET_URL} (${response.status})`);
  return response.text();
}

const unikemet = await readUnikemet(process.argv[2]);
const version =
  unikemet.match(/Unikemet-(\d+\.\d+\.\d+)\.txt/)?.[1] ?? "unknown";

// Lines look like "U+13000<TAB>kEH_JSesh<TAB>A1".
const properties = new Map();
for (const line of unikemet.split("\n")) {
  if (!line.startsWith("U+")) continue;
  const [codePoint, field, value] = line.split("\t");
  const hex = codePoint.slice(2);
  if (!properties.has(hex)) properties.set(hex, {});
  properties.get(hex)[field] = value.trim();
}

const signs = [];
for (const [hex, props] of properties) {
  signs.push({
    hex: hex,
    mdc: mdcCode(props.kEH_UniK),
    catalogue: props.kEH_Cat,
    jsesh: props.kEH_JSesh,
    aliases: [],
  });
}
signs.sort((a, b) => parseInt(a.hex, 16) - parseInt(b.hex, 16));
signs
  .slice()
  .sort(catalogueOrder)
  .forEach((sign, index) => (sign.rank = index));

// Every code (main code or alias) must point to a single sign. The first one to claim it wins.
const signByCode = new Map(signs.map((sign) => [sign.mdc, sign]));
let skipped = 0;

function addAlias(sign, alias) {
  if (!alias || !/^[A-Za-z0-9]+$/.test(alias) || signByCode.get(alias) === sign)
    return;
  if (signByCode.has(alias)) {
    skipped++;
    return;
  }
  signByCode.set(alias, sign);
  sign.aliases.push(alias);
}

for (const sign of signs)
  addAlias(
    sign,
    sign.mdc.replace(/[a-z]+$/, (variant) => variant.toUpperCase()),
  );
for (const sign of signs) addAlias(sign, sign.jsesh);
for (const pair of OLD_CODES.trim().split(/\s+/)) {
  const [hex, code] = pair.split(":");
  addAlias(
    signs.find((sign) => sign.hex === hex),
    code,
  );
}

const lines = signs.map((sign) =>
  [sign.hex, sign.mdc, sign.rank.toString(36), ...sign.aliases].join(" "),
);
const table = `${BEGIN} by tools/build-sign-data.mjs from Unikemet ${version}. Do not edit by hand.
MdCUnicodeConverter.UNICODE_VERSION = "${version}";
MdCUnicodeConverter.SIGN_DATA = \`
${lines.join("\n")}
\`;
${END}`;

const library = await readFile(LIBRARY, "utf8");
const start = library.indexOf(BEGIN);
const end = library.indexOf(END) + END.length;
if (start < 0 || end < END.length)
  throw new Error("Generated data markers not found in the library");
await writeFile(LIBRARY, library.slice(0, start) + table + library.slice(end));

const aliases = signs.reduce((total, sign) => total + sign.aliases.length, 0);
console.log(
  `Unicode ${version}: ${signs.length} signs, ${aliases} aliases, ${skipped} conflicting aliases skipped.`,
);
