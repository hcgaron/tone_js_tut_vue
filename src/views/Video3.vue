<template>
  <v-container>
    <arp-radio-row :numButtons="numButtons"></arp-radio-row>
  </v-container>



  <!-- <v-container>
    <v-radio-group row id="arpRadio">
      <v-radio id="chord-1" value="1" name="chord"></v-radio>
      <v-radio id="chord-2" value="2" name="chord"></v-radio>
      <v-radio id="chord-3" value="3" name="chord"></v-radio>
      <v-radio id="chord-4" value="4" name="chord"></v-radio>
      <v-radio id="chord-5" value="5" name="chord"></v-radio>
      <v-radio id="chord-6" value="6" name="chord"></v-radio>
    </v-radio-group>
    <header>
      <v-list row>
        <v-list-item>
          <label for="chord-1">1</label>
        </v-list-item>
        <v-list-item>
          <label for="chord-2">2</label>
        </v-list-item>
        <v-list-item>
          <label for="chord-3">3</label>
        </v-list-item>
        <v-list-item>
          <label for="chord-4">4</label>
        </v-list-item>
        <v-list-item>
          <label for="chord-5">5</label>
        </v-list-item>
        <v-list-item>
          <label for="chord-6">6</label>
        </v-list-item>
      </v-list>
    </header>
  </v-container>-->
</template>

<script>
import Tone from "../../node_modules/tone";
import ArpRadioRow from "../components/ArpRadioRow";
export default {
  data() {
    return {
      numButtons: 5
    };
  },
  components: {
    arpRadioRow: ArpRadioRow
  },
  mounted() {},
  updated() {}
};
</script>

<style lang="scss" scoped>
#arpRadio {
  visibility: hidden;
}

input {
  position: absolute;
  left: -9999px;
}
</style>