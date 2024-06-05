# MdCToUnicode Converter Online

Following the publications of @oraec and their intentions to develop useful tools for working with Egyptian hieroglyphs based on unicode, I have found myself in the task of developing a simple converter from Manuel de Codage to Unicode (bi or tridirectional -> unicode, unicode_code and MdC).

![image](https://github.com/csrgrr/MdCToUnicode/assets/104082439/e7a8cb68-ba5f-461a-ac9d-96ff36dad354)

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

## Methods

- `convertFromUnicode(unicode)`: Converts a Unicode character to its corresponding Unicode code and MdC code.
- `convertFromUnicodeCode(unicodeCode)`: Converts a Unicode code to its corresponding Unicode character and MdC code.
- `convertFromMdC(mdc)`: Converts an MdC code to its corresponding Unicode character and Unicode code.

## License
This library is open source and available under the MIT License.
