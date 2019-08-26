<template>
  <v-container>
    <arp-radio-row
      :numButtons="numButtons"
      @changeChord="handleChord($event)"
      :checkedValue="currentChord"
    ></arp-radio-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-row justify="center">
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
      chords: ["A0 C1 E1", "F0 A0 C1", "G0 B0 D1", "D0 F0 A0", "E0 G0 B0"].map(
        this.formatChords
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
      filterEnv: new Tone.FrequencyEnvelope(0.002, 0.2, 0.01, 0.05)
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
    formatChords(chordString) {
      let chord = chordString.split(" ");
      let arr = [];
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < chord.length; j++) {
          let noteOct = chord[j].split("");
          let note = noteOct[0];
          let oct = noteOct[1] === "0" ? i + 1 : i + 2;
          note += oct;
          arr.push(note);
        }
      }
      return arr;
    },
    onRepeat(time) {
      let chord = this.chords[this.chordIdx];
      let note = chord[this.step % chord.length];
      this.synth.triggerAttackRelease(note, "16n", time);
      this.filterEnv.triggerAttackRelease(0.2, time);
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
    const gain = new Tone.Gain(0.4);
    this.synth.connect(gain)
    gain.connect(this.filter);
    this.filterEnv.connect(this.filter.frequency);
    this.filter.toMaster();
    Tone.Transport.scheduleRepeat(this.onRepeat, "16n");
    Tone.Transport.bpm.value = 90;
    // Tone.Transport.start();
  },
  updated() {
    // Tone.Transport.scheduleRepeat(this.onRepeat, "8n");
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