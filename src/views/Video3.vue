<template>
  <v-container>
    <arp-radio-row
      :numButtons="numButtons"
      @changeChord="handleChord($event)"
      :checkedValue="currentChord"
    ></arp-radio-row>
    <v-row justify="center" style='background-color:black'>
      <v-col cols="4">
        <v-row justify="center"  style='background-color:red'>
          <v-btn large v-on:click="startSynth()">Start Synth</v-btn>
          <v-btn large v-on:click="stopSynth()">Stop Synth</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tone from "../../node_modules/tone";
import ArpRadioRow from "../components/ArpRadioRow";
export default {
  data() {
    return {
      numButtons: 5,
      currentChord: 1,
      chords: ["A1 C2 E2", "F2 A2 C3", "G2 B2 D3", "D2 F2 A2", "E1 G#1 B1"].map(
        string => {
          return string.split(" ");
        }
      ),
      chordIdx: 0,
      step: 0,
      synth: new Tone.Synth({
        oscillator: {
          type: "square"
        }
      }),
      filter: new Tone.Filter({
        type: "lowpass",
        frequency: 400,
        rolloff: -24,
        Q: 2,
        gain: 0
      }).toMaster(),
      filterEnv: new Tone.FrequencyEnvelope(0.002, 0.2, 0.01, 0.5)
    };
  },
  components: {
    arpRadioRow: ArpRadioRow
  },
  // computed: {
  //   synth(){
  //     this.filterEnv.connect(this.filter.frequency);
  //     this.oscillator.connect(this.filter);
  //     this.filter.toMaster();
  //     return
  //   }
  // },
  methods: {
    handleChord(newChordIndex) {
      this.currentChord = newChordIndex;
      this.chordIdx = this.currentChord - 1;
      // console.log("parent: " + this.currentChord);
    },
    onRepeat(time) {
      let chord = this.chords[this.chordIdx];
      let note = chord[this.step % 3];
      this.synth.triggerAttackRelease(note, "8n", time);
      this.filterEnv.triggerAttackRelease();
      this.step++;
    },
    startSynth() {
      Tone.Transport.start();
    },
    stopSynth() {
      Tone.Transport.stop();
    }
  },
  mounted() {
    let gain = new Tone.Gain(0.01);
    this.synth.connect(this.filter);
    this.filterEnv.connect(this.filter.frequency);
    this.filter.connect(gain);
    gain.toMaster();
    Tone.Transport.scheduleRepeat(this.onRepeat, "8n");
    // Tone.Transport.start();
  },
  updated() {
    // console.log("parent: " + this.currentChord);
  }
};
</script>

<style lang="scss" scoped>
#arpRadio {
  visibility: hidden;
}

// input {
//   position: absolute;
//   left: -9999px;
// }
</style>