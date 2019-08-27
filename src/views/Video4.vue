<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <v-card>
            <v-card-title>Creating a New Synth Tester</v-card-title>
            <v-card-text>
              Current Synth:
              <v-spacer>{{selectedSynth}}</v-spacer>
              <v-btn @click="playNote">Play Note</v-btn>
              <v-btn @click="playLoop">Play Loop</v-btn>
              <v-btn @click="stopLoop">Stop Loop</v-btn>
            </v-card-text>
            <v-card-actions>
              <v-select
                :items="synths"
                v-model="selectedSynth"
                label="Select Instrument"
                @change="updateSynthType($event)"
              ></v-select>
              <v-select
                :items="oscillatorTypes"
                label="Oscillator Type"
                v-model="selectedOscillator"
                @change="updateOscillatorType($event)"
              ></v-select>

              <v-select
                :items="partialsArray"
                label="Number of Partials"
                v-model="numPartials"
                @change="updatePartialsCount($event)"
                :disabled="selectedOscillator === 'pulse'"
              ></v-select>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tone from "../../node_modules/tone";
import { Instrument } from "../js/instrument";

export default {
  data() {
    return {
      synths: ["Synth", "AMSynth", "FMSynth"],
      oscillatorTypes: ["triangle", "sawtooth", "sine", "square", "pulse"],
      selectedSynth: "Synth",
      selectedOscillator: "triangle",
      partialsArray: ["default", 2, 4, 8, 16, 32, 64, 128],
      numPartials: "default",
      loopNotes: ["C2", "D2", "Eb2", "F2", "G2", "Ab2", "B2"],
      loopTick: 0,
      synth: new Instrument(this.selectedSynth)
    };
  },
  methods: {
    updateSynthType: function(e) {
      console.log('this inside component: ')
      console.log(this)
      this.selectedSynth = e;
      this.synth.updateSynthType(this.selectedSynth);
    },
    updateOscillatorType(e) {
      if (e === "pulse") {
        this.numPartials = "default";
      }
      this.selectedOscillator = e;
      this.synth.updateOscillatorType(
        this.selectedOscillator,
        this.numPartials
      );
    },
    updatePartialsCount(e) {
      this.synth.updatePartials(e);
    },
    playNote() {
      this.synth.playNote();
    },
    playLoop() {

      Tone.Transport.scheduleRepeat(time => {
        let note = this.loopNotes[(this.loopTick * 2) % this.loopNotes.length];
        this.synth.synth.triggerAttackRelease(note, "8n", time);
        this.loopTick++;
      }, "4n");
      Tone.Transport.start();
    },
    stopLoop() {
      this.synth.synth.triggerRelease();
      Tone.Transport.stop();
    }
  },
  mounted() {
    console.clear();
    this.updateSynthType('FMSynth')
    // console.log(this.synth);
  }
};
</script>

<style lang="scss" scoped>
</style>