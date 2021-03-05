# Jamstik SysEx Javascript API

Use this simple API to serialize and deserialize special MIDI messages to be recognized by the Jamstik.

Coupled with [Web MIDI API](https://webaudio.github.io/web-midi-api/), you can create software which changes the exclusive parameters in the Jamstik, like tuning or D-pad functionality.

## Important info regarding Standard MIDI Messages (AKA not SysEx)

The Jamstik is a class-compliant MIDI controller. So, the majority of your initial steps of developing a Jamstik application involves reading standard note ons/note offs etc. For information on some of the specific Jamstik MIDI messages, refer to [this PDF](https://github.com/ZivixLLC/jamstik-sysex/blob/master/jamstik-standard-midi-implementation.pdf). A noteworthy feature of the Jamstik is reading fret messages.

### What if I don't use web technologies?

You can still use the Standard MIDI Messages as listed above. Core MIDI, for example, is how the iOS Jamstik apps talk to the Jamstik. There is currently no public API for non-Javascript Jamstik SysEx messages.

## SysEx API Installation

Place ```dist/jamstik.js``` in your project directory

## Usage

If using Web MIDI API, you must set ```sysex: true``` when requesting access.

```javascript
navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
```

There are two main functions you'll be working with: ```serialize()``` and ```deserialize()```.

With ES6 syntax, you can import the two functions.

```javascript
import {serialize} from '/path/to/jamstik';
import {deserialize} from '/path/to/jamstik';
```

#### Serialize

```javascript
jamstik.serialize({key: value});
```
```serialize()``` returns an array of numbers that when sent to the Jamstik will be handled appropriately.  The sending can be done through Web MIDI API's ```send()```.  Check ```examples/demo/js/midi.js``` and open ```examples/demo/index.html``` for a simple example of sending messages to the first found MIDI device (assuming it's a Jamstik!).


```javascript
//Set the transpose to 5 halfsteps
jamstik.serialize({transpose: 5});
//Returns [0xF0,0x0,0x2,0x2,0x62,0x54,0x52,0x41,0x4E,0x53,0x50,0x53,0x45,0x6,0x0,0x1,0x20,0x10,0xF7]

//Strumming is not required with tapMode to trigger note ons
jamstik.serialize({tapMode: true});

//Retrieve the current transposition
jamstik.serialize({get: "transpose"});

//Retrieve current battery percentage
jamstik.serialize({get: "batteryPercent"});

//Set Jamstik to standard tuning (EADGBe)
jamstik.serialize({string: {index: 1, value: 'E2'}});
jamstik.serialize({string: {index: 2, value: 'A2'}});
jamstik.serialize({string: {index: 3, value: 'D3'}});
jamstik.serialize({string: {index: 4, value: 'G3'}});
jamstik.serialize({string: {index: 5, value: 'B3'}});
jamstik.serialize({string: {index: 6, value: 'E4'}});

//Note number is also supported
jamstik.serialize({string: {index: 1, value: 52}});
```

#### Deserialize

```javascript
jamstik.deserialize(rawMIDISysexData);
```

```deserialize()``` returns an object similar to the object you passed in with ```serialize()```.  In fact, every time you send a message to the Jamstik, you should get a receive in return confirming the value has been changed. With this, you can design interfaces updated on receives, not sends. Certain events, like pressing buttons on the directional pad, do not require a sent command, and the Jamstik will send a message letting us know what has been changed.

```javascript
//Let's figure out what the Jamstik sent us!
jamstik.deserialize([0xF0,0x0,0x2,0x2,0x62,0x54,0x52,0x41,0x4E,0x53,0x50,0x53,0x45,0x6,0x0,0x1,0x20,0x10,0xF7]);
//Returns {transpose: 5}
```

## Useful Parameters to Change

##### Reset to Defaults
```javascript
//Will shut off the Jamstik. Make sure to power back on
{resetDefaults: 2}
```

##### Get All Settings
```javascript
//Responds with a barrage of all parameters' values
{get: allConfig}
```

##### Transpose
```javascript
{transpose: 0}
```

##### Tuning
```javascript
{string: {index: 5, value: 'E4'}}
```
##### Tap Mode
```javascript
{tapMode: false}
```

##### Tutor Mode
```javascript
//Disables directional pad, and puts the Jamstik in a state designed for the beginner
{tutorMode: true}
```

##### String Hold Time
```javascript
{stringHoldTime: 8} //in seconds
```

##### Hammer Ons
```javascript
{hammerOns: true}
{hammerOnTimer: 25}  //x 10ms
{hammerOnVelocity: 64}
```

##### Left-handed Mode
```javascript
{leftHanded: true}
```

##### Accelerometer
```javascript
{accelerometer: false}
```
##### Single MIDI Channel Mode
```javascript
{singleMidiChannelMode: false}
```

### D-Pad Functionality
```javascript
{dPad: {index: indexName, value: valueName}}
```

There are 6 programmable buttons on the jamstik.  Their index names are as follows:
```
up
down
left
right
enter
mute
```

And the value names are:
```
none
capoUp
capoDown
octaveUp
octaveDown
capoReset
stringBend
mute
tapMode
tapModeMomentary
singleMultiChannelToggle
modulationToggle
panic
```

## All Other Commands
| Parameter | Valid Input |
| --- | --- |
| sleepTime | 0-127 |
| singleMidiChannelMode | boolean |
| midiChannelOf1stString | 1-16 |
| minimumMidiVelocity | 0-127 |
| maximumMidiVelocity | 0-127 |
| noMidiVelocity | boolean |
| accelerometerController | 0-127 |
| accelerometerThresholdTo | 0-127 |
| accelerometer | boolean |
| accelerometerPitchAngle | -90 to 90 |
| accelerometerPitchAngle2 | -90 to 90 |
| stringHoldTime | 0-20 |
| volumeCurve | boolean |
| logVolumeCurveFlattening | boolean |
| sustainMode | boolean |
| stringBend | boolean |
| hammerOns | boolean |
| hammerOnTimer | 0-255 |
| hammerOnVelocity | 0-127 |
| tapMode | boolean |
| transpose | -24 to 24 |
| openNote6th | 0-127 |
| openNote5th | 0-127 |
| openNote4th | 0-127 |
| openNote3rd | 0-127 |
| openNote2nd | 0-127 |
| openNote1st |0-127  |
| pickingProfile | 0-127 |
| hardwareDeviceType | retrieve only |
| hardwareDeviceVersion | retrieve only |
| firmwareRevisionMajor | retrieve only |
| firmwareRevisionMinor | retrieve only |
| leftHanded | boolean |
| tutorMode | boolean |
| hardwareCapabilityFlags |  |
| batteryPercent | retrieve only |
| resetDefaults | 0-4 |
| midpointX (string num) | 0-127 |
| triggerEnvMaxX | 0-127 |
|  volumeEnvMaxX | 0-127 |
| triggerX | 0-127 |
| volumeBoostX | 0-127 |
| factoryVolumeBoostX | 0-127 |
| minStringTriggerTimeX | 0-127 |
| betaX | 0-127 |
| gammaX | 0-127 |
| deltaX | 0-127 |
