const fs = require("fs")

const fontExtensions = [".ttf", ".otf"]
const fontsAssetDirectory = "src/assets/fonts"

const fontFileNames = () => {
  const array = fs
    .readdirSync(fontsAssetDirectory)
    .filter((file) => fontExtensions.some((ext) => file.endsWith(ext)))
    .map((file) =>
      fontExtensions.reduce((filenameWithoutExt, ext) => filenameWithoutExt.replace(ext, ""), file),
    )
  return Array.from(new Set(array))
}

const generateFontNames = () => {
  const properties = fontFileNames()
    .map((name) => {
      const key = String(name).replace(/\s|-/g, "")
      return `${key.charAt(0).toLowerCase() + key.slice(1)}: "${name}",`
    })
    .join("\n  ")

  const content = `const font = Object.freeze({
  ${properties}
})

export default font as Record<keyof typeof font, string>\n`

  fs.writeFileSync(`${fontsAssetDirectory}/index.ts`, content, "utf8")
}

generateFontNames()
