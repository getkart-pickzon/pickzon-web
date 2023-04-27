const REGEX = {
  IMAGES_EXT: /\.(jpg|jpeg|png|gif|jfif)$/,
  VIDEO_EXT: /\.(mp4)$/,
  PDF_EXT: /\.(pdf)$/,
  LETTER_ONLY: /^[A-Za-z\s]*$/,
  // EMAIL: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  EMAIL: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
  URL: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  NO_SPACE: /^\S.*[a-zA-Z\s]*$/,
  POSITIVE_INT: /^[0-9]+$|^$/,
};
export default REGEX;

