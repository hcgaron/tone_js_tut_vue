<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Tone.js Tutorial Series with Vuetify</span>
        <span class="font-weight-light">Jake Albaugh</span>
      </v-toolbar-title>
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
        { name: "video_1", text: "Video 1" },
        { name: "video_2", text: "Video 2" },
        { name: "video_3", text: "Video 3", subheader: "Arpeggiator" },
        { name: "video_4", text: "Video 4", subheader: "Synth Tester" }
      ]
    };
  }
};
</script>
