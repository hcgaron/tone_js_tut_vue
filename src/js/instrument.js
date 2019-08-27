import Tone from "../../node_modules/tone"

class Instrument {
  constructor(synthType) {
    this.synthType = synthType;
    this.synth = new Tone.Synth(this.synthType);
    this.gain = new Tone.Gain(0.4);
    this.synth.connect(this.gain);
    this.gain.toMaster();
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



  updateSynthType(synthType) {
    // If we have already defined the synth
    // let gain = this.gain;
    if (this.synth) {
      this.synth.disconnect(this.gain);
      this.synth = null;
    }
    // The new synth
    let settings = this.defaultSettings[synthType] || {};
    this.synth = new Tone[synthType](settings);
    this.synth.connect(this.gain);
    this.synth.triggerAttackRelease('C2', '16n');
  }

  updateOscillatorType(oscType, oscPartials) {
      let partials = oscPartials === 'default' ? '' : oscPartials;
      this.synth.oscillator.type =`${oscType}${partials}`;
  }

  updatePartials(numPartials) {
    this.updateOscillatorType(this.synth.oscillator.type, numPartials); 
  }

  playNote() {
    this.synth.triggerAttackRelease('C2', '16n')
  }
}

export {
  Instrument
}