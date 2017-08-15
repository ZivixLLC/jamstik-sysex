(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['/dist/jamstik', './midi'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('/dist/jamstik'), require('./midi'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jamstik, global.midi);
    global.main = mod.exports;
  }
})(this, function (_jamstik, _midi) {
  'use strict';

  //jamstik.init();
  (0, _midi.initializeMIDI)();

  let demoCommands = [{ transpose: 5 }, { stringBend: true }, { get: "tapMode" }, { string: { index: 5, value: 61 } }, { get: "transpose" }, { string: { index: 1, value: "D5" } }, { string: { index: 3, value: "F#3" } }, { string: { index: 4, value: "Ab7" } }, { get: "batteryPercent" }, { get: "hardwareDeviceType" }, { dPad: { index: "up", value: "none" } }, { tapMode: true }, { dPad: { index: "mute", value: "mute" } }, { dPad: { index: "enter", value: "capoUp" } }, { leftHanded: true }, { resetDefaults: 2 }, { get: "allConfig" }];

  function sendTextBox(index) {
    (0, _midi.sendMIDI)(jamstik.serialize(demoCommands[index]));
  }

  function sendTextBoxx() {
    (0, _midi.sendMIDI)([0xF0, 0x0, 0x2, 0x2, 0x66, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xF, 0xF7]);
  }

  document.querySelector("#send0").addEventListener("click", function () {
    sendTextBox(0);
  });
  document.querySelector("#send1").addEventListener("click", function () {
    sendTextBox(1);
  });
  document.querySelector("#send2").addEventListener("click", function () {
    sendTextBox(2);
  });
  document.querySelector("#send3").addEventListener("click", function () {
    sendTextBox(3);
  });
  document.querySelector("#send4").addEventListener("click", function () {
    sendTextBox(4);
  });
  document.querySelector("#send5").addEventListener("click", function () {
    sendTextBox(5);
  });
  document.querySelector("#send6").addEventListener("click", function () {
    sendTextBox(6);
  });
  document.querySelector("#send7").addEventListener("click", function () {
    sendTextBox(7);
  });
  document.querySelector("#send8").addEventListener("click", function () {
    sendTextBox(8);
  });
  document.querySelector("#send9").addEventListener("click", function () {
    sendTextBox(9);
  });
  document.querySelector("#send10").addEventListener("click", function () {
    sendTextBox(10);
  });
  document.querySelector("#send11").addEventListener("click", function () {
    sendTextBox(11);
  });
  document.querySelector("#send12").addEventListener("click", function () {
    sendTextBox(12);
  });
  document.querySelector("#send13").addEventListener("click", function () {
    sendTextBox(13);
  });
  document.querySelector("#send14").addEventListener("click", function () {
    sendTextBox(14);
  });
  document.querySelector("#send15").addEventListener("click", function () {
    sendTextBox(15);
  });
  document.querySelector("#send16").addEventListener("click", function () {
    sendTextBox(16);
  });
  document.querySelector("#send17").addEventListener("click", function () {
    sendTextBoxx();
  });
});