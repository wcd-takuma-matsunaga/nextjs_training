import { theme } from "@/themes";
import { Responsive, ResponsiveProp } from "@/types/styles";

export type AppTheme = typeof theme;

type SpaceThemeKey = keyof typeof theme.space;
type ColorThemeKey = keyof typeof theme.colors;
type FontSizeThemeKey = keyof typeof theme.fontSizes;
type LetterSpacingThemeKey = keyof typeof theme.letterSpacings;
type LineHeightThemeKey = keyof typeof theme.lineHeights;

export type Space = SpaceThemeKey | (string & {});
export type Color = ColorThemeKey | (string & {});
export type FontSize = FontSizeThemeKey | (string & {});
export type LetterSpacing = LetterSpacingThemeKey | (string & {});
export type LineHeight = LineHeightThemeKey | (string & {});

const BREAKPOINTS: { [key: string]: string } = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

/**
 * Responsive型をCSSとそのプロパティに変換
 *
 * @export
 * @template T
 * @param {string} propKey
 * @param {Responsive<T>} [prop]
 * @param {AppTheme} [theme]
 * @return {*}
 */
export function toPropValue<T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppTheme
) {
  if (prop === undefined) {
    return undefined;
  }

  if (isResponsivePropType(prop)) {
    const result = [];

    for (const responsiveKey in prop) {
      if (responsiveKey === "base") {
        result.push(
          `${propKey}: ${toThemeValueIfNeeded(
            propKey,
            prop[responsiveKey],
            theme
          )};`
        );
      } else if (
        responsiveKey === "sm" ||
        responsiveKey === "md" ||
        responsiveKey === "lg" ||
        responsiveKey === "xl"
      ) {
        const breakpoint = BREAKPOINTS[responsiveKey];
        const style = `${propKey}: ${toThemeValueIfNeeded(
          propKey,
          prop[responsiveKey],
          theme
        )}`;
        result.push(`@media screen and (min-width: ${breakpoint}`);
      }
      return result.join("\n");
    }
    return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`;
  }
}

const SPACE_KEYS = new Set([
  "margin",
  "margin-top",
  "margin-left",
  "margin-bottom",
  "margin-right",
  "padding",
  "padding-top",
  "padding-left",
  "padding-bottom",
  "padding-right",
]);
const COLOR_KEYS = new Set(["color", "background-color"]);
const FONT_SIZE_KEYS = new Set(["font-size"]);
const LETTER_SPACING_KEYS = new Set(["letter-spacing"]);
const LINE_HEIGHT_KEYS = new Set(["line-height"]);

/**
 *Themeに指定されたCSSプロパティの値に変換
 *
 * @template T
 * @param {string} propKey
 * @param {T} value
 * @param {AppTheme} [theme]
 * @return {*}
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
  if (
    theme &&
    theme.space &&
    SPACE_KEYS.has(propKey) &&
    isSpaceThemeKey(value, theme)
  ) {
    return theme.space[value];
  } else if (
    theme &&
    theme.colors &&
    COLOR_KEYS.has(propKey) &&
    isColorThemeKey(value, theme)
  ) {
    return theme.colors[value];
  } else if (
    theme &&
    theme.fontSizes &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKey(value, theme)
  ) {
    return theme.fontSizes[value];
  } else if (
    theme &&
    theme.letterSpacings &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKey(value, theme)
  ) {
    return theme.letterSpacings[value];
  } else if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKey(value, theme)
  ) {
    return theme.lineHeights[value];
  }

  return value;
}

function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
  return (
    prop &&
    (prop.base !== undefined ||
      prop.sm !== undefined ||
      prop.md !== undefined ||
      prop.lg !== undefined ||
      prop.xl !== undefined)
  );
}

function isSpaceThemeKey(prop: any, theme: AppTheme): prop is SpaceThemeKey {
  return Object.keys(theme.space).filter((key) => key === prop).length > 0;
}

function isColorThemeKey(prop: any, theme: AppTheme): prop is ColorThemeKey {
  return Object.keys(theme.colors).filter((key) => key === prop).length > 0;
}

function isFontSizeThemeKey(
  prop: any,
  theme: AppTheme
): prop is FontSizeThemeKey {
  return Object.keys(theme.fontSizes).filter((key) => key === prop).length > 0;
}

function isLetterSpacingThemeKey(
  prop: any,
  theme: AppTheme
): prop is LetterSpacingThemeKey {
  return (
    Object.keys(theme.letterSpacings).filter((key) => key === prop).length > 0
  );
}

function isLineHeightThemeKey(
  prop: any,
  theme: AppTheme
): prop is LineHeightThemeKey {
  return (
    Object.keys(theme.lineHeights).filter((key) => key === prop).length > 0
  );
}
