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
              <v-btn @click="playNote" :disabled="currentlyPlaying === true">Play Note</v-btn>
              <v-btn @click="togglePlay">{{playPauseText}}</v-btn>
            </v-card-text>
            <v-col>
              <v-row>
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
              </v-row>
                    <!-- slider for amp envelope attack -->
                    <v-row>
                      <v-card-text>
                        <span class="display-1 font-weight-light">{{ampEnvAttack}}</span>
                        <v-slider
                          label="Attack"
                          v-model="attackSlider"
                          step="0.001"
                          min="0"
                          max="0.818731"
                          @change="updateAmpEnvAttack"
                        ></v-slider>
                      </v-card-text>
                    </v-row>

                    <!-- slider for amp envelope decay -->
                    <v-row>
                      <v-card-text>
                        <span class="display-1 font-weight-light">{{ampEnvDecay}}</span>
                        <v-slider
                          label="Decay"
                          v-model="decaySlider"
                          step="0.001"
                          min="0"
                          max="0.818731"
                          @change="updateAmpEnvDecay"
                        ></v-slider>
                      </v-card-text>
                    </v-row>
                    <!-- slider for amp envelope sustain -->
                    <v-row>
                      <v-card-text>
                        <span class="display-1 font-weight-light">{{ampEnvSustain.toFixed(2)}}</span>
                        <v-slider
                          label="Sustain"
                          v-model="ampEnvSustain"
                          step="0.01"
                          min="0"
                          max="1"
                          @change="updateAmpEnvSustain"
                        ></v-slider>
                      </v-card-text>
                    </v-row>

                    <!-- slider for amp envelope release -->
                    <v-row>
                      <v-card-text>
                        <span class="display-1 font-weight-light">{{ampEnvRelease}}</span>
                        <v-slider
                          label="Release"
                          v-model="releaseSlider"
                          step="0.001"
                          min="0.00001"
                          max="0.818731"
                          @change="updateAmpEnvRelease"
                        ></v-slider>
                      </v-card-text>
                    </v-row>
            </v-col>
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
      loopNotes: ["F3", "G3", "A3", "B3", "C4", "D4", "E4"],
      loopTick: 0,
      currentlyPlaying: false,
      playPauseText: "Play Loop",
      attackSlider: 0,
      decaySlider: 0.0001,
      releaseSlider: 0.36,
      ampEnvSustain: 0.3
      // synth: new Instrument(this.selectedSynth) // can't call this at instantiation
    };
  },
  computed: {
    ampEnvAttack: function() {
      let val = this.expSliderCurve(this.attackSlider);
      let attack = Number(Math.min(5, val).toFixed(2));
      if (attack == 0) {
        attack += 0.001;
      }
      return Number(attack.toFixed(5));
    },
    ampEnvDecay: function() {
      let val = this.expSliderCurve(this.decaySlider);
      let decay = Math.min(5, val).toFixed(2);
      return Number(decay);
    },
    ampEnvRelease: function() {
      let val = this.expSliderCurve(this.releaseSlider);
      val += 0.01; // must be greater than zero
      let release = Math.min(5, val).toFixed(2);
      return Number(release);
    }
  },
  methods: {
    expSliderCurve(inputVal) {
      return -(1 / Math.log(inputVal));
    },
    createSynth() {
      // Object.defineProperty(this, 'synth', {value: new Instrument(this.selectedSynth), writeable: false})
      this.synth = new Instrument("Synth");
      this.synth.synth.envelope.attack = this.ampEnvAttack;
      this.synth.synth.envelope.decay = this.ampEnvDecay;
      this.synth.synth.envelope.sustain = this.ampEnvSustain;
      this.synth.synth.envelope.release = this.ampEnvRelease;
    },
    updateSynthType: function(e) {
      this.selectedSynth = e;
      this.synth.updateSynthType(this.selectedSynth, {
        envelope: {
          attack: this.ampEnvAttack,
          decay: this.ampEnvDecay,
          sustain: this.ampEnvSustain,
          release: this.ampEnvRelease
        }
      });
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
    updateAmpEnvAttack() {
      this.synth.synth.envelope.attack = this.ampEnvAttack;
    },
    updateAmpEnvDecay() {
      this.synth.synth.envelope.decay = this.ampEnvDecay;
    },
    updateAmpEnvSustain() {
      this.synth.synth.envelope.sustain = this.ampEnvSustain;
    },
    updateAmpEnvRelease() {
      console.log(typeof this.ampEnvRelease);
      this.synth.synth.envelope.release = this.ampEnvRelease;
    },
    playNote() {
      this.synth.playNote();
    },
    togglePlay() {
      if (this.currentlyPlaying) {
        this.synth.synth.triggerRelease();
        this.currentlyPlaying = false;
        this.playPauseText = "Play Loop";
        return Tone.Transport.stop();
      }
      this.playPauseText = "Stop Loop";
      this.currentlyPlaying = true;
      Tone.Transport.start();
    },
    scheduleRepeat() {
      Tone.Transport.scheduleRepeat(time => {
        let note = this.loopNotes[(this.loopTick * 2) % this.loopNotes.length];
        this.synth.synth.triggerAttackRelease(note, "16n", time);
        this.loopTick++;
      }, "8n");
    }
  },
  mounted() {
    this.createSynth();
    console.log(this.synth);
    this.scheduleRepeat();
    Tone.Transport.bpm.value = 120;
  },
  beforeCreate() {
    console.clear();
  },
  created() {
    // console.clear();
  }
};
</script>

<style lang="scss" scoped>
</style>