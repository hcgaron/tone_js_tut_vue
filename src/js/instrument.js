import Tone from "../../node_modules/tone"

class Instrument {
  constructor(synthType) {
    this.synthType = synthType;
    this.synth = new Tone.Synth(this.synthType);
    this.gain = new Tone.Gain(0.4).toMaster();
    this._connectSynthInit();
  }

  _connectSynthInit() {
    this.synth.connect(this.gain);
  }

  updateSynthType(synthType, options) {
    // If we have already defined the synth
    if (this.synth) {
      console.log('this inside instrument: ')
      console.log(this);
      this.synth.disconnect(this.gain);
      console.log('calling dispose');
      try {
        this.synth.dispose();
        console.log('disposed')
      } catch (error) {
        console.log('could not dispose')
        // console.log(error)
      }
    }

    // The new synth
    if (options) { // if we passed in settings
      console.log(options)
      var settings = options;
    } else {
      var settings = this.defaultSettings[synthType] || {};
    }
    this.synth = new Tone[synthType](settings);
    this.synth.connect(this.gain);
    this.synth.triggerAttackRelease('C2', '16n');
  }

  updateOscillatorType(oscType, oscPartials) {
    let partials = oscPartials === 'default' ? '' : oscPartials;
    this.synth.oscillator.type = `${oscType}${partials}`;
  }

  updatePartials(numPartials) {
    this.updateOscillatorType(this.synth.oscillator.type, numPartials);
  }

  playNote() {
    this.synth.triggerAttackRelease('C2', '16n')
  }
 
  get defaultSettings() {
    return {
      Synth: {
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      },
      FMSynth: {
        harmonicity: 3,
        modulationIndex: 10,
        detune: 0,
        oscillator: {
          type: 'sine'
        }
        ,
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.5
        }
        ,
        modulation: {
          type: 'square'
        }
        ,
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5
        }
      },
      AMSynth: {
        harmonicity: 3,
        detune: 0,
        oscillator: {
          type: 'sine'
        }
        ,
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.5
        }
        ,
        modulation: {
          type: 'square'
        }
        ,
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5
        }
      }
    }
  }
}
export {
  Instrument
}