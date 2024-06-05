# MdCUnicodeConverter Library
## Overview
`MdCUnicodeConverter` is a simple JavaScript library for converting between Unicode characters, Unicode codes, and Manuel de Codage (MdC) codes for Egyptian hieroglyphs.

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
    </script>

```