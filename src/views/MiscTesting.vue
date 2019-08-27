<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row justify="center">
          <v-btn>Button</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tone from "../../node_modules/tone";
import { Instrument } from "../js/instrument";
import { setTimeout } from "timers";

export default {
  beforeCreate() {
    console.clear();
  },
  created() {
    //   let synth = new Instrument("Synth");
    //   synth.updateSynthType("FMSynth");
  },
//   synth2: new Instrument('Synth'),
  data() {
    return {
      synth1: new Instrument("Synth")
    };
  },
  mounted() {
    console.log("before freeze");
    console.log(this.synth1);
    Object.freeze(this.synth1);
    console.log("after freeze");
    console.log("Synth 1: ");
    console.log(this.synth1);
    // Object.defineProperty(this, "synth2", {
    //   value: new Instrument("Synth"),
    //   writeable: false
    // });

    // same effect as above
    this.synth2 = new Instrument('Synth');
    console.log("Synth 2: ");
    console.log(this.synth2);
    // console.log(synth2);
    //   setTimeout(() => {
    //       console.log('this is what the synth looks like when its a data property (below)')
    //       Object.freeze(this.synth);
    //       console.log(this.synth)
    //       this.synth.updateSynthType('FMSynth');
    //   this.$set(this.synth, 'synth', this.synth.updateSynthType('FMSynth'))
    //   this.synth.updateSynthType('FMSynth');
    //   }, 200)
  }
};
</script>