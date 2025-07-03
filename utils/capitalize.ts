export const capitalize = (str: string) => {
  if (str.length === 0) return str;
  str = str.replaceAll("_", " ").trim();
  return str
    .split(" ")
    .map((word) =>
      word === "and" ? '&' : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
};
