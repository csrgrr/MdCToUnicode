# MdCUnicodeConverter Library

## Overview

`MdCUnicodeConverter` is a simple JavaScript library for converting between Unicode characters, Unicode codes, and Manuel de Codage (MdC) codes for Egyptian hieroglyphs.

It covers every sign of Unicode 18.0 (Egyptian Hieroglyphs and Egyptian Hieroglyphs Extended-A, 5067 signs) and converts whole MdC texts, translating the MdC layout operators (`:`, `*`, `&`, `()`, cartouches, mirroring, shading...) into the Unicode Egyptian Hieroglyph Format Controls (U+13430–U+13455) and back.

Primary MdC codes follow the Unicode catalogue names (`A1`, `A5a`, `Aa1`, `A1f`...). JSesh codes from the Unicode database (`kEH_JSesh`) and the codes used by older versions of this library are accepted as input aliases.

## Installation

- Download the unicodeConverter.js file.
- Include it in your HTML file.

```html
<script src="path/to/unicodeConverter.js"></script>
```

## Usage

- Instantiate the `MdCUnicodeConverter` class.
- Use the provided methods to perform conversions.

## Example of use

```html
<script src="MdCUnicodeConverter.js"></script>
<script>
  const converter = new MdCUnicodeConverter();
  console.log(converter.convertFromUnicode("𓀀")); // { "unicode": "𓀀", "unicode_code": "13000", "mdc": "A1" }
  console.log(converter.convertFromUnicodeCode("13000")); // { "unicode": "𓀀", "unicode_code": "13000", "mdc": "A1" }
  console.log(converter.convertFromMdC("A1")); // { "unicode": "𓀀", "unicode_code": "13000", "mdc": "A1" }

  const warnings = [];
  const text = converter.mdcToUnicode("G17^bsX1-<-N5-Y5:N35-L1->", warnings); // "𓅓𓐳𓏏𓍹𓐼𓇳𓏠𓐰𓈖𓆣𓐽𓍺"
  console.log(converter.unicodeToMdc(text)); // "G17^bsX1-<-N5-Y5:N35-L1->"
  console.log(converter.unicodeToCodes(text)); // "13153-13433-133cf-13379-1343c-..."
</script>
```

## Text methods

- `mdcToUnicode(mdc, warnings?)`: converts an MdC text to Unicode (with format controls).
- `unicodeToMdc(text, warnings?)`: converts Unicode hieroglyphic text to MdC.
- `unicodeToCodes(text)` / `codesToUnicode(codes, warnings?)`: Unicode text ⇄ hexadecimal code points separated by `-`.

Problems found in the input (unknown codes, unbalanced parentheses...) are pushed as messages into the optional `warnings` array.

## MdC syntax ⇄ Unicode format controls

| MdC                                                     | Meaning                                                                 | Unicode                                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `-`, space, `_`                                         | Quadrat separator                                                       | –                                                                                         |
| `A:B`                                                   | A above B                                                               | U+13430 VERTICAL JOINER                                                                   |
| `A*B`                                                   | A beside B                                                              | U+13431 HORIZONTAL JOINER                                                                 |
| `( )`                                                   | Grouping                                                                | U+13437 / U+13438 BEGIN / END SEGMENT                                                     |
| `A&B`                                                   | Overlay                                                                 | U+13436 OVERLAY MIDDLE (two single signs are put in catalogue order, as Unicode requires) |
| `A^tsB`, `^bs`, `^te`, `^be`                            | Insert B in a corner of A                                               | U+13432–U+13435                                                                           |
| `A^tB`, `^m`, `^b`                                      | Insert B at top / middle / bottom of A                                  | U+1343A / U+13439 / U+1343B                                                               |
| `A\`                                                    | Mirror                                                                  | U+13440                                                                                   |
| `A\r1`, `\r2`, `\r3`, `\R45`, `\R135`, `\R225`, `\R315` | Rotation                                                                | VS1–VS7 (U+FE00–U+FE06)                                                                   |
| `A#1234`                                                | Damaged quarters (1 top-start, 2 top-end, 3 bottom-start, 4 bottom-end) | U+13447–U+13455                                                                           |
| `..`, `.`                                               | Full / half blank                                                       | U+13441 / U+13442                                                                         |
| `//`, `/`, `v/`, `h/`                                   | Lost sign: full / half / tall / wide                                    | U+13443–U+13446                                                                           |
| `<` `>`, `<2`, `1>`, `<0`, `0>`                         | Cartouche, knotted start, knotless end, no visible end                  | U+13379 / U+1342F + U+1343C … U+1343D + U+1337A / U+1337B                                 |
| `<S` `S>`, `<H` `H>`, `<h2` `h2>`, `<h3` `h3>`          | Serekh, hwt, low hwt, high hwt                                          | U+13258–U+1325D, U+13282                                                                  |
| `<F` `F>`                                               | Fortified wall enclosure                                                | U+13288 + U+1343E … U+1343F + U+13289                                                     |
| `[[ ]]`, `[' ']`, `[{ }]`, `[& &]`                      | Editorial marks                                                         | `[ ]`, `⸢ ⸣`, `{ }`, `⟦ ⟧`                                                                |
| `!`                                                     | End of line                                                             | Line break                                                                                |

Modifiers go in this order: rotation, mirror, damage (`A1\r1\#12`).

The insertion operators (`^ts`, `^bs`, `^te`, `^be`, `^t`, `^m`, `^b`) are an extension of this library: classic MdC has no notation for the Unicode insertion controls.

All the notations live in the `MDC_SYMBOLS` table at the top of `MdCUnicodeConverter.js`; adding a new one is just adding a line there.

## Updating to a new Unicode version

The sign table is generated from the official Unicode Egyptian Hieroglyph Database (`Unikemet.txt`, UAX #57). To update it, run from the repository root:

```sh
node tools/build-sign-data.mjs                   # downloads the latest Unikemet.txt
node tools/build-sign-data.mjs path/Unikemet.txt # or uses a local copy
```

## License

[GNU AGPL v3.0 or later](../LICENSE). The sign table is derived from Unicode data under the Unicode License v3; see [NOTICE](../NOTICE).
