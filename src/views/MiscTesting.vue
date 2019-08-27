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
import { Instrument } from "../js/instrument";
import { setTimeout } from "timers";

export default {
    data() {
        return{
            synth: new Instrument("Synth")
        }
    },
  created() {
    console.clear();
    let synth = new Instrument("Synth");
    console.log('this is what the synth looks like when its plain JS')
    synth.updateSynthType("FMSynth");
  },
  mounted() {
      setTimeout(() => {
          console.log('this is what the synth looks like when its a data property (below)')
          console.log(this.synth)
        //   this.$set(this.synth, 'synth', this.synth.updateSynthType('FMSynth'))
        //   this.synth.updateSynthType('FMSynth');
      }, 200)
  }
};
</script>