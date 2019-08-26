<template>
  <header>
    <!-- hidden radio buttons -->
    <div id="hiddenRadios">
      <input
        type="radio"
        v-for="(item, index) in numButtons"
        :key="index"
        :id="`chord-${index+1}`"
        :value="index+1"
        v-model.number="currentChord"
        :checked="currentChord === index-1"
      />
    </div>
    <!-- visible radio labels (much prettier) -->
    <div id="visibleRadioLabels">
      <ul>
        <li v-for="(item, index) in numButtons" 
            :key="index" 
            @click="changeChord(index+1)">
          <arp-radio-label
            :for="`chord-${index+1}`"
            :labelText="`${index+1}`"
            :class="{ active: currentChord === index+1 }"
          ></arp-radio-label>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import ArpRadioLabel from "./ArpRadioLabel";
import { type } from "os";
export default {
  props: {
    numButtons: Number,
    checkedValue: Number
  },
  data() {
    return {
      currentChord: this.checkedValue
    };
  },
  methods: {
    changeChord(chordIndex) {
      console.log("change");
      // console.log(e);
      this.currentChord = chordIndex;
      console.log(this.currentChord);
       this.$emit('changeChord', this.currentChord);
    }
  },
  components: {
    arpRadioLabel: ArpRadioLabel
  },
  updated() {
    // console.log(this.currentChord)
  },
  mounted() {
    // console.log(this.currentChord)
  }
};
</script>

<style lang="scss">
#hiddenRadios {
  display: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    flex: 1;
    border: 1px solid white;
    background: black;
    color: white;
  }
  .active {
    background: red;
  }
}
</style>
