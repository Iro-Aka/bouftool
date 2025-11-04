import type { JSXElementConstructor } from "react";
import { I18nHelperTooltip } from "./helperTooltip";

const I18nLibrary = {
  HelperTooltip: I18nHelperTooltip,
} as const;

type TI18nLibrary = typeof I18nLibrary;
type TI18nLibraryKeys = keyof TI18nLibrary;

export type I18nProps<Library extends TI18nLibraryKeys, Message extends keyof TI18nLibrary[Library]> = {
  library: Library;
  message: Message;
} & (TI18nLibrary[Library][Message] extends JSXElementConstructor<infer P> ? P : Record<string, never>);

export const I18n = <Library extends TI18nLibraryKeys, Message extends keyof TI18nLibrary[Library]>({
  library,
  message,
  ...props
}: I18nProps<Library, Message>) => {
  // To-do : Get lang from context and get right language based on it

  // biome-ignore lint/suspicious/noExplicitAny: Dynamic component access requires any
  const Component = I18nLibrary[library][message] as JSXElementConstructor<any>;
  return <Component {...props} />;
};
