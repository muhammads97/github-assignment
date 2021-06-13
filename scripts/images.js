const fs = require("fs")

const imagesAssetDirectory = "src/assets/images"

const imageFileNames = () => {
  const array = fs
    .readdirSync(imagesAssetDirectory)
    .filter((file) => file.endsWith(".png"))
    .map((file) => {
      return file.replace("@3x.png", "").replace("@2x.png", "").replace(".png", "")
    })
  return Array.from(new Set(array))
}

const generateImageNames = () => {
  const properties = imageFileNames()
    .map((name) => {
      return `${name}: require("./${name}.png"),`
    })
    .join("\n  ")

  const content = `import { ImageRequireSource } from "react-native"

const image = Object.freeze({
  ${properties}
})

export default image as Record<keyof typeof image, ImageRequireSource>\n`

  fs.writeFileSync(`${imagesAssetDirectory}/index.ts`, content, "utf8")
}

generateImageNames()
