export const replacePlaceHolder = (str, value, placeholder='?') => {
  if (!value) return str;
  str = str.replace(placeholder, value)
  return str;
}