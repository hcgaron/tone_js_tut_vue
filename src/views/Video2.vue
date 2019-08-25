<template>
  <!-- <v-container style="margin-left: 12rem">
    <div>
      Video 2
      <div>
        <v-row v-for="(item, index) in 3" :key="index">
          <v-checkbox v-for="(item, index) in 8" :key="index"></v-checkbox>
        </v-row>
      </div>
    </div>
  </v-container>-->
  <v-container>
    <div>
      <div class="sequencer-row">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div class="sequencer-row">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
      <div class="sequencer-row">
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
    </div>
  </v-container>
</template>

<script>
import Tone from "../../node_modules/tone";
import { setTimeout } from "timers";

export default {
  mounted() {
    // had to put all this JS after 'mounted' to get it working
    const synths = [new Tone.Synth(), new Tone.Synth(), new Tone.Synth()];

    synths[0].oscillator.type = "pulse";
    synths[1].oscillator.type = "square";
    synths[2].oscillator.type = "pulse";

    const gain = new Tone.Gain(0.1);
    gain.toMaster();

    const filter = new Tone.Filter(800, "lowpass");
    const filterEnv = new Tone.FrequencyEnvelope(0.001, 0.3, 0.01, 0.01);
    console.log("filter env " + filterEnv.octaves + " " + filterEnv.exponent)
    filterEnv.exponent = 1;

    synths.forEach(synth => synth.connect(filter));
    filterEnv.connect(filter.frequency);
    filter.connect(gain);

    const $rows = document.body.querySelectorAll(".sequencer-row");
    const notes = ["Gb4", "Eb3", "C2"];

    Tone.Transport.scheduleRepeat(repeat, "4n");

    let index = 0;
    function repeat(time) {
      let step = index % 8;
      for (let i = 0; i < $rows.length; i++) {
        let synth = synths[i];
        let note = notes[i];
        let $row = $rows[i];
        let $input = $row.querySelector(`input:nth-child(${step + 1})`);
        // console.log($input.checked + i);

        if ($input.checked) {
          synth.triggerAttackRelease(note, "16n", time);
          filterEnv.triggerAttackRelease('4n')
        }
      }
      index++;
    }
    Tone.Transport.start();

    console.log("starting");
  }
};
</script>