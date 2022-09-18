import { Dimensions } from "react-native";
import { isEmptyString } from "./common.utils";
const windowWidth = Dimensions.get("window").width;

export const scaleFactor = windowWidth / 750;

export const scaledValue = (value = 0) => value * scaleFactor;

const hashStr = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash += str.charCodeAt(i);
  }
  return hash;
};

export const dim = {
  _0px: scaledValue(0),
  _1px: scaledValue(1),
  _2px: scaledValue(2),
  _3px: scaledValue(3),
  _4px: scaledValue(4),
  _5px: scaledValue(5),
  _6px: scaledValue(6),
  _7px: scaledValue(7),
  _8px: scaledValue(8),
  _10px: scaledValue(10),
  _12px: scaledValue(12),
  _14px: scaledValue(14),
  _16px: scaledValue(16),
  _18px: scaledValue(18),
  _20px: scaledValue(20),
  _22px: scaledValue(22),
  _24px: scaledValue(24),
  _26px: scaledValue(26),
  _28px: scaledValue(28),
  _30px: scaledValue(30),
  _32px: scaledValue(32),
  _34px: scaledValue(34),
  _36px: scaledValue(36),
  _38px: scaledValue(38),
  _40px: scaledValue(40),
  _42px: scaledValue(42),
  _44px: scaledValue(44),
  _46px: scaledValue(46),
  _48px: scaledValue(48),
  _50px: scaledValue(50),
  _52px: scaledValue(52),
  _54px: scaledValue(54),
  _56px: scaledValue(56),
  _58px: scaledValue(58),
  _60px: scaledValue(60),
  _62px: scaledValue(62),
  _64px: scaledValue(64),
  _66px: scaledValue(66),
  _68px: scaledValue(68),
  _70px: scaledValue(70),
  _72px: scaledValue(72),
  _74px: scaledValue(74),
  _76px: scaledValue(76),
  _78px: scaledValue(78),
  _80px: scaledValue(80),
  _82px: scaledValue(82),
  _scale: function _scale(value) {
    return scaledValue(value);
  },
};

const randomColorArray = [
  "#f69988",
  "#f36c60",
  "#e84e40",
  "#ff7997",
  "#ff5177",
  "#f48fb1",
  "#f06292",
  "#ec407a",
  "#ff80ab",
  "#ff4081",
  "#ce93d8",
  "#ba68c8",
  "#ab47bc",
  "#ea80fc",
  "#5c6bc0",
  "#3f51b5",
  "#8c9eff",
  "#536dfe",
  "#3d5afe",
  "#91a7ff",
  "#738ffe",
  "#5677fc",
  "#6889ff",
  "#4d73ff",
  "#80deea",
  "#4dd0e1",
  "#26c6da",
  "#00bcd4",
  "#84ffff",
  "#18ffff",
  "#00e5ff",
  "#80cbc4",
  "#4db6ac",
  "#26a69a",
  "#009688",
  "#64ffda",
  "#1de9b6",
  "#00bfa5",
  "#72d572",
  "#42bd41",
  "#2baf2b",
  "#a2f78d",
  "#e6ee9c",
  "#dce775",
  "#d4e157",
  "#ffee58",
  "#ffe082",
  "#ffd54f",
  "#ffca28",
  "#ffe57f",
  "#ffd740",
  "#ffc400",
  "#ffcc80",
  "#ffb74d",
  "#ffa726",
  "#ffd180",
  "#ffab40",
  "#ff9100",
  "#ffccbc",
  "#ffab91",
  "#ff8a65",
  "#ff9e80",
  "#ff6e40",
  "#bcaaa4",
  "#a1887f",
  "#8d6e63",
  "#90a4ae",
  "#78909c",
  "#607d8b",
];

export const randomColor = (str = null) => {
  if (isEmptyString(str)) {
    return randomColorArray[
      Math.floor(Math.random() * randomColorArray.length)
    ];
  }
  const index = hashStr(str) % randomColorArray.length;
  return randomColorArray[index];
};
