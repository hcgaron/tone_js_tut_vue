<template>
  <v-app>
    <v-app-bar app>
      <!-- <router-link to="/"> -->
      <v-toolbar-title class="headline text-uppercase">
        <span>Tone.js Tutorial Series with Vuetify</span>
        <span class="font-weight-light">Jake Albaugh</span>
      </v-toolbar-title>
      <!-- </router-link> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text v-for="(video) in video_pages" :key="video.text" :to="{path: video.name}">
          {{video.text}}
          <v-subheader v-if="video.subheader">{{video.subheader}}</v-subheader>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <!-- <HelloWorld/> -->
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      video_pages: [
        { name: "about", text: "About"},
        { name: "video_1", text: "Video 1" },
        { name: "video_2", text: "Video 2" },
        { name: "video_3", text: "Video 3", subheader: "Arpeggiator" },
        { name: "video_4", text: "Video 4/5", subheader: "Synth Tester" },
        // { name: "misc", text: "Misc Testing"}
      ]
    };
  }
};
</script>
