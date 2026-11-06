# MdCToUnicode Converter Online

Following the publications of @oraec and their intentions to develop useful tools for working with Egyptian hieroglyphs based on unicode, I have found myself in the task of developing a simple converter from Manuel de Codage to Unicode (bi or tridirectional -> unicode, unicode_code and MdC).

![image](https://github.com/csrgrr/MdCToUnicode/assets/104082439/e7a8cb68-ba5f-461a-ac9d-96ff36dad354)

# MdCUnicodeConverter Library

## Overview

`MdCUnicodeConverter` is a simple JavaScript library for converting between Unicode characters, Unicode codes, and Manuel de Codage (MdC) codes for Egyptian hieroglyphs.

It covers every sign of Unicode 18.0 (Egyptian Hieroglyphs and Extended-A) and converts whole MdC texts, translating the MdC layout operators (`:`, `*`, `&`, `()`, cartouches, mirroring, shading...) into the Unicode Egyptian Hieroglyph Format Controls and back. See the [library README](MdCUnicodeConverter%20Library/README.md) for the full syntax and for how to regenerate the sign table when a new Unicode version is published.

The web page bundles [Egyptian OpenType](https://github.com/microsoft/font-tools/tree/main/EgyptianOpenType) (`fonts/eot.ttf`, Microsoft, SIL Open Font License), which renders the format controls as real quadrats. Fonts without support for them show the controls as empty boxes.

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
  console.log(converter.mdcToUnicode("G17^bsX1-<-N5-Y5:N35-L1->")); // "𓅓𓐳𓏏𓍹𓐼𓇳𓏠𓐰𓈖𓆣𓐽𓍺"
  console.log(converter.unicodeToMdc("𓀀𓐰𓉐")); // "A1:O1"
</script>
```

## Methods

- `convertFromUnicode(unicode)`: Converts a Unicode character to its corresponding Unicode code and MdC code.
- `convertFromUnicodeCode(unicodeCode)`: Converts a Unicode code to its corresponding Unicode character and MdC code.
- `convertFromMdC(mdc)`: Converts an MdC code to its corresponding Unicode character and Unicode code.
- `mdcToUnicode(mdc, warnings?)` / `unicodeToMdc(text, warnings?)`: Convert whole texts, including quadrats and format controls.
- `unicodeToCodes(text)` / `codesToUnicode(codes, warnings?)`: Unicode text ⇄ hexadecimal code points.

## License

Copyright (C) 2024-2026 César Guerra Méndez.

This project is free software licensed under the [GNU Affero General Public License v3.0 or later](LICENSE) (AGPL-3.0-or-later). Anyone may use, study, modify and share it, including commercially, but any distributed or network-hosted version (modified or not) must make its complete source code available under the same license.

Third-party components keep their own licenses (see [NOTICE](NOTICE)):

- `fonts/eot.ttf`: Egyptian OpenType font by Microsoft, [SIL Open Font License 1.1](fonts/OFL-LICENSE.txt).
- The sign table is derived from the Unicode Egyptian Hieroglyph Database, Unicode License v3.
