(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.jamstik = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.serialize = serialize;
  exports.deserialize = deserialize;
  /*
  
    jamstik.js
  
  */

  const dPadWords = [];
  for (let i = 0; i < 13; i++) {
    dPadWords.push("up", "down", "left", "right", "enter", "mute");
  }
  const dPadAssignments = [];

  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("none");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("capoUp");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("capoDown");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("octaveUp");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("octaveDown");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("capoReset");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("stringBend");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("mute");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("tapMode");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("tapModeMomentary");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("singleMultiChannelToggle");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("modulationToggle");
  }
  for (let i = 0; i < 6; i++) {
    dPadAssignments.push("panic");
  }
  const dPadValues = [
  //none
  [1, 0, 0, 0, 0], [2, 0, 0, 0, 0], [4, 0, 0, 0, 0], [8, 0, 0, 0, 0], [0, 64, 0, 0, 0], [16, 0, 0, 0, 0],
  //capoUp
  [33, 0, 64, 0, 8], [34, 0, 64, 0, 8], [36, 0, 64, 0, 8], [40, 0, 64, 0, 8], [32, 64, 64, 0, 8], [48, 0, 64, 0, 8],
  //capoDown
  [33, 0, 95, 127, 120], [34, 0, 95, 127, 120], [36, 0, 95, 127, 120], [40, 0, 95, 127, 120], [32, 64, 95, 127, 120], [48, 0, 95, 127, 120],
  //octaveUp
  [33, 0, 64, 0, 96], [34, 0, 64, 0, 96], [36, 0, 64, 0, 96], [40, 0, 64, 0, 96], [32, 64, 64, 0, 96], [48, 0, 64, 0, 96],
  //octaveDown
  [33, 0, 95, 127, 32], [34, 0, 95, 127, 32], [36, 0, 95, 127, 32], [40, 0, 95, 127, 32], [32, 64, 95, 127, 32], [48, 0, 95, 127, 32],
  //capoReset
  [33, 0, 32, 0, 0], [34, 0, 32, 0, 0], [36, 0, 32, 0, 0], [40, 0, 32, 0, 0], [32, 64, 32, 0, 0], [48, 0, 32, 0, 0],
  //stringBend
  [33, 0, 96, 0, 16], [34, 0, 96, 0, 16], [36, 0, 96, 0, 16], [40, 0, 96, 0, 16], [32, 64, 96, 0, 16], [48, 0, 96, 0, 16],
  //mute
  [97, 1, 32, 0, 16], [98, 1, 32, 0, 16], [100, 1, 32, 0, 16], [104, 1, 32, 0, 16], [96, 65, 32, 0, 16], [112, 1, 32, 0, 16],
  //tapMode
  [33, 1, 64, 0, 16], [34, 1, 64, 0, 16], [36, 1, 64, 0, 16], [40, 1, 64, 0, 16], [32, 65, 64, 0, 16], [48, 1, 64, 0, 16],
  //tapModeMomentary
  [97, 1, 64, 0, 16], [98, 1, 64, 0, 16], [100, 1, 64, 0, 16], [104, 1, 64, 0, 16], [96, 65, 64, 0, 16], [112, 1, 64, 0, 16],
  //singleMultiChannelToggle
  [33, 1, 96, 0, 16], [34, 1, 96, 0, 16], [36, 1, 96, 0, 16], [40, 1, 96, 0, 16], [32, 65, 96, 0, 16], [48, 1, 96, 0, 16],
  //modulationToggle
  [33, 2, 31, 127, 120], [34, 2, 31, 127, 120], [36, 2, 31, 127, 120], [40, 2, 31, 127, 120], [32, 66, 31, 127, 120], [48, 2, 31, 127, 120],
  //panic
  [33, 2, 32, 0, 0], [34, 2, 32, 0, 0], [36, 2, 32, 0, 0], [40, 2, 32, 0, 0], [32, 66, 32, 0, 0], [48, 2, 32, 0, 0]];

  const dPadValueNum = {
    none: 0,
    capoUp: 1,
    capoDown: 2,
    octaveUp: 3,
    octaveDown: 4,
    capoReset: 5,
    stringBend: 6,
    mute: 7,
    tapMode: 8,
    tapModeMomentary: 9,
    singleMultiChannelToggle: 10,
    modulationToggle: 11,
    panic: 12
  };

  const dPadIndex = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
    enter: 4,
    mute: 5
  };

  const systemButtonNames = {
    up: "DPADOP00",
    down: "DPADOP01",
    left: "DPADOP02",
    right: "DPADOP03",
    enter: "DPADOP04",
    mute: "DPADOP05"
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  function whichDPadAndTypeOfDPadAssignment(arrayVariables) {
    let whichDPad;
    let typeOfAssignment;
    let finalObject = {};
    if ([0, 5] == [0, 5]) {}
    for (let i = 0; i < dPadValues.length; i++) {
      if (arraysEqual(arrayVariables, dPadValues[i])) {
        whichDPad = dPadWords[i];
        typeOfAssignment = dPadAssignments[i];
      }
    }
    //finalObject[whichDPad] = typeOfAssignment;
    finalObject = { index: whichDPad, value: typeOfAssignment };
    return finalObject;
  }

  function generateArrayWithChangeDPadTo(index, value) {
    return dPadValues[6 * dPadValueNum[value] + dPadIndex[index]];
  }

  const systemNameR = {
    SLEEPTIM: "sleepTime",
    SINGLECH: "singleMidiChannelMode",
    MIDICHAN: "midiChannelOf1stString",
    MIN__VEL: "minimumMidiVelocity",
    MAX__VEL: "maximumMidiVelocity",
    NOVELCAL: "noMidiVelocity",
    ACCCONTR: "accelerometerController",
    ACCTHRES: "accelerometerThresholdTo",
    ACCEL_ON: "accelerometer",
    ACC_MINA: "accelerometerPitchAngle",
    ACC_MAXA: "accelerometerPitchAngle2",
    STR_HOLD: "stringHoldTime",
    LOGCURVE: "volumeCurve",
    CURVFLAT: "logVolumeCurveFlattening",
    IGNOREFT: "sustainMode",
    BEND____: "stringBend",
    //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
    HAMMERON: "hammerOns",
    HAMMERTM: "hammerOnTimer",
    HOTVELEN: "hammerOnVelocity",
    TAP_MODE: "tapMode",
    TRANSPSE: "transpose",
    S0__NOTE: "openNote6th",
    S1__NOTE: "openNote5th",
    S2__NOTE: "openNote4th",
    S3__NOTE: "openNote3rd",
    S4__NOTE: "openNote2nd",
    S5__NOTE: "openNote1st",
    S0_BOOST: "boostString6",
    S1_BOOST: "boostString5",
    S2_BOOST: "boostString4",
    S3_BOOST: "boostString3",
    S4_BOOST: "boostString2",
    S5_BOOST: "boostString1",
    PICKPROF: "pickingProfile",
    HWDEVTYP: "hardwareDeviceType",
    HWDEVVER: "hardwareDeviceVersion",
    FWREVMAJ: "firmwareRevisionMajor",
    FWREVMIN: "firmwareRevisionMinor",
    LEFT_BLE: "leftHanded",
    TUTOR_MD: "tutorMode",

    HW__CAPS: "hardwareCapabilityFlags",
    BATT_PCT: "batteryPercent",
    RESETDEF: "resetDefaults",

    S0_MIDPT: "midpoint6",
    S0ENVTRG: "triggerEnvMax6",
    S0ENVVOL: "volumeEnvMax6",
    S0__TRIG: "trigger6",
    S0_BOOST: "volumeBoost6",
    S0FBOOST: "factoryVolumeBoost6",
    S0MINTTM: "minStringTriggerTime6",
    S0__BETA: "beta6",
    S0_GAMMA: "gamma6",
    S0_DELTA: "delta6",

    S1_MIDPT: "midpoint5",
    S1ENVTRG: "triggerEnvMax5",
    S1ENVVOL: "volumeEnvMax5",
    S1__TRIG: "trigger5",
    S1_BOOST: "volumeBoost5",
    S1FBOOST: "factoryVolumeBoost5",
    S1MINTTM: "minStringTriggerTime5",
    S1__BETA: "beta5",
    S1_GAMMA: "gamma5",
    S1_DELTA: "delta5",

    S2_MIDPT: "midpoint4",
    S2ENVTRG: "triggerEnvMax4",
    S2ENVVOL: "volumeEnvMax4",
    S2__TRIG: "trigger4",
    S2_BOOST: "volumeBoost4",
    S2FBOOST: "factoryVolumeBoost4",
    S2MINTTM: "minStringTriggerTime4",
    S2__BETA: "beta4",
    S2_GAMMA: "gamma4",
    S2_DELTA: "delta4",

    S3_MIDPT: "midpoint3",
    S3ENVTRG: "triggerEnvMax3",
    S3ENVVOL: "volumeEnvMax3",
    S3__TRIG: "trigger3",
    S3_BOOST: "volumeBoost3",
    S3FBOOST: "factoryVolumeBoost3",
    S3MINTTM: "minStringTriggerTime3",
    S3__BETA: "beta3",
    S3_GAMMA: "gamma3",
    S3_DELTA: "delta3",

    S4_MIDPT: "midpoint2",
    S4ENVTRG: "triggerEnvMax2",
    S4ENVVOL: "volumeEnvMax2",
    S4__TRIG: "trigger2",
    S4_BOOST: "volumeBoost2",
    S4FBOOST: "factoryVolumeBoost2",
    S4MINTTM: "minStringTriggerTime2",
    S4__BETA: "beta2",
    S4_GAMMA: "gamma2",
    S4_DELTA: "delta2",

    S5_MIDPT: "midpoint1",
    S5ENVTRG: "triggerEnvMax1",
    S5ENVVOL: "volumeEnvMax1",
    S5__TRIG: "trigger1",
    S5_BOOST: "volumeBoost1",
    S5FBOOST: "factoryVolumeBoost1",
    S5MINTTM: "minStringTriggerTime1",
    S5__BETA: "beta1",
    S5_GAMMA: "gamma1",
    S5_DELTA: "delta1"
  };

  const systemName = {};
  for (let key in systemNameR) {
    if (systemNameR.hasOwnProperty(key)) {
      systemName[systemNameR[key]] = key;
    }
  }

  const cfr = {
    //config messages
    SYSEX_GET_CONFIG_SCHEMA: 0x44,
    SYSEX_ACK_GET_CONFIG_SCHEMA: 0x45,
    SYSEX_INTERNAL_ERROR: 0x48,
    SYSEX_GET_CONFIG_PARAM: 0x60,
    SYSEX_ACK_GET_CONFIG_PARAM: 0x61,
    SYSEX_SET_CONFIG_PARAM: 0x62,
    SYSEX_ACK_SET_CONFIG_PARAM: 0x63,
    SYSEX_GET_ALL_CONFIG: 0x66,
    SYSEX_ACK_GET_ALL_CONFIG: 0x67,
    SYSEX_LIST_CC: 0x68,
    SYSEX_ACK_LIST_CC: 0x69,
    SYSEX_CONFIG_SET_ARRAY: 0x6A,
    SYSEX_LIST_CATEGORIES: 0x70,
    SYSEX_ACK_LIST_CATEGORIES: 0x71,
    //firmware updates
    SYSEX_ENTER_FIRMWARE_UPDATE_MODE: 0x50,
    SYSEX_GET_FIRMWARE_BLOCK: 0x51,
    SYSEX_GIVE_FIRMWARE_BLOCK_ASCII: 0x52,
    SYSEX_GIVE_FIRMWARE_BLOCK_BIN: 0x53,
    SYSEX_FW_UPDATE_FINISHED: 0x54,
    SYSEX_CANCEL_FIRMWARE_UPDATE: 0x55,
    SYSEX_GET_FIRMWARE_STATUS: 0x56,
    SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V1: 0x57,
    SYSEX_GIVE_FIRMWARE_BLOCK_BIN_COMPRESSED: 0x58,
    SYSEX_ENABLE_FIRMWARE_UPDATE_COMPRESSION: 0x59,
    SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V2: 0x5A
  };
  const cf = {};
  for (let key in cfr) {
    if (cfr.hasOwnProperty(key)) {
      cf[cfr[key]] = key;
    }
  }

  const sttr = {
    stt7bitByte: 0x00,
    stt8bitByte: 0x01,
    sttUInt32: 0x02,
    sttSInt32: 0x03,
    stt7bitASCII: 0x04,
    stt8bitASCII: 0x05,
    sttSInt16: 0x06,
    sttUInt16: 0x07,
    sttSInt64: 0x08
  };
  const stt = {};
  for (let key1 in sttr) {
    if (sttr.hasOwnProperty(key1)) {
      stt[sttr[key1]] = key1;
    }
  }

  const ttr = {
    ttCheckBox: 0x0,
    ttSpin: 0x1,
    ttManualEntryDecimal: 0x2,
    ttReadOnlyHex: 0x3,
    ttReadOnlyDecimal: 0x4
  };
  //reverse lookup for tt
  const tt = {};
  for (let key2 in ttr) {
    if (ttr.hasOwnProperty(key2)) {
      tt[ttr[key2]] = key2;
    }
  }
  //transfer type of variable
  const ttOfVar = {
    SLEEPTIM: "sttUInt16",
    SINGLECH: "stt7bitByte",
    MIDICHAN: "stt8bitByte",
    MIN__VEL: "stt8bitByte",
    MAX__VEL: "stt8bitByte",
    NOVELCAL: "stt7bitByte",
    ACCCONTR: "stt7bitByte",
    ACCTHRES: "stt7bitByte",
    ACCEL_ON: "stt7bitByte",
    ACC_MINA: "sttSInt16",
    ACC_MAXA: "sttSInt16",
    STR_HOLD: "stt8bitByte",
    LOGCURVE: "stt7bitByte",
    CURVFLAT: "stt8bitByte",
    IGNOREFT: "stt7bitByte",
    BEND____: "stt7bitByte",
    //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
    HAMMERON: "stt7bitByte",
    HAMMERTM: "stt8bitByte",
    HOTVELEN: "stt7bitByte",
    TAP_MODE: "stt7bitByte",
    TRANSPSE: "sttSInt16",
    S0__NOTE: "stt7bitByte",
    S1__NOTE: "stt7bitByte",
    S2__NOTE: "stt7bitByte",
    S3__NOTE: "stt7bitByte",
    S4__NOTE: "stt7bitByte",
    S5__NOTE: "stt7bitByte",
    PICKPROF: "stt7bitByte",
    HWDEVTYP: "stt8bitByte",
    HWDEVVER: "stt8bitByte",
    FWREVMAJ: "stt8bitByte",
    FWREVMIN: "stt8bitByte",
    LEFT_BLE: "stt7bitByte",
    TUTOR_MD: "stt7bitByte",

    HW__CAPS: "stt8bitByte",
    BATT_PCT: "sttUInt16",
    RESETDEF: "stt8bitByte",

    S0_MIDPT: "stt8bitByte", //need to verify
    S0ENVTRG: "stt8bitByte",
    S0ENVVOL: "stt8bitByte",
    S0__TRIG: "stt8bitByte",
    S0_BOOST: "stt8bitByte",
    S0FBOOST: "stt8bitByte",
    S0MINTTM: "stt8bitByte", //need to verify
    S0__BETA: "stt8bitByte", //need to verify
    S0_GAMMA: "stt8bitByte", //need to verify
    S0_DELTA: "stt8bitByte", //need to verify

    S1_MIDPT: "stt8bitByte", //need to verify
    S1ENVTRG: "stt8bitByte",
    S1ENVVOL: "stt8bitByte",
    S1__TRIG: "stt8bitByte",
    S1_BOOST: "stt8bitByte",
    S1FBOOST: "stt8bitByte",
    S1MINTTM: "stt8bitByte", //need to verify
    S1__BETA: "stt8bitByte", //need to verify
    S1_GAMMA: "stt8bitByte", //need to verify
    S1_DELTA: "stt8bitByte", //need to verify

    S2_MIDPT: "stt8bitByte", //need to verify
    S2ENVTRG: "stt8bitByte",
    S2ENVVOL: "stt8bitByte",
    S2__TRIG: "stt8bitByte",
    S2_BOOST: "stt8bitByte",
    S2FBOOST: "stt8bitByte",
    S2MINTTM: "stt8bitByte", //need to verify
    S2__BETA: "stt8bitByte", //need to verify
    S2_GAMMA: "stt8bitByte", //need to verify
    S2_DELTA: "stt8bitByte", //need to verify

    S3_MIDPT: "stt8bitByte", //need to verify
    S3ENVTRG: "stt8bitByte",
    S3ENVVOL: "stt8bitByte",
    S3__TRIG: "stt8bitByte",
    S3_BOOST: "stt8bitByte",
    S3FBOOST: "stt8bitByte",
    S3MINTTM: "stt8bitByte", //need to verify
    S3__BETA: "stt8bitByte", //need to verify
    S3_GAMMA: "stt8bitByte", //need to verify
    S3_DELTA: "stt8bitByte", //need to verify

    S4_MIDPT: "stt8bitByte", //need to verify
    S4ENVTRG: "stt8bitByte",
    S4ENVVOL: "stt8bitByte",
    S4__TRIG: "stt8bitByte",
    S4_BOOST: "stt8bitByte",
    S4FBOOST: "stt8bitByte",
    S4MINTTM: "stt8bitByte", //need to verify
    S4__BETA: "stt8bitByte", //need to verify
    S4_GAMMA: "stt8bitByte", //need to verify
    S4_DELTA: "stt8bitByte", //need to verify

    S5_MIDPT: "stt8bitByte", //need to verify
    S5ENVTRG: "stt8bitByte",
    S5ENVVOL: "stt8bitByte",
    S5__TRIG: "stt8bitByte",
    S5_BOOST: "stt8bitByte",
    S5FBOOST: "stt8bitByte",
    S5MINTTM: "stt8bitByte", //need to verify
    S5__BETA: "stt8bitByte", //need to verify
    S5_GAMMA: "stt8bitByte", //need to verify
    S5_DELTA: "stt8bitByte" //need to verify
  };

  let recommendedVarUse = {
    SLEEPTIM: "dropdown",
    SINGLECH: "switch",
    MIDICHAN: "textBox",
    MIN__VEL: "textBox",
    MAX__VEL: "textBox",
    NOVELCAL: "switch",
    ACCCONTR: "textBox",
    ACCTHRES: "textBox",
    ACCEL_ON: "switch",
    ACC_MINA: "textBox",
    ACC_MAXA: "textBox",
    STR_HOLD: "textBox",
    LOGCURVE: "switch",
    CURVFLAT: "textBox",
    IGNOREFT: "switch",
    BEND____: "switch",
    //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
    HAMMERON: "switch",
    HAMMERTM: "textBox",
    HOTVELEN: "switch",
    TAP_MODE: "switch",
    TRANSPSE: "textBox",
    S0__NOTE: "textBox",
    S1__NOTE: "textBox",
    S2__NOTE: "textBox",
    S3__NOTE: "textBox",
    S4__NOTE: "textBox",
    S5__NOTE: "textBox",
    PICKPROF: "textBox",
    LEFT_BLE: "switch",
    TUTOR_MD: "switch",

    S0_MIDPT: "textBox", //need to verify
    S0ENVTRG: "textBox",
    S0ENVVOL: "textBox",
    S0__TRIG: "textBox",
    S0_BOOST: "textBox",
    S0FBOOST: "textBox",
    S0MINTTM: "textBox", //need to verify
    S0__BETA: "textBox", //need to verify
    S0_GAMMA: "textBox", //need to verify
    S0_DELTA: "textBox", //need to verify

    S1_MIDPT: "textBox", //need to verify
    S1ENVTRG: "textBox",
    S1ENVVOL: "textBox",
    S1__TRIG: "textBox",
    S1_BOOST: "textBox",
    S1FBOOST: "textBox",
    S1MINTTM: "textBox", //need to verify
    S1__BETA: "textBox", //need to verify
    S1_GAMMA: "textBox", //need to verify
    S1_DELTA: "textBox", //need to verify

    S2_MIDPT: "textBox", //need to verify
    S2ENVTRG: "textBox",
    S2ENVVOL: "textBox",
    S2__TRIG: "textBox",
    S2_BOOST: "textBox",
    S2FBOOST: "textBox",
    S2MINTTM: "textBox", //need to verify
    S2__BETA: "textBox", //need to verify
    S2_GAMMA: "textBox", //need to verify
    S2_DELTA: "textBox", //need to verify

    S3_MIDPT: "textBox", //need to verify
    S3ENVTRG: "textBox",
    S3ENVVOL: "textBox",
    S3__TRIG: "textBox",
    S3_BOOST: "textBox",
    S3FBOOST: "textBox",
    S3MINTTM: "textBox", //need to verify
    S3__BETA: "textBox", //need to verify
    S3_GAMMA: "textBox", //need to verify
    S3_DELTA: "textBox", //need to verify

    S4_MIDPT: "textBox", //need to verify
    S4ENVTRG: "textBox",
    S4ENVVOL: "textBox",
    S4__TRIG: "textBox",
    S4_BOOST: "textBox",
    S4FBOOST: "textBox",
    S4MINTTM: "textBox", //need to verify
    S4__BETA: "textBox", //need to verify
    S4_GAMMA: "textBox", //need to verify
    S4_DELTA: "textBox", //need to verify

    S5_MIDPT: "textBox", //need to verify
    S5ENVTRG: "textBox",
    S5ENVVOL: "textBox",
    S5__TRIG: "textBox",
    S5_BOOST: "textBox",
    S5FBOOST: "textBox",
    S5MINTTM: "textBox", //need to verify
    S5__BETA: "textBox", //need to verify
    S5_GAMMA: "textBox", //need to verify
    S5_DELTA: "textBox" //need to verify
  };

  function convert(numberOrArray, type, convertTo) {
    //supplying a convertTo argument is optional if going TO a number
    //if you want to be redundant you can just supply converTo as equal to "num"

    let typeOfConversion;

    let initialNumber = undefined;
    let finalArray = [];

    let initialArray = undefined;
    let finalNumber;

    if (type == "num") {
      initialNumber = numberOrArray;
      typeOfConversion = convertTo;
    } else {
      initialArray = numberOrArray;
      typeOfConversion = type;
      //use convert to in switch statement
    }

    let num1;
    let num2;
    let num3;
    switch (typeOfConversion) {
      case "stt7bitByte":
        if (typeof initialNumber != "undefined") {
          if (initialNumber >= 0 && initialNumber <= 127) {
            return initialNumber;
          } else {
            return 127;
          }
        } else {
          /*
            if (initialArray >= 0 && initialArray <= 127) {
            return(initialArray);
            } else {
            console.log("number wasn't in correct range");
            return(127);
            }
          */
          return initialArray[0];
        }
        break;
      case "stt8bitByte":
        //serialization
        if (typeof initialNumber != "undefined") {
          num1 = 0;
          num2 = initialNumber;

          for (let j = 0; j < Math.floor(initialNumber / 2); j++) {
            num1++;
          }
          if (num2 % 2 == 0) {
            num2 = 0x0;
          } else {
            num2 = 0x40;
          }
          finalArray = finalArray.concat(num1, num2);
          return finalArray;
          //deserialization
        } else {
          num1 = initialArray[0];
          num2 = initialArray[1];

          finalNumber = num1 * 2;
          if (num2 == 0x40) {
            finalNumber++;
          }
          return finalNumber;
        }
        break;
      case "sttUInt32":
      case "sttSInt32":
        if (typeof initialNumber != "undefined") {
          if (Math.sign(initialNumber) == 1) {
            num1 = 0;
            num2 = Math.floor(initialNumber / 4);
            switch (initialNumber % 4) {
              case 1:
                num3 = 0x20;
                break;
              case 2:
                num3 = 0x40;
                break;
              case 3:
                num3 = 0x60;
                break;
            }
          } else {
            num1 = 0x7F;
            initialNumber = initialNumber * -1;
            num2 = 0x7F - Math.floor(initialNumber / 4);
            switch (initialNumber % 4) {
              case 1:
                num3 = 0x60;
                break;
              case 2:
                num3 = 0x40;
                break;
              case 3:
                num3 = 0x20;
                break;
            }
          }
          finalArray = finalArray.concat(num1, num2, num3);
          return finalArray;
        } else {
          num1 = initialArray[0];
          num2 = initialArray[1];
          num3 = initialArray[2];
          finalNumber = 0;
          finalNumber += num2 * 4;
          switch (num3) {
            case 0x20:
              finalNumber++;
              break;
            case 0x40:
              finalNumber = 2;
              break;
            case 0x60:
              finalNumber = 3;
              break;
            case 0x00:
              //do nothing
              break;
          }
          if (num1 == 0x7F) {
            finalNumber *= -1;
          }
          return finalNumber;
        }
        break;
      case "stt7bitASCII":
      case "stt8bitASCII":
        break;
      case "sttSInt16":

        //serializing
        if (typeof initialNumber != "undefined") {
          if (initialNumber == 0) {
            return [0, 0, 0];
          }
          if (Math.sign(initialNumber) == 1) {
            num1 = 0;
            num2 = Math.floor(initialNumber / 4);
            switch (initialNumber % 4) {
              case 1:
                num3 = 0x20;
                break;
              case 2:
                num3 = 0x40;
                break;
              case 3:
                num3 = 0x60;
                break;
              default:
                num3 = 0x0;
            }
          } else {
            num1 = 0x7F;
            initialNumber = initialNumber * -1;
            num2 = 0x7F - Math.floor(initialNumber / 4);
            switch (initialNumber % 4) {
              case 0:
                num2++;
                break;
              case 1:
                num3 = 0x60;
                break;
              case 2:
                num3 = 0x40;
                break;
              case 3:
                num3 = 0x20;
                break;
            }
          }

          finalArray = finalArray.concat(num1, num2, num3);
          return finalArray;

          //deserializing
        } else {
          num1 = initialArray[0];
          num2 = initialArray[1];
          num3 = initialArray[2];
          finalNumber = 0;
          if (num1 == 0 && num2 == 0 && num3 == 0) {
            return 0;
          }
          if (num1 == 0) {
            finalNumber += num2 * 4;
            switch (num3) {
              case 0x20:
                finalNumber++;
                break;
              case 0x40:
                finalNumber += 2;
                break;
              case 0x60:
                finalNumber += 3;
                break;
              case 0x00:
                //do nothing
                break;
            }
          } else if (num1 == 0x7F) {
            finalNumber += (0x7F - num2) * 4;
            switch (num3) {
              case 0x60:
                finalNumber++;
                break;
              case 0x40:
                finalNumber += 2;
                break;
              case 0x20:
                finalNumber += 3;
                break;
              case 0x00:
                finalNumber += 4;
                break;
            }
            finalNumber *= -1;
          }
          return finalNumber;
        }
        break;
      case "sttUInt16":

        //serializing
        if (typeof initialNumber != "undefined") {
          if (initialNumber == 0) {
            return [0, 0, 0];
          }
          num1 = Math.floor(initialNumber / 16);
          num2 = Math.floor(initialNumber / 4);
          switch (initialNumber % 4) {
            case 1:
              num3 = 0x20;
              break;
            case 2:
              num3 = 0x40;
              break;
            case 3:
              num3 = 0x60;
              break;
          }

          finalArray = finalArray.concat(num1, num2, num3);
          return finalArray;

          //deserializing
        } else {
          num1 = initialArray[0];
          num2 = initialArray[1];
          num3 = initialArray[2];
          finalNumber = 0;
          if (num1 == 0 && num2 == 0 && num3 == 0) {
            return 0;
          }
          finalNumber += num2 * 4;
          finalNumber += num3 * 16;
          switch (num3) {
            case 0x20:
              finalNumber++;
              break;
            case 0x40:
              finalNumber += 2;
              break;
            case 0x60:
              finalNumber += 3;
              break;
            case 0x00:
              //do nothing
              break;
          }
          return finalNumber;
        }
        break;

      case "sttSInt64":
        break;
      case "stayTheSame":
      default:
        if (typeof initialNumber != "undefined") {
          return initialNumber;
        } else {
          return initialArray;
        }
        break;
    }
    return "hmm, nothing worked";
  };

  const noteNumbers = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
    "#": 1,
    b: -1
  };

  const buttonNumbers = {
    0: "up",
    1: "down",
    2: "left",
    3: "right",
    4: "enter",
    5: "mute"
  };

  function convertNote(note) {
    let conversion;
    switch (typeof note) {
      case 'number':
        conversion = noteNumbers[note % 12];
        conversion.concat(Math.floor(note / 12).toString());
        break;
      case 'string':
        note = note.split('');
        conversion = noteNumbers[note[0]];
        if (note.length == 3) {
          conversion += noteNumbers[note[1]];
          conversion += parseInt(note[2]) * 12;
        } else if (note.length == 2) {
          conversion += parseInt(note[1]) * 12;
        }
        break;
      default:
    }
    return conversion;
  }

  function serialize(initialMessage) {

    if (typeof initialMessage != "object") {
      throw "serialize(): argument must be of type object.";
    }
    if (arguments.length > 1) {
      throw "serialize(): must contain only one argument of type object.";
    }

    let key = Object.keys(initialMessage)[0];
    let value = Object.values(initialMessage)[0];

    //throw ("serialize(): Invalid key in object \""+key+"\".");

    let valueKey1;
    let valueValue1;
    let valueKey2;
    let valueValue2;

    let transferTypeOfVar;

    let command;
    let commandSpecific;
    let finalMessage = [];
    let finalMessageSize;
    let variables;

    //hard coded values
    let sysexStart = [0xF0, 0x0];
    let jsVendorID = [0x2, 0x2];
    let sysexEnd = 0xF7;

    if (key == "get" && value == "allConfig") {
      return [0xF0, 0x0, 0x2, 0x2, 0x66, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xF, 0xF7];
    }

    switch (typeof value) {
      case 'boolean':
      case 'number':
        if (ttOfVar.hasOwnProperty(systemName[key])) {
          transferTypeOfVar = ttOfVar[systemName[key]];
          variables = convert(Number(value), "num", transferTypeOfVar);
        } else {
          throw "serialize(): invalid value " + value + " in object pair.";
        }
        break;
      case 'string':
        if (key != "get") {
          //put in conversions for like 'D5' and stuff
          value = convertNote(value);
        } else {}
        break;
      case 'object':
        if (Object.keys(value).length == 2 && key == "string") {
          valueKey1 = Object.keys(value)[0];
          valueKey2 = Object.keys(value)[1];
          if (valueKey1 == "index" && valueKey2 == "value") {
            valueValue1 = Object.values(value)[0];
            valueValue2 = Object.values(value)[1];
            switch (valueValue1) {
              case 1:
                key = "openNote6th";
                break;
              case 2:
                key = "openNote5th";
                break;
              case 3:
                key = "openNote4th";
                break;
              case 4:
                key = "openNote3rd";
                break;
              case 5:
                key = "openNote2nd";
                break;
              case 6:
                key = "openNote1st";
                break;
            }
            transferTypeOfVar = ttOfVar[systemName[key]];
            if (typeof valueValue2 == "string") {
              value = convertNote(valueValue2);
            } else {
              value = valueValue2;
            }
            variables = convert(value, "num", transferTypeOfVar);
          }
        } else if (Object.keys(value).length == 2 && key == "dPad") {
          valueKey1 = Object.keys(value)[0];
          valueKey2 = Object.keys(value)[1];
          if (valueKey1 == "index" && valueKey2 == "value") {
            valueValue1 = Object.values(value)[0];
            valueValue2 = Object.values(value)[1];
            variables = generateArrayWithChangeDPadTo(valueValue1, valueValue2);
            transferTypeOfVar = "sttUInt32";
          }
        }
        break;
    }
    if (Array.isArray(variables) == false) {
      variables = [variables];
    }

    //This code, which puts the message together, should eventually be cleaned up
    if (key == "get" && systemName.hasOwnProperty(value) == false) {
      command = cfr["SYSEX_GET_CONFIG_PARAM"];
      commandSpecific = value.split("");
      for (let p = 0; p < commandSpecific.length; p++) {
        commandSpecific[p] = commandSpecific[p].charCodeAt(0);
      }
      finalMessageSize = sysexStart.length + jsVendorID.length + 1 + commandSpecific.length + 1 + 1; //because this doesn't include the size
      finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, finalMessageSize, sysexEnd);
    } else if (systemName.hasOwnProperty(value) == false) {
      if (systemButtonNames.hasOwnProperty(valueValue1)) {
        commandSpecific = systemButtonNames[valueValue1].split("");
      } else {
        commandSpecific = key.split("");
      }
      command = cfr["SYSEX_SET_CONFIG_PARAM"];

      for (let p = 0; p < commandSpecific.length; p++) {
        commandSpecific[p] = commandSpecific[p].charCodeAt(0);
      }
      finalMessageSize = sysexStart.length + jsVendorID.length + 1 //command
      + commandSpecific.length + 1 //stt byte
      + variables.length + 1 //sysex end
      + 1; //because this doesn't include the size
      finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, sttr[transferTypeOfVar], variables, finalMessageSize, sysexEnd);
    }
    if (key == "get" && systemName.hasOwnProperty(value)) {
      command = cfr["SYSEX_GET_CONFIG_PARAM"];
      commandSpecific = systemName[value].split("");
      for (let p = 0; p < commandSpecific.length; p++) {
        commandSpecific[p] = commandSpecific[p].charCodeAt(0);
      }
      finalMessageSize = sysexStart.length + jsVendorID.length + 1 + commandSpecific.length + 1 + 1; //because this doesn't include the size
      finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, finalMessageSize, sysexEnd);
    } else {
      if (systemName.hasOwnProperty(key)) {
        command = cfr["SYSEX_SET_CONFIG_PARAM"];
        commandSpecific = systemName[key].split("");
        for (let p = 0; p < commandSpecific.length; p++) {
          commandSpecific[p] = commandSpecific[p].charCodeAt(0);
        }
        finalMessageSize = sysexStart.length + jsVendorID.length + 1 //command
        + commandSpecific.length + 1 //stt byte
        + variables.length + 1 //sysex end
        + 1; //because this doesn't include the size
        finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, sttr[transferTypeOfVar], variables, finalMessageSize, sysexEnd);
      }
    }
    return finalMessage;
  }

  function deserialize(data) {
    let finalMessage = {};
    let arraySize = data.length - 4;
    let message = new Array(arraySize);
    for (let w = 0; w < message.length; w++) {
      message[w] = data[w + 4];
    }
    let beginVar = 10;

    let command = message.slice(1, 9);
    let joinedCommand = String.fromCharCode(command[0], command[1], command[2], command[3], command[4], command[5], command[6], command[7]);
    let variablePart = message.slice(beginVar, message.length - 2);

    switch (cf[message[0]]) {
      case "SYSEX_GET_CONFIG_SCHEMA":
      case "SYSEX_ACK_GET_ALL_CONFIG":
        beginVar = 1;
        variablePart = message.slice(beginVar, message.length - 2);
        break;
      case "SYSEX_INTERNAL_ERROR":
      case "SYSEX_ACK_GET_CONFIG_PARAM":
      case "SYSEX_ACK_SET_CONFIG_PARAM":
      case "SYSEX_ACK_LIST_CC":
      case "SYSEX_ACK_LIST_CATEGORIES":
        //special string tuning by index
        if (command[0] == 0x53 && command[2] == 0x5F && command[3] == 0x5F && command[4] == 0x4E && command[5] == 0x4F && command[6] == 0x54 && command[7] == 0x45) {
          finalMessage["string"] = { index: -47 - parseInt(command[1]) * -1, value: convert(variablePart, ttOfVar[joinedCommand]) };
          return finalMessage;
        } else if (command[0] == 68 && command[1] == 80 && command[2] == 65 && command[3] == 68 && command[4] == 79 && command[5] == 80) {
          finalMessage["dPad"] = whichDPadAndTypeOfDPadAssignment(variablePart);
          return finalMessage;
        }
        if (systemNameR.hasOwnProperty(joinedCommand)) {
          finalMessage[systemNameR[joinedCommand]] = convert(variablePart, ttOfVar[joinedCommand]);
        } else {
          finalMessage[joinedCommand] = convert(variablePart, ttOfVar[joinedCommand]);
        }
        return finalMessage;
        break;
      //firmware updates
      case "SYSEX_GET_FIRMWARE_BLOCK":
      case "SYSEX_FW_UPDATE_FINISHED":
      case "SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V1":
      case "SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V2":
        break;
    }
    return 0;
  }
});