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
              @change="updateOscillatorType($event)"></v-select>
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
      oscillatorTypes: ['triangle', 'sawtooth', 'sine', 'square', 'pulse'],
      selectedSynth: 'Synth',
      selectedOscillator: 'triangle',
      synth: new Instrument(this.selectedSynth)
    };
  },
  methods: {
    updateSynthType(e) {
      this.selectedSynth = e;
      console.log(this.selectedSynth);
      this.synth.updateSynthType(this.selectedSynth);
    },
    updateOscillatorType(e) {
      this.selectedOscillator = e; 
      this.synth.updateOscillatorType(this.selectedOscillator);
    },
    playNote() {
      this.synth.playNote();
    }
  },
  mounted() {
    // console.log(this.synth);
  }
};
</script>

<style lang="scss" scoped>
</style>