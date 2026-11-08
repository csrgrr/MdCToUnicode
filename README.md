# MdCToUnicode

A browser-based, bidirectional converter between Manuel de Codage (MdC), Unicode Egyptian hieroglyphs, and hexadecimal Unicode code points.

<img width="3070" height="1598" alt="screenshot" src="https://github.com/user-attachments/assets/3cf7c1b2-6d58-448c-bcd7-16a728d7c12c" />


## Web app

Open [MdCToUnicode.html](MdCToUnicode.html) in a browser. Edit any of the three fields (MdC, Unicode code points, or Unicode text) to update the other two. Invalid or unsupported input is reported below the fields.

The app and its bundled [Egyptian OpenType font](fonts/eot.ttf) run locally; no build step or external service is required. The font renders the Unicode format controls as arranged quadrats. To display the same layouts elsewhere, use a font that supports these controls.

## JavaScript library

The [`MdCUnicodeConverter`](MdCUnicodeConverter%20Library/README.md) library converts individual signs and complete texts. Its sign table covers 5,067 signs in Unicode 18.0 (Egyptian Hieroglyphs and Egyptian Hieroglyphs Extended-A). Unicode catalogue MdC codes are canonical; JSesh codes and legacy codes are accepted as aliases.

For a page at the repository root, include the library and create a converter:

```html
<script src="MdCUnicodeConverter%20Library/MdCUnicodeConverter.js"></script>
<script>
  const converter = new MdCUnicodeConverter();![Uploading screenshot.png…]()

  const warnings = [];
  const unicode = converter.mdcToUnicode("G17^bsX1-<-N5-Y5:N35-L1->", warnings);
  console.log(unicode);
  console.log(converter.unicodeToMdc(unicode));
  console.log(warnings);
</script>
```

See the [library README](MdCUnicodeConverter%20Library/README.md) for conversion methods, supported MdC syntax, warnings, examples, and instructions for regenerating the sign table from Unicode data.

## License

The project is licensed under the [GNU AGPL v3.0 or later](LICENSE). Third-party licenses and notices are listed in [NOTICE](NOTICE); the bundled font is under the [SIL Open Font License 1.1](fonts/OFL-LICENSE.txt), and the Unicode-derived sign data is under the Unicode License v3.
