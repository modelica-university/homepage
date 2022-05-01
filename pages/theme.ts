export interface ThemeProps {
  headerColor: string;
  backgroundImage: string;
  backgroundCreditLink: string;
  backgroundCredit: string;
  headerBackgroundColor: string;
}

export const libraryTheme: ThemeProps = {
  //headerColor: "#fdd",
  headerColor: LightenDarkenColor("#e8b64f", 150),
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255, 0.2) 0 100%), url('/static/images/library.jpg')",
  backgroundCreditLink: "https://unsplash.com/photos/PoE6Q48B-5k",
  backgroundCredit: "Ken Theimer",
  headerBackgroundColor: "rgba(232,182,79,0.2)",
};

export const bookshelfTheme: ThemeProps = {
  headerColor: "#fff",
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255, 0.3) 0 100%), url('/static/images/bookshelf.jpg')",
  backgroundCreditLink: "https://unsplash.com/photos/NIJuEQw0RKg",
  backgroundCredit: "Iñaki del Olmo",
  headerBackgroundColor: "rgba(25,25,25, .8)",
};

function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
