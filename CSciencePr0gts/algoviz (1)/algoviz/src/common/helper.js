export function convertInputToArrayString(string) {
  string = string.replaceAll(/\s/g, "");
  string = string.replaceAll(/\d{4}/g, "");
  string = string.replaceAll(/\s\s/g, " ");
  string = string.replaceAll(/\s,/g, ",");
  string = string.replaceAll(/,,/g, ",");
  string = string.replaceAll(/[^0-9,\s]/g, "");
  return string;
}

export function convertArrayStringToArray(string) {
  return string
    .split(",")
    .filter((v) => v !== "")
    .map((v) => +v);
}

export function getScreenWidth(){
  return window.innerWidth;
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}