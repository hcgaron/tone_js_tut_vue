<template>
  <div>
    Video 1
    <div class="buttons">
      <v-btn v-on:click="startSynth()">Start Synth</v-btn>
      <v-btn v-on:click="stopSynth()">Stop Synth</v-btn>
    </div>
  </div>
</template>

<script>
import Tone from "../../node_modules/tone";
import { setTimeout } from "timers";

// create a synth
// const synth = new Tone.MonoSynth({
//     "oscillator": {
//         "type": "square"
//     },
//     "filterEnvelope": {
//         "attack" : 0.001,
// 				"decay" : 0.7,
// 				"sustain" : 0.1,
// 				"release" : 0.8,
// 				"baseFrequency" : 100,
// 				"octaves" : 4
//     }
// });

// console.log(filter)

// synth.triggerAttackRelease("C2", "8n");

// let index = 0

// default tempo is 120
// console.log(Tone.Transport.bpm.value)

export default {
  data() {
    return {
      index: 0,
      notes: ["C2", "Eb2", "G2", "C3", "Eb3", "G3"],
      synth: new Tone.Synth(),
      filter: new Tone.Filter(1000, "lowpass", -24),
      filterEnv: new Tone.FrequencyEnvelope(0.3, 0.2, 0.01, 0.8)
    };
  },
  methods: {
    repeat(time) {
      let note = this.notes[this.index % this.notes.length];
      // (note, duration, time, velocity)
      // the note is the pitch, duration is how long to hold the
      // note in question before triggering the release of the
      // amplitude enveleope (ie. the release of the note)
      this.synth.triggerAttackRelease(note, '16n', time);
      this.filterEnv.triggerAttackRelease();
      this.index++;
    },
    startSynth() {
      Tone.Transport.start();
    },
    stopSynth() {
      Tone.Transport.stop();
    }
  },
  created() {
    Tone.Transport.scheduleRepeat(time => {
      this.repeat(time);
      // console.log(time)
      // console.log(Tone.Transport.bpm.value)
    }, '4n');
    Tone.Transport.bpm.value = 90;
    this.synth.oscillator.type = "square";
    this.filterEnv.connect(this.filter.frequency);
    this.synth.connect(this.filter);
    this.filter.toMaster();
  },
  mounted() {
    console.log(Tone.Transport)
  }
};
</script>