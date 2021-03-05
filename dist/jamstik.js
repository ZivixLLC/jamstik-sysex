'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _systemNameR;

exports.hello = function() { print("Hello from Jamstik!"); };
exports.serialize = serialize;
exports.deserialize = deserialize;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  jamstik.js
*/

var dPadWords = [];
for (var i = 0; i < 13; i++) {
  dPadWords.push('up', 'down', 'left', 'right', 'enter', 'mute');
}
var dPadWords7 = [];
for (var _i = 0; _i < 13; _i++) {
  dPadWords7.push('up', 'down', 'left', 'right', 'enter', 'mute', 'plus', 'minus');
}
var dPadAssignments = [];

for (var _i2 = 0; _i2 < 6; _i2++) {
  dPadAssignments.push('none');
}
for (var _i3 = 0; _i3 < 6; _i3++) {
  dPadAssignments.push('capoUp');
}
for (var _i4 = 0; _i4 < 6; _i4++) {
  dPadAssignments.push('capoDown');
}
for (var _i5 = 0; _i5 < 6; _i5++) {
  dPadAssignments.push('octaveUp');
}
for (var _i6 = 0; _i6 < 6; _i6++) {
  dPadAssignments.push('octaveDown');
}
for (var _i7 = 0; _i7 < 6; _i7++) {
  dPadAssignments.push('capoReset');
}
for (var _i8 = 0; _i8 < 6; _i8++) {
  dPadAssignments.push('stringBend');
}
for (var _i9 = 0; _i9 < 6; _i9++) {
  dPadAssignments.push('mute');
}
for (var _i10 = 0; _i10 < 6; _i10++) {
  dPadAssignments.push('tapMode');
}
for (var _i11 = 0; _i11 < 6; _i11++) {
  dPadAssignments.push('tapModeMomentary');
}
for (var _i12 = 0; _i12 < 6; _i12++) {
  dPadAssignments.push('singleMultiChannelToggle');
}
for (var _i13 = 0; _i13 < 6; _i13++) {
  dPadAssignments.push('modulationToggle');
}
for (var _i14 = 0; _i14 < 6; _i14++) {
  dPadAssignments.push('panic');
}
var dPadAssignments7 = [];

