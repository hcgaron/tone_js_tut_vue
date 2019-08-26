<template>
    <label :for="this.for">{{labelText}}</label>
</template>

<script>
export default {
  props: {
    for: String,
    labelText: String
  }
}
</script>

<style lang="scss" scoped>
label {
    display: block;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    

}
</style>
