/*
  midi.js
*/

import {jamstik} from '/dist/jamstik';

//midi object
let midi;
//midi object's port
let mPort;
export function initializeMIDI() {
  console.log("Initializing MIDI");
  navigator.requestMIDIAccess({sysex: true}).then(success, failure);
}
function success(access) {

  midi = access;
  let inputs = midi.inputs;
  let portObject = midi.outputs.values().next().value;
  let portID = portObject.id;
  let portName = midi.outputs.values().next().value.name;
  console.log("Successfully connected to: ", portObject);
  mPort = portName;
  //console.log(inputs,portID,portName);
  midi.inputs.values().next().value.onmidimessage = handleMIDIReceives;
}
function failure(err) {
  console.log("MIDI error, code: ", err.code);
}


function handleMIDIReceives(event) {
  let data = event.data;
  if (data.length == 3) {
    console.log("Standard MIDI data: ", data);
  } else if (data.length > 3) {
    console.log("Received SysEx MIDI Message: ", jamstik.deserialize(data));
  }
}

export function sendMIDI(object) {
  var outputPort;
  outputPort = midi.outputs.values().next().value;
  if (outputPort != undefined) {
    outputPort.send(object);
    console.log("Sent SysEx MIDI Message -> ", object);
  } else {
    console.log("Could not send midi message");
  }
}
