export interface ITextProps {
  preset?:
    | "primary"
    | "primaryLarger"
    | "secondary"
    | "secondaryLarger"
    | "secondaryBig"
    | "tertiary"
    | "tertiaryLarge"
    | "tertiaryLarger"
  lines?: "single" | "multi"
  color?: string
  bolded?: boolean
}
