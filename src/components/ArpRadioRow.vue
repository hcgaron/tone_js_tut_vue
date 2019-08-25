<template>
  <header>
    <!-- hidden radio buttons -->
    <div id="hiddenRadios">
      <input type="radio" v-for="(item, index) in numButtons" 
          :key="index" 
          :id="`chord-${index}`"
          :value="index"
          v-model.number="checkedValue"
          :checked="checkedValue === index-1"
          />
    </div>
    <!-- visible radio labels (much prettier) -->
    <div id="visibleRadioLabels">
      <ul>
        <li v-for="(item, index) in numButtons" :key="index">
          <arp-radio-label :for="`chord-${index}`" :labelText="`${index+1}`"></arp-radio-label>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import ArpRadioLabel from "./ArpRadioLabel";
export default {
  props: {
    numButtons: Number
  },
  data() {
    return {
      checkedValue: 0
    };
  },
  components: {
    arpRadioLabel: ArpRadioLabel
  },
  updated(){
    console.log(this.checkedValue)
  },
  mounted(){
    console.log(this.checkedValue)
  }
};
</script>

<style lang="scss">
#hiddenRadios {
  // display: none;
}
ul {
  list-style: none;
  // margin: 0;
  // padding: 0;
  display: flex;
  li {
    flex: 1;
    border: 1px solid white;
    background: black;
    color: white;
  }
}
</style>