for (var _i15 = 0; _i15 < 8; _i15++) {
  dPadAssignments7.push('none');
}
for (var _i16 = 0; _i16 < 8; _i16++) {
  dPadAssignments7.push('capoUp');
}
for (var _i17 = 0; _i17 < 8; _i17++) {
  dPadAssignments7.push('capoDown');
}
for (var _i18 = 0; _i18 < 8; _i18++) {
  dPadAssignments7.push('octaveUp');
}
for (var _i19 = 0; _i19 < 8; _i19++) {
  dPadAssignments7.push('octaveDown');
}
for (var _i20 = 0; _i20 < 8; _i20++) {
  dPadAssignments7.push('capoReset');
}
for (var _i21 = 0; _i21 < 8; _i21++) {
  dPadAssignments7.push('stringBend');
}
for (var _i22 = 0; _i22 < 8; _i22++) {
  dPadAssignments7.push('mute');
}
for (var _i23 = 0; _i23 < 8; _i23++) {
  dPadAssignments7.push('tapMode');
}
for (var _i24 = 0; _i24 < 8; _i24++) {
  dPadAssignments7.push('tapModeMomentary');
}
for (var _i25 = 0; _i25 < 8; _i25++) {
  dPadAssignments7.push('singleMultiChannelToggle');
}
for (var _i26 = 0; _i26 < 8; _i26++) {
  dPadAssignments7.push('modulationToggle');
}
for (var _i27 = 0; _i27 < 8; _i27++) {
  dPadAssignments7.push('panic');
}
var dPadValues = [
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

var dPadValues7 = [
//none
[0, 0, 0, 0, 16, 0, 0, 0, 0, 0], [0, 0, 0, 0, 32, 0, 0, 0, 0, 0], [0, 0, 0, 0, 64, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 8, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 4, 0, 0, 0, 0, 0, 0], [0, 0, 0, 8, 0, 0, 0, 0, 0, 0],

//capoUp
[0, 0, 32, 0, 16, 0, 4, 0, 0, 64], [0, 0, 32, 0, 32, 0, 4, 0, 0, 64], [0, 0, 32, 0, 64, 0, 4, 0, 0, 64], [0, 0, 32, 1, 0, 0, 4, 0, 0, 64], [0, 0, 32, 0, 8, 0, 4, 0, 0, 64], [0, 0, 32, 2, 0, 0, 4, 0, 0, 64], [0, 0, 32, 4, 0, 0, 4, 0, 0, 64], [0, 0, 32, 8, 0, 0, 4, 0, 0, 64],
//capoDown
[0, 0, 32, 0, 16, 0, 5, 127, 127, 64], [0, 0, 32, 0, 32, 0, 5, 127, 127, 64], [0, 0, 32, 0, 64, 0, 5, 127, 127, 64], [0, 0, 32, 1, 0, 0, 5, 127, 127, 64], [0, 0, 32, 0, 8, 0, 5, 127, 127, 64], [0, 0, 32, 2, 0, 0, 5, 127, 127, 64], [0, 0, 32, 4, 0, 0, 5, 127, 127, 64], [0, 0, 32, 8, 0, 0, 5, 127, 127, 64],
//octaveUp
[0, 0, 32, 0, 16, 0, 4, 0, 6, 0], [0, 0, 32, 0, 32, 0, 4, 0, 6, 0], [0, 0, 32, 0, 64, 0, 4, 0, 6, 0], [0, 0, 32, 1, 0, 0, 4, 0, 6, 0], [0, 0, 32, 0, 8, 0, 4, 0, 6, 0], [0, 0, 32, 2, 0, 0, 4, 0, 6, 0], [0, 0, 32, 4, 0, 0, 4, 0, 6, 0], [0, 0, 32, 8, 0, 0, 4, 0, 6, 0],
//octaveDown
[0, 0, 32, 0, 16, 0, 5, 127, 122, 0], [0, 0, 32, 0, 32, 0, 5, 127, 122, 0], [0, 0, 32, 0, 64, 0, 5, 127, 122, 0], [0, 0, 32, 1, 0, 0, 5, 127, 122, 0], [0, 0, 32, 0, 8, 0, 5, 127, 122, 0], [0, 0, 32, 2, 0, 0, 5, 127, 122, 0], [0, 0, 32, 4, 0, 0, 5, 127, 122, 0], [0, 0, 32, 8, 0, 0, 5, 127, 122, 0],
//capoReset
[0, 0, 32, 0, 16, 0, 20, 0, 0, 0], [0, 0, 32, 0, 32, 0, 20, 0, 0, 0], [0, 0, 32, 0, 64, 0, 20, 0, 0, 0], [0, 0, 32, 1, 0, 0, 20, 0, 0, 0], [0, 0, 32, 0, 8, 0, 20, 0, 0, 0], [0, 0, 32, 2, 0, 0, 20, 0, 0, 0], [0, 0, 32, 4, 0, 0, 20, 0, 0, 0], [0, 0, 32, 8, 0, 0, 20, 0, 0, 0],
//stringBend
[0, 0, 32, 0, 16, 0, 6, 0, 1, 0], [0, 0, 32, 0, 32, 0, 6, 0, 1, 0], [0, 0, 32, 0, 64, 0, 6, 0, 1, 0], [0, 0, 32, 1, 0, 0, 6, 0, 1, 0], [0, 0, 32, 0, 8, 0, 6, 0, 1, 0], [0, 0, 32, 2, 0, 0, 6, 0, 1, 0], [0, 0, 32, 4, 0, 0, 6, 0, 1, 0], [0, 0, 32, 8, 0, 0, 6, 0, 1, 0],
//mute
[0, 0, 96, 0, 16, 0, 10, 0, 1, 0], [0, 0, 96, 0, 32, 0, 10, 0, 1, 0], [0, 0, 96, 0, 64, 0, 10, 0, 1, 0], [0, 0, 96, 1, 0, 0, 10, 0, 1, 0], [0, 0, 96, 0, 8, 0, 10, 0, 1, 0], [0, 0, 96, 2, 0, 0, 10, 0, 1, 0], [0, 0, 96, 4, 0, 0, 10, 0, 1, 0], [0, 0, 96, 8, 0, 0, 10, 0, 1, 0],
//tapMode
[0, 0, 32, 0, 16, 0, 12, 0, 1, 0], [0, 0, 32, 0, 32, 0, 12, 0, 1, 0], [0, 0, 32, 0, 64, 0, 12, 0, 1, 0], [0, 0, 32, 1, 0, 0, 12, 0, 1, 0], [0, 0, 32, 0, 8, 0, 12, 0, 1, 0], [0, 0, 32, 2, 0, 0, 12, 0, 1, 0], [0, 0, 32, 4, 0, 0, 12, 0, 1, 0], [0, 0, 32, 8, 0, 0, 12, 0, 1, 0],
//tapModeMomentary
[0, 0, 96, 0, 16, 0, 12, 0, 1, 0], [0, 0, 96, 0, 32, 0, 12, 0, 1, 0], [0, 0, 96, 0, 64, 0, 12, 0, 1, 0], [0, 0, 96, 1, 0, 0, 12, 0, 1, 0], [0, 0, 96, 0, 8, 0, 12, 0, 1, 0], [0, 0, 96, 2, 0, 0, 12, 0, 1, 0], [0, 0, 96, 4, 0, 0, 12, 0, 1, 0], [0, 0, 96, 8, 0, 0, 12, 0, 1, 0],
//singleMultiChannelToggle
[0, 0, 32, 0, 16, 0, 14, 0, 1, 0], [0, 0, 32, 0, 32, 0, 14, 0, 1, 0], [0, 0, 32, 0, 64, 0, 14, 0, 1, 0], [0, 0, 32, 1, 0, 0, 14, 0, 1, 0], [0, 0, 32, 0, 8, 0, 14, 0, 1, 0], [0, 0, 32, 2, 0, 0, 14, 0, 1, 0], [0, 0, 32, 4, 0, 0, 14, 0, 1, 0], [0, 0, 32, 8, 0, 0, 14, 0, 1, 0],
//modulationToggle
[0, 0, 32, 0, 16, 0, 17, 127, 127, 64], [0, 0, 32, 0, 32, 0, 17, 127, 127, 64], [0, 0, 32, 0, 64, 0, 17, 127, 127, 64], [0, 0, 32, 1, 0, 0, 17, 127, 127, 64], [0, 0, 32, 0, 8, 0, 17, 127, 127, 64], [0, 0, 32, 2, 0, 0, 17, 127, 127, 64], [0, 0, 32, 4, 0, 0, 17, 127, 127, 64], [0, 0, 32, 8, 0, 0, 17, 127, 127, 64],
//panic
[0, 0, 32, 0, 16, 0, 18, 0, 0, 0], [0, 0, 32, 0, 32, 0, 18, 0, 0, 0], [0, 0, 32, 0, 64, 0, 18, 0, 0, 0], [0, 0, 32, 1, 0, 0, 18, 0, 0, 0], [0, 0, 32, 0, 8, 0, 18, 0, 0, 0], [0, 0, 32, 4, 0, 0, 18, 0, 0, 0], [0, 0, 32, 8, 0, 0, 18, 0, 0, 0], [0, 0, 32, 2, 0, 0, 18, 0, 0, 0]];

var dPadValueNum = {
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

var dPadIndex = {
  up: 0,
  down: 1,
  left: 2,
  right: 3,
  enter: 4,
  mute: 5,
  plus: 6,
  minus: 7
};

var systemButtonNames = {
  up: 'DPADOP00',
  down: 'DPADOP01',
  left: 'DPADOP02',
  right: 'DPADOP03',
  enter: 'DPADOP04',
  mute: 'DPADOP05',
  plus: 'DPADOP06',
  minus: 'DPADOP07'
};

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function dec2bin(dec) {
	var str = (dec >>> 0).toString(2)
	while (str.length < 7)
		str = '0' + str
	const string = str
	return string
}

//TODO: ADD 7 FRET THINGS
function whichDPadAndTypeOfDPadAssignment(arrayVariables) {
  var whichDPad = void 0;
  var typeOfAssignment = void 0;
  var finalObject = {};
  //console.log("it was a dpad message",arrayVariables);

  for (var _i28 = 0; _i28 < (arrayVariables.length == 5 ? dPadValues.length : dPadValues7.length); _i28++) {
    if (arraysEqual(arrayVariables, arrayVariables.length == 5 ? dPadValues[_i28] : dPadValues7[_i28])) {
      whichDPad = arrayVariables.length == 5 ? dPadWords[_i28] : dPadWords7[_i28];
      typeOfAssignment = arrayVariables.length == 5 ? dPadAssignments[_i28] : dPadAssignments7[_i28];
    }
  }
  //console.log("whichDPad is",whichDPad);
  //finalObject[whichDPad] = typeOfAssignment;
  finalObject = { index: whichDPad, value: typeOfAssignment };
  return finalObject;
}

function generateArrayWithChangeDPadTo(index, value, typeOfJamstik) {
  switch (typeOfJamstik) {
    case 'dPad7':
      //console.log("dpad7 things",dPadValues7[8*dPadValueNum[value]+dPadIndex[index]]);
      return dPadValues7[8 * dPadValueNum[value] + dPadIndex[index]];
      break;
    case 'dPad':
    default:
      //console.log("dpad + things");
      return dPadValues[6 * dPadValueNum[value] + dPadIndex[index]];
      break;
  }
}

var systemNameR = (_systemNameR = {
  SLEEPTIM: 'sleepTime',
  SINGLECH: 'singleMidiChannelMode',
  MIDICHAN: 'midiChannelOf1stString',
  MIN__VEL: 'minimumMidiVelocity',
  MAX__VEL: 'maximumMidiVelocity',
  NOVELCAL: 'noMidiVelocity',
  ACCCONTR: 'accelerometerController',
  ACCTHRES: 'accelerometerThresholdTo',
  ACCEL_ON: 'accelerometer',
  ACC_MINA: 'accelerometerPitchAngle',
  ACC_MAXA: 'accelerometerPitchAngle2',
  STR_HOLD: 'stringHoldTime',
  LOGCURVE: 'volumeCurve',
  CURVFLAT: 'logVolumeCurveFlattening',
  IGNOREFT: 'sustainMode',
  BEND____: 'stringBend',
  //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
  HAMMERON: 'hammerOns',
  HAMMERTM: 'hammerOnTimer',
  HOTVELEN: 'hammerOnVelocity',
  TAP_MODE: 'tapMode',
  TRANSPSE: 'transpose',
  S0__NOTE: 'openNote6th',
  S1__NOTE: 'openNote5th',
  S2__NOTE: 'openNote4th',
  S3__NOTE: 'openNote3rd',
  S4__NOTE: 'openNote2nd',
  S5__NOTE: 'openNote1st',
  S0_BOOST: 'boostString6',
  S1_BOOST: 'boostString5',
  S2_BOOST: 'boostString4',
  S3_BOOST: 'boostString3',
  S4_BOOST: 'boostString2',
  S5_BOOST: 'boostString1',
  PICKPROF: 'pickingProfile',
  HWDEVTYP: 'hardwareDeviceType',
  HWDEVVER: 'hardwareDeviceVersion',
  FWREVMAJ: 'firmwareRevisionMajor',
  FWREVMIN: 'firmwareRevisionMinor',
  FWDSPMAJ: 'firmwareDSPMajor',
  FWDSPMIN: 'firmwareDSPMinor',
  LEFT_BLE: 'leftHanded',
  TUTOR_MD: 'tutorMode',
  
  KEYBDMOD: 'keyboardMode', /* JS Studio parameters */ 
  FACTTEST: 'factoryTest',
  EXPRESSN: 'expressionSend',
  PITCHBEN: 'pitchBendSend',
  BLE_ENAB: 'bluetoothEnable',
  PTCHBSEM: 'pitchBendRangeSemitones',
  PTCHBCEN: 'pitchBendRangeCents',
  
  HW__CAPS: 'hardwareCapabilityFlags',
  BATT_PCT: 'batteryPercent',
  RESETDEF: 'resetDefaults',

  S0_MIDPT: 'midpoint6',
  S0ENVTRG: 'triggerEnvMax6',
  S0ENVVOL: 'volumeEnvMax6',
  S0__TRIG: 'trigger6'
  
}, _defineProperty(_systemNameR, 'S0_BOOST', 'volumeBoost6'), _defineProperty(_systemNameR, 'S0FBOOST', 'factoryVolumeBoost6'), _defineProperty(_systemNameR, 'S0MINTTM', 'minStringTriggerTime6'), _defineProperty(_systemNameR, 'S0__BETA', 'beta6'), _defineProperty(_systemNameR, 'S0_GAMMA', 'gamma6'), _defineProperty(_systemNameR, 'S0_DELTA', 'delta6'), _defineProperty(_systemNameR, 'S1_MIDPT', 'midpoint5'), _defineProperty(_systemNameR, 'S1ENVTRG', 'triggerEnvMax5'), _defineProperty(_systemNameR, 'S1ENVVOL', 'volumeEnvMax5'), _defineProperty(_systemNameR, 'S1__TRIG', 'trigger5'), _defineProperty(_systemNameR, 'S1_BOOST', 'volumeBoost5'), _defineProperty(_systemNameR, 'S1FBOOST', 'factoryVolumeBoost5'), _defineProperty(_systemNameR, 'S1MINTTM', 'minStringTriggerTime5'), _defineProperty(_systemNameR, 'S1__BETA', 'beta5'), _defineProperty(_systemNameR, 'S1_GAMMA', 'gamma5'), _defineProperty(_systemNameR, 'S1_DELTA', 'delta5'), _defineProperty(_systemNameR, 'S2_MIDPT', 'midpoint4'), _defineProperty(_systemNameR, 'S2ENVTRG', 'triggerEnvMax4'), _defineProperty(_systemNameR, 'S2ENVVOL', 'volumeEnvMax4'), _defineProperty(_systemNameR, 'S2__TRIG', 'trigger4'), _defineProperty(_systemNameR, 'S2_BOOST', 'volumeBoost4'), _defineProperty(_systemNameR, 'S2FBOOST', 'factoryVolumeBoost4'), _defineProperty(_systemNameR, 'S2MINTTM', 'minStringTriggerTime4'), _defineProperty(_systemNameR, 'S2__BETA', 'beta4'), _defineProperty(_systemNameR, 'S2_GAMMA', 'gamma4'), _defineProperty(_systemNameR, 'S2_DELTA', 'delta4'), _defineProperty(_systemNameR, 'S3_MIDPT', 'midpoint3'), _defineProperty(_systemNameR, 'S3ENVTRG', 'triggerEnvMax3'), _defineProperty(_systemNameR, 'S3ENVVOL', 'volumeEnvMax3'), _defineProperty(_systemNameR, 'S3__TRIG', 'trigger3'), _defineProperty(_systemNameR, 'S3_BOOST', 'volumeBoost3'), _defineProperty(_systemNameR, 'S3FBOOST', 'factoryVolumeBoost3'), _defineProperty(_systemNameR, 'S3MINTTM', 'minStringTriggerTime3'), _defineProperty(_systemNameR, 'S3__BETA', 'beta3'), _defineProperty(_systemNameR, 'S3_GAMMA', 'gamma3'), _defineProperty(_systemNameR, 'S3_DELTA', 'delta3'), _defineProperty(_systemNameR, 'S4_MIDPT', 'midpoint2'), _defineProperty(_systemNameR, 'S4ENVTRG', 'triggerEnvMax2'), _defineProperty(_systemNameR, 'S4ENVVOL', 'volumeEnvMax2'), _defineProperty(_systemNameR, 'S4__TRIG', 'trigger2'), _defineProperty(_systemNameR, 'S4_BOOST', 'volumeBoost2'), _defineProperty(_systemNameR, 'S4FBOOST', 'factoryVolumeBoost2'), _defineProperty(_systemNameR, 'S4MINTTM', 'minStringTriggerTime2'), _defineProperty(_systemNameR, 'S4__BETA', 'beta2'), _defineProperty(_systemNameR, 'S4_GAMMA', 'gamma2'), _defineProperty(_systemNameR, 'S4_DELTA', 'delta2'), _defineProperty(_systemNameR, 'S5_MIDPT', 'midpoint1'), _defineProperty(_systemNameR, 'S5ENVTRG', 'triggerEnvMax1'), _defineProperty(_systemNameR, 'S5ENVVOL', 'volumeEnvMax1'), _defineProperty(_systemNameR, 'S5__TRIG', 'trigger1'), _defineProperty(_systemNameR, 'S5_BOOST', 'volumeBoost1'), _defineProperty(_systemNameR, 'S5FBOOST', 'factoryVolumeBoost1'), _defineProperty(_systemNameR, 'S5MINTTM', 'minStringTriggerTime1'), _defineProperty(_systemNameR, 'S5__BETA', 'beta1'), _defineProperty(_systemNameR, 'S5_GAMMA', 'gamma1'), _defineProperty(_systemNameR, 'S5_DELTA', 'delta1'), _defineProperty(_systemNameR, 'NUMFRETS', 'numberOfFrets'), _defineProperty(_systemNameR, 'HAMMERMV', 'hammerOnSensitivity'), _defineProperty(_systemNameR, 'HAMMERPO', 'pullOffSensitivity'), _defineProperty(_systemNameR, 'BAR_HELP', 'barreChordAssist'), _defineProperty(_systemNameR, 'FSENSITI', 'fretSensitivity'), _defineProperty(_systemNameR, 'DEMOMODE', 'demoMode'), _defineProperty(_systemNameR, 'CONNSTAT', 'connectionStatus'), _defineProperty(_systemNameR, 'STRGSENS', 'stringSensitivity'), _systemNameR);

var systemName = {};
for (var key in systemNameR) {
  if (systemNameR.hasOwnProperty(key)) {
    systemName[systemNameR[key]] = key;
  }
}

var cfr = {
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
  SYSEX_CONFIG_SET_ARRAY: 0x6a,
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
  SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V2: 0x5a
};
var cf = {};
for (var _key in cfr) {
  if (cfr.hasOwnProperty(_key)) {
    cf[cfr[_key]] = _key;
  }
}

var sttr = {
  stt7bitByte: 0x00,
  stt8bitByte: 0x01,
  sttUInt32: 0x02,
  sttSInt32: 0x03,
  stt7bitASCII: 0x04,
  stt8bitASCII: 0x05,
  sttSInt16: 0x06,
  sttUInt16: 0x07,
  sttSInt64: 0x08,
  sttUInt64: 0x09
};
var stt = {};
for (var key1 in sttr) {
  if (sttr.hasOwnProperty(key1)) {
    stt[sttr[key1]] = key1;
  }
}

var ttr = {
  ttCheckBox: 0x0,
  ttSpin: 0x1,
  ttManualEntryDecimal: 0x2,
  ttReadOnlyHex: 0x3,
  ttReadOnlyDecimal: 0x4
  //reverse lookup for tt
};var tt = {};
for (var key2 in ttr) {
  if (ttr.hasOwnProperty(key2)) {
    tt[ttr[key2]] = key2;
  }
}

//THE SEVEN FRET HAS SOME NEW THINGS
//

//transfer type of variable
var ttOfVar = {
  SLEEPTIM: 'sttUInt32',
  SINGLECH: 'stt7bitByte',
  MIDICHAN: 'stt8bitByte',
  MIN__VEL: 'stt8bitByte',
  MAX__VEL: 'stt8bitByte',
  NOVELCAL: 'stt7bitByte',
  ACCCONTR: 'stt7bitByte',
  ACCTHRES: 'stt7bitByte',
  ACCEL_ON: 'stt7bitByte',
  ACC_MINA: 'sttSInt16',
  ACC_MAXA: 'sttSInt16',
  STR_HOLD: 'stt8bitByte',
  LOGCURVE: 'stt7bitByte',
  CURVFLAT: 'stt8bitByte',
  IGNOREFT: 'stt7bitByte',
  BEND____: 'stt7bitByte',
  //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
  HAMMERON: 'stt7bitByte',
  HAMMERTM: 'stt8bitByte',
  HOTVELEN: 'stt7bitByte',
  TAP_MODE: 'stt7bitByte',
  TRANSPSE: 'sttSInt16',
  S0__NOTE: 'stt7bitByte',
  S1__NOTE: 'stt7bitByte',
  S2__NOTE: 'stt7bitByte',
  S3__NOTE: 'stt7bitByte',
  S4__NOTE: 'stt7bitByte',
  S5__NOTE: 'stt7bitByte',
  PICKPROF: 'stt7bitByte',
  HWDEVTYP: 'stt8bitByte',
  HWDEVVER: 'stt8bitByte',
  FWREVMAJ: 'stt8bitByte',
  FWREVMIN: 'stt8bitByte',
  LEFT_BLE: 'stt7bitByte',
  TUTOR_MD: 'stt7bitByte',
  KEYBDMOD: 'stt7bitByte', /* JS Studio parameters */ 
  FACTTEST: 'stt7bitByte',
  EXPRESSN: 'stt7bitByte',
  PITCHBEN: 'stt7bitByte',
  BLE_ENAB: 'stt7bitByte',
  PTCHBSEM: 'stt7bitByte',
  PTCHBCEN: 'stt7bitByte',

  HW__CAPS: 'stt8bitByte',
  BATT_PCT: 'stt7bitByte',
  RESETDEF: 'stt8bitByte',

  S0_MIDPT: 'stt8bitByte', //need to verify
  S0ENVTRG: 'stt8bitByte',
  S0ENVVOL: 'stt8bitByte',
  S0__TRIG: 'stt8bitByte',
  S0_BOOST: 'stt8bitByte',
  S0FBOOST: 'stt8bitByte',
  S0MINTTM: 'stt8bitByte', //need to verify
  S0__BETA: 'stt8bitByte', //need to verify
  S0_GAMMA: 'stt8bitByte', //need to verify
  S0_DELTA: 'stt8bitByte', //need to verify

  S1_MIDPT: 'stt8bitByte', //need to verify
  S1ENVTRG: 'stt8bitByte',
  S1ENVVOL: 'stt8bitByte',
  S1__TRIG: 'stt8bitByte',
  S1_BOOST: 'stt8bitByte',
  S1FBOOST: 'stt8bitByte',
  S1MINTTM: 'stt8bitByte', //need to verify
  S1__BETA: 'stt8bitByte', //need to verify
  S1_GAMMA: 'stt8bitByte', //need to verify
  S1_DELTA: 'stt8bitByte', //need to verify

  S2_MIDPT: 'stt8bitByte', //need to verify
  S2ENVTRG: 'stt8bitByte',
  S2ENVVOL: 'stt8bitByte',
  S2__TRIG: 'stt8bitByte',
  S2_BOOST: 'stt8bitByte',
  S2FBOOST: 'stt8bitByte',
  S2MINTTM: 'stt8bitByte', //need to verify
  S2__BETA: 'stt8bitByte', //need to verify
  S2_GAMMA: 'stt8bitByte', //need to verify
  S2_DELTA: 'stt8bitByte', //need to verify

  S3_MIDPT: 'stt8bitByte', //need to verify
  S3ENVTRG: 'stt8bitByte',
  S3ENVVOL: 'stt8bitByte',
  S3__TRIG: 'stt8bitByte',
  S3_BOOST: 'stt8bitByte',
  S3FBOOST: 'stt8bitByte',
  S3MINTTM: 'stt8bitByte', //need to verify
  S3__BETA: 'stt8bitByte', //need to verify
  S3_GAMMA: 'stt8bitByte', //need to verify
  S3_DELTA: 'stt8bitByte', //need to verify

  S4_MIDPT: 'stt8bitByte', //need to verify
  S4ENVTRG: 'stt8bitByte',
  S4ENVVOL: 'stt8bitByte',
  S4__TRIG: 'stt8bitByte',
  S4_BOOST: 'stt8bitByte',
  S4FBOOST: 'stt8bitByte',
  S4MINTTM: 'stt8bitByte', //need to verify
  S4__BETA: 'stt8bitByte', //need to verify
  S4_GAMMA: 'stt8bitByte', //need to verify
  S4_DELTA: 'stt8bitByte', //need to verify

  S5_MIDPT: 'stt8bitByte', //need to verify
  S5ENVTRG: 'stt8bitByte',
  S5ENVVOL: 'stt8bitByte',
  S5__TRIG: 'stt8bitByte',
  S5_BOOST: 'stt8bitByte',
  S5FBOOST: 'stt8bitByte',
  S5MINTTM: 'stt8bitByte', //need to verify
  S5__BETA: 'stt8bitByte', //need to verify
  S5_GAMMA: 'stt8bitByte', //need to verify
  S5_DELTA: 'stt8bitByte', //need to verify

  NUMFRETS: 'stt8bitByte',
  HAMMERMV: 'stt8bitByte',
  HAMMERPO: 'stt8bitByte',
  BAR_HELP: 'stt8bitByte',
  FSENSITI: 'sttSInt32',
  DEMOMODE: 'stt7bitByte',

  CONNSTAT: 'stt7bitByte' //need to verify
};

var recommendedVarUse = {
  SLEEPTIM: 'dropdown',
  SINGLECH: 'switch',
  MIDICHAN: 'textBox',
  MIN__VEL: 'textBox',
  MAX__VEL: 'textBox',
  NOVELCAL: 'switch',
  ACCCONTR: 'textBox',
  ACCTHRES: 'textBox',
  ACCEL_ON: 'switch',
  ACC_MINA: 'textBox',
  ACC_MAXA: 'textBox',
  STR_HOLD: 'textBox',
  LOGCURVE: 'switch',
  CURVFLAT: 'textBox',
  IGNOREFT: 'switch',
  BEND____: 'switch',
  //LEFTY STUFF GOES HERE, HASN'T BEEN IMPLEMENTED YET
  HAMMERON: 'switch',
  HAMMERTM: 'textBox',
  HOTVELEN: 'switch',
  TAP_MODE: 'switch',
  TRANSPSE: 'textBox',
  S0__NOTE: 'textBox',
  S1__NOTE: 'textBox',
  S2__NOTE: 'textBox',
  S3__NOTE: 'textBox',
  S4__NOTE: 'textBox',
  S5__NOTE: 'textBox',
  PICKPROF: 'textBox',
  LEFT_BLE: 'switch',
  TUTOR_MD: 'switch',
  KEYBDMOD: 'switch', /* JS Studio parameters */ 
  FACTTEST: 'switch',
  EXPRESSN: 'switch',
  PITCHBEN: 'switch',
  BLE_ENAB: 'switch',
  PTCHBSEM: 'textBox',
  PTCHBCEN: 'textBox',

  S0_MIDPT: 'textBox', //need to verify
  S0ENVTRG: 'textBox',
  S0ENVVOL: 'textBox',
  S0__TRIG: 'textBox',
  S0_BOOST: 'textBox',
  S0FBOOST: 'textBox',
  S0MINTTM: 'textBox', //need to verify
  S0__BETA: 'textBox', //need to verify
  S0_GAMMA: 'textBox', //need to verify
  S0_DELTA: 'textBox', //need to verify

  S1_MIDPT: 'textBox', //need to verify
  S1ENVTRG: 'textBox',
  S1ENVVOL: 'textBox',
  S1__TRIG: 'textBox',
  S1_BOOST: 'textBox',
  S1FBOOST: 'textBox',
  S1MINTTM: 'textBox', //need to verify
  S1__BETA: 'textBox', //need to verify
  S1_GAMMA: 'textBox', //need to verify
  S1_DELTA: 'textBox', //need to verify

  S2_MIDPT: 'textBox', //need to verify
  S2ENVTRG: 'textBox',
  S2ENVVOL: 'textBox',
  S2__TRIG: 'textBox',
  S2_BOOST: 'textBox',
  S2FBOOST: 'textBox',
  S2MINTTM: 'textBox', //need to verify
  S2__BETA: 'textBox', //need to verify
  S2_GAMMA: 'textBox', //need to verify
  S2_DELTA: 'textBox', //need to verify

  S3_MIDPT: 'textBox', //need to verify
  S3ENVTRG: 'textBox',
  S3ENVVOL: 'textBox',
  S3__TRIG: 'textBox',
  S3_BOOST: 'textBox',
  S3FBOOST: 'textBox',
  S3MINTTM: 'textBox', //need to verify
  S3__BETA: 'textBox', //need to verify
  S3_GAMMA: 'textBox', //need to verify
  S3_DELTA: 'textBox', //need to verify

  S4_MIDPT: 'textBox', //need to verify
  S4ENVTRG: 'textBox',
  S4ENVVOL: 'textBox',
  S4__TRIG: 'textBox',
  S4_BOOST: 'textBox',
  S4FBOOST: 'textBox',
  S4MINTTM: 'textBox', //need to verify
  S4__BETA: 'textBox', //need to verify
  S4_GAMMA: 'textBox', //need to verify
  S4_DELTA: 'textBox', //need to verify

  S5_MIDPT: 'textBox', //need to verify
  S5ENVTRG: 'textBox',
  S5ENVVOL: 'textBox',
  S5__TRIG: 'textBox',
  S5_BOOST: 'textBox',
  S5FBOOST: 'textBox',
  S5MINTTM: 'textBox', //need to verify
  S5__BETA: 'textBox', //need to verify
  S5_GAMMA: 'textBox', //need to verify
  S5_DELTA: 'textBox', //need to verify

  NUMFRETS: 'textBox',
  HAMMERMV: 'textBox',
  HAMMERPO: 'textBox',
  BAR_HELP: 'textBox',
  FSENSITI: 'textBox'
};

function convert(numberOrArray, type, convertTo) {
  //supplying a convertTo argument is optional if going TO a number
  //if you want to be redundant you can just supply converTo as equal to "num"

  var typeOfConversion = void 0;

  var initialNumber = undefined;
  var finalArray = [];

  var initialArray = undefined;
  var finalNumber = void 0;

  if (type == 'num') {
    initialNumber = numberOrArray;
    typeOfConversion = convertTo;
  } else {
    initialArray = numberOrArray;
    typeOfConversion = type;
    //use convert to in switch statement
  }

  var num1 = void 0;
  var num2 = void 0;
  var num3 = void 0;
  var num4 = void 0;
  var num5 = void 0;
  switch (typeOfConversion) {
    case 'stt7bitByte':
      if (typeof initialNumber != 'undefined') {
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
        //console.log("number wasn't in correct range");
        return(127);
        }
        */
        return initialArray[0];
      }
      break;
    case 'stt8bitByte':
      //serialization
      if (typeof initialNumber != 'undefined') {
        num1 = 0;
        num2 = initialNumber;

        for (var j = 0; j < Math.floor(initialNumber / 2); j++) {
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
    case 'sttUInt32':
    //DOES THIS WORK?
    case 'sttSInt32':
      //serializing
      if (typeof initialNumber != 'undefined') {
          var numbers7bit = [0, 0, 0, 0, 0];

          // grab least significant 4 bits and sll 3
          numbers7bit[4] = (initialNumber & 0x0f) << 3;

          var kernel = 0x7f << 4;
          var shift = 4;
          for (var i = 3; i >= 0; i--) {
              numbers7bit[i] = (initialNumber & kernel) >>> shift;
              kernel = kernel << 7;
              shift += 7;
          }

          finalArray = finalArray.concat(numbers7bit[0], numbers7bit[1], numbers7bit[2], numbers7bit[3], numbers7bit[4]);
        return finalArray;

        //deserializing
      } else {
          var numbers8bit = [0, 0, 0, 0];
          var shift = 3;
          for (var i = 4; i >= 0; i--) {
              if (i != 0)
                  numbers8bit[i - 1] |= initialArray[i] >>> shift;
              if (i != 4)
                  numbers8bit[i] |= (initialArray[i] << (8 - shift)) & 0xff;
              shift++;
          }

          var final = 0;
          shift = 24;
          for (i = 0; i < 4; i++) {
              final |= numbers8bit[i] << shift;
              shift -= 8;
          }

          return final;
      }
      break;
    case 'stt7bitASCII':
    case 'stt8bitASCII':
      break;
    case 'sttSInt16':
      //serializing
      if (typeof initialNumber != 'undefined') {
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
          num1 = 0x7f;
          initialNumber = initialNumber * -1;
          num2 = 0x7f - Math.floor(initialNumber / 4);
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
        } else if (num1 == 0x7f) {
          finalNumber += (0x7f - num2) * 4;
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
    case 'sttUInt16':
      //serializing
      if (typeof initialNumber != 'undefined') {
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

    case 'sttSInt64':
	case 'sttUInt64':
      var finalBinArray
	  
      const finalBinString = initialArray.map(function(ia) { return dec2bin(ia) }).join("")
      //SPLIT BY 7 BITS
      //console.log("finalbin",finalBinString)
      finalBinArray = finalBinString.match(/.{1,8}/g);
      //CONVERT 7 BIT BINARY STRING THINGS TO ACTUAL DECIMAL NUMBERS
      for (var i = 0; i < finalBinArray.length; i++) {
        finalBinArray[i] = parseInt(finalBinArray[i], 2);
      }
      finalBinArray = finalBinArray.map(function(b) { a = b.toString(16); while (a.length < 2) a='0'+a; return a }).join("").toUpperCase()
      return finalBinArray.slice(0, finalBinArray.length - 2)
      break;
    case 'JSON':
      var jsonStringOfMessage = '{' + numberOrArray.map(function (num) {
        return String.fromCharCode(num);
      }).join('');
      //console.log("Here is the things:", jsonStringOfMessage);
      return JSON.parse(jsonStringOfMessage);
    case 'stayTheSame':
    default:
      if (typeof initialNumber != 'undefined') {
        return initialNumber;
      } else {
        return initialArray;
      }
      break;
  }
  return 'hmm, nothing worked';
}

var noteNumbers = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'D#',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'G#',
  9: 'A',
  10: 'A#',
  11: 'B',
  '#': 1,
  b: -1
};

var buttonNumbers = {
  0: 'up',
  1: 'down',
  2: 'left',
  3: 'right',
  4: 'enter',
  5: 'mute'
};

function convertNote(note) {
  var conversion = void 0;
  switch (typeof note === 'undefined' ? 'undefined' : _typeof(note)) {
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
  if ((typeof initialMessage === 'undefined' ? 'undefined' : _typeof(initialMessage)) != 'object') {
    throw 'serialize(): argument must be of type object.';
  }
  if (arguments.length > 1) {
    throw 'serialize(): must contain only one argument of type object.';
  }

  //console.log("Sent sysex serialize:", initialMessage)
  

  var key = Object.keys(initialMessage)[0];
  var value = initialMessage[key];
  //var value = Object.values(initialMessage)[0]; //<------

  //throw ("serialize(): Invalid key in object \""+key+"\".");

  var valueKey1 = void 0;
  var valueValue1 = void 0;
  var valueKey2 = void 0;
  var valueValue2 = void 0;

  var transferTypeOfVar = void 0;

  var command = void 0;
  var commandSpecific = void 0;
  var finalMessage = [];
  var finalMessageSize = void 0;
  var variables = void 0;

  //hard coded values
  var sysexStart = [0xf0, 0x0];
  var jsVendorID = [0x2, 0x2];
  var sysexEnd = 0xf7;

  if (key == 'get' && value == 'allConfig') {
    return [0xf0, 0x0, 0x2, 0x2, 0x66, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x55, 0xf7];
  }
  if (key == 'get' && value == 'allConfigSchema') {
    return [0xf0, 0x0, 0x2, 0x2, 0x44, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x55, 0xf7];
  }
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'boolean':
    case 'number':
      if (ttOfVar.hasOwnProperty(systemName[key])) {
        transferTypeOfVar = ttOfVar[systemName[key]];
        variables = convert(Number(value), 'num', transferTypeOfVar);
      } else {
        throw 'serialize(): invalid value ' + value + ' in object pair.';
      }
      break;
    case 'string':
      if (key != 'get') {
        //put in conversions for like 'D5' and stuff
        value = convertNote(value);
      } else {}
      break;
    case 'object':
      if (Object.keys(value).length == 2 && key == 'string') {
        valueKey1 = Object.keys(value)[0];
        valueKey2 = Object.keys(value)[1];
        if (valueKey1 == 'index' && valueKey2 == 'value') {
          valueValue1 = value[valueKey1];
          valueValue2 = value[valueKey2];
          switch (valueValue1) {
            case 1:
              key = 'openNote1st';
              break;
            case 2:
              key = 'openNote2nd';
              break;
            case 3:
              key = 'openNote3rd';
              break;
            case 4:
              key = 'openNote4th';
              break;
            case 5:
              key = 'openNote5th';
              break;
            case 6:
              key = 'openNote6th';
              break;
          }
          transferTypeOfVar = ttOfVar[systemName[key]];
          if (typeof valueValue2 == 'string') {
            value = convertNote(valueValue2);
          } else {
            value = valueValue2;
          }
          variables = convert(value, 'num', transferTypeOfVar);
        }
      } else if (Object.keys(value).length == 2 && (key == 'dPad' || key == 'dPad7')) {
        //console.log("trying to send a dpad message");
        valueKey1 = Object.keys(value)[0];
        valueKey2 = Object.keys(value)[1];
        if (valueKey1 == 'index' && valueKey2 == 'value') {
          valueValue1 = Object.values(value)[0];
          valueValue2 = Object.values(value)[1];
          variables = generateArrayWithChangeDPadTo(valueValue1, valueValue2, key);
          transferTypeOfVar = key == 'dPad7' ? 'sttUInt64' : 'sttUInt32';
        }
      }
      break;
  }
  
  if (Array.isArray(variables) == false) {
    variables = [variables];
  }

  //This code, which puts the message together, should eventually be cleaned up
  if (key == 'get' && systemName.hasOwnProperty(value) == false) {
    command = cfr['SYSEX_GET_CONFIG_PARAM'];
    commandSpecific = value.split('');
    for (var p = 0; p < commandSpecific.length; p++) {
      commandSpecific[p] = commandSpecific[p].charCodeAt(0);
    }
    finalMessageSize = sysexStart.length + jsVendorID.length + 1 + commandSpecific.length + 1 + 1; //because this doesn't include the size
    finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, finalMessageSize, sysexEnd);
  } else if (systemName.hasOwnProperty(value) == false) {
    if (systemButtonNames.hasOwnProperty(valueValue1)) {
      commandSpecific = systemButtonNames[valueValue1].split('');
    } else {
      commandSpecific = key.split('');
    }
    command = cfr['SYSEX_SET_CONFIG_PARAM'];

    for (var _p = 0; _p < commandSpecific.length; _p++) {
      commandSpecific[_p] = commandSpecific[_p].charCodeAt(0);
    }
    finalMessageSize = sysexStart.length + jsVendorID.length + 1 + //command
    commandSpecific.length + 1 + //stt byte
    variables.length + 1 + //sysex end
    1; //because this doesn't include the size
    finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, sttr[transferTypeOfVar], variables, finalMessageSize, sysexEnd);
  }
  if (key == 'get' && systemName.hasOwnProperty(value)) {
    command = cfr['SYSEX_GET_CONFIG_PARAM'];
    commandSpecific = systemName[value].split('');
    for (var _p2 = 0; _p2 < commandSpecific.length; _p2++) {
      commandSpecific[_p2] = commandSpecific[_p2].charCodeAt(0);
    }
    finalMessageSize = sysexStart.length + jsVendorID.length + 1 + commandSpecific.length + 1 + 1; //because this doesn't include the size
    finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, finalMessageSize, sysexEnd);
  } else {
    if (systemName.hasOwnProperty(key)) {
      command = cfr['SYSEX_SET_CONFIG_PARAM'];
      commandSpecific = systemName[key].split('');
      for (var _p3 = 0; _p3 < commandSpecific.length; _p3++) {
        commandSpecific[_p3] = commandSpecific[_p3].charCodeAt(0);
      }
      finalMessageSize = sysexStart.length + jsVendorID.length + 1 + //command
      commandSpecific.length + 1 + //stt byte
      variables.length + 1 + //sysex end
      1; //because this doesn't include the size
      finalMessage = finalMessage.concat(sysexStart, jsVendorID, command, commandSpecific, sttr[transferTypeOfVar], variables, finalMessageSize, sysexEnd);
    }
  }
  //console.log("this is the raw array that is sending",finalMessage);
  var fZeroDiagnostics = finalMessage.reduce(function (acc, curr, index) {
    return curr == 0xf0 ? { occurances: acc.occurances + 1, index: index } : acc;
  }, { occurances: 0, index: 0 });

  if (fZeroDiagnostics.occurances > 1) {
    return finalMessage.slice(fZeroDiagnostics.index, finalMessage.length);
  }
  return finalMessage;
}

function deserialize(data) {
  //console.log("deserialize was called", data);
  var finalMessage = {};
  var arraySize = data.length - 4;
  var message = new Array(arraySize);
  for (var w = 0; w < message.length; w++) {
    message[w] = data[w + 4];
  }
  var beginVar = 10;

  var command = message.slice(1, 9);
  var joinedCommand = String.fromCharCode(command[0], command[1], command[2], command[3], command[4], command[5], command[6], command[7]);
  var variablePart = message.slice(beginVar, message.length - 2);
  var indexOfTransferType = 13;
  switch (cf[message[0]]) {
    case 'SYSEX_GET_CONFIG_SCHEMA':
    case 'SYSEX_ACK_GET_ALL_CONFIG':
      beginVar = 1;
      variablePart = message.slice(beginVar, message.length - 2);
      break;
    case 'SYSEX_INTERNAL_ERROR':
    case 'SYSEX_ACK_GET_CONFIG_PARAM':
    //this is the one mostly used
    case 'SYSEX_ACK_SET_CONFIG_PARAM':
    case 'SYSEX_ACK_GET_CONFIG_SCHEMA':
    case 'SYSEX_ACK_LIST_CC':
    case 'SYSEX_ACK_LIST_CATEGORIES':
      //special string tuning by index
      if (command[0] == 0x53 && command[2] == 0x5f && command[3] == 0x5f && command[4] == 0x4e && command[5] == 0x4f && command[6] == 0x54 && command[7] == 0x45) {
        finalMessage['string'] = {
          index: 54-parseInt(command[1]),
          value: convert(variablePart, ttOfVar[joinedCommand])
        };
        return finalMessage;
      } else if (command[0] == 68 && command[1] == 80 && command[2] == 65 && command[3] == 68 && command[4] == 79 && command[5] == 80) {
        finalMessage['dPad'] = whichDPadAndTypeOfDPadAssignment(variablePart);
        return finalMessage;
      }
      if (systemNameR.hasOwnProperty(joinedCommand)) {
        finalMessage[systemNameR[joinedCommand]] = convert(variablePart, stt[data[indexOfTransferType]]);
      } else {
        if (cf[message[0]] === 'SYSEX_ACK_GET_CONFIG_SCHEMA') {
          variablePart.pop();
        }
        finalMessage[joinedCommand] = convert(variablePart, cf[message[0]] === 'SYSEX_ACK_GET_CONFIG_SCHEMA' ? 'JSON' : stt[data[indexOfTransferType]]);
      }
      return finalMessage;
      break;
    //firmware updates
    case 'SYSEX_GET_FIRMWARE_BLOCK':
    case 'SYSEX_FW_UPDATE_FINISHED':
    case 'SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V1':
    case 'SYSEX_GET_FIRMWARE_BLOCK_COMPRESSED_V2':
      break;
  }
  //console.log("what in the world was it???", cf[message[0]]);
  return 0;
}