const screenWidth = screen.width;
const screenHeight = screen.height;

//$("#tcasnowdescend")[0].play();
//$("#tcasnowclimb")[0].play();

/* setTimeout(() => {
  $("#tcasclimb")[0].play();
}, 800); */

/* console.log("screenWidth: ", screenWidth);
console.log("screenHeight", screenHeight); */

if (screenWidth < 1930) {
  scaleView();
} else {
  modWidth = 1737;
}

function scaleView(a = 34) {
  let modWidth, modHeight, scaleSize, panelWidth, bordR, koo;
  modWidth = Math.floor((screenWidth * 80) / 100);
  modHeight = Math.floor(modWidth / 2.474);
  scaleSize = Math.floor(modWidth / 3.474);
  panelWidth = modWidth - scaleSize;

  bordR = scaleSize / 20;

  koo = scaleSize / 500;

  if (a === 1) {
    return { scaleSize, koo };
  }

  /* console.log("Mod_Width: ", modWidth);
  console.log("Mod_Height: ", modHeight);
  console.log("Scale_Size: ", scaleSize);
  console.log("Panel_Width: ", panelWidth); */

  $("#screen").attr("width", scaleSize);
  $("#screen").attr("height", scaleSize);
  $("#screen").css("border-radius", `${bordR}px`);

  $("#decvs").css("border-radius", `0 0 0 ${bordR}px`);

  $("#panel").css("width", `${panelWidth}px`);
  $("#panel").css("min-width", `${panelWidth}px`);
  $("#panel").css("height", `${scaleSize}px`);
  $("#panel").css("border-radius", `${bordR}px`);

  $("#modulation").attr("width", modWidth);
  $("#modulation").attr("height", modHeight);
  $("#modulation").css("border-radius", `${bordR}px`);

  $("#miniscreen").css("left", `${Math.floor(scaleSize / 1.142)}px`);
  $("#miniscreen").css("top", `${Math.floor(scaleSize / 3.623)}px`);
  $("#miniscreen").attr("width", `${Math.floor(scaleSize / 1.2987)}px`);
  $("#miniscreen").attr("height", `${Math.floor(scaleSize / 6.6667)}px`);

  $(".clicker.round").css("width", `${80 * koo}px`);
  $(".clicker.round").css("height", `${80 * koo}px`);

  $(".clicker.bround").css("width", `${155 * koo}px`);
  $(".clicker.bround").css("height", `${155 * koo}px`);
  $(".clicker.bround").css("top", `${311 * koo}px`);

  $(".clicker.bround.small").css("width", `${100 * koo}px`);
  $(".clicker.bround.small").css("height", `${100 * koo}px`);
  $(".clicker.bround.small").css("top", `${339 * koo}px`);

  $(".clicker.square").css("width", `${108 * koo}px`);
  $(".clicker.square").css("height", `${60 * koo}px`);

  $("#traffic").css("left", `${130 * koo}px`);
  $("#traffic").css("top", `${120 * koo}px`);

  $("#range").css("left", `${295 * koo}px`);
  $("#range").css("top", `${115 * koo}px`);

  $("#angle").css("left", `${210 * koo}px`);
  $("#angle").css("top", `${368 * koo}px`);

  $("#source").css("left", `${1002 * koo}px`);
  $("#source").css("top", `${365 * koo}px`);

  $("#mode").css("left", `${982 * koo}px`);
  $("#mode").css("top", `${97 * koo}px`);
  $("#mode").css("width", `${122 * koo}px`);
  $("#mode").css("height", `${122 * koo}px`);

  $("#test").css("left", `${1011 * koo}px`);
  $("#test").css("top", `${125 * koo}px`);
  $("#test").css("width", `${65 * koo}px`);
  $("#test").css("height", `${65 * koo}px`);

  $("#lbround").css("left", `${377 * koo}px`);

  $("#lsround").css("left", `${405 * koo}px`);

  $("#rbround").css("left", `${735 * koo}px`);

  $("#rsround").css("left", `${764 * koo}px`);

  $("#switch").css("left", `${580 * koo}px`);
  $("#switch").css("top", `${330 * koo}px`);

  $("#ent").css("left", `${580 * koo}px`);
  $("#ent").css("top", `${398 * koo}px`);

  $("#atc").css("left", `${184 * koo}px`);
  $("#atc").css("top", `${11 * koo}px`);
  $("#atc").css("width", `${23 * koo}px`);
  $("#atc").css("height", `${13 * koo}px`);

  $("#fid").css("left", `${230 * koo}px`);
  $("#fid").css("top", `${11 * koo}px`);
  $("#fid").css("width", `${23 * koo}px`);
  $("#fid").css("height", `${13 * koo}px`);
  
  $("#xpndr").css("left", `${303.5 * koo}px`);
  $("#xpndr").css("top", `${11 * koo}px`);
  $("#xpndr").css("width", `${55 * koo}px`);
  $("#xpndr").css("height", `${13 * koo}px`);
}
