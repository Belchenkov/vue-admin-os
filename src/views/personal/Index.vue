<template>
  <v-app>
    <app-sidebar></app-sidebar>
    <v-content>
      <app-header></app-header>
      <router-view></router-view>
    </v-content>

    <!-- Move me to component please =) -->
    <v-snackbar
        v-model="snackbar.show"
        :top="true"
        :right="true"
        :color="snackbar.color"
    >
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.show = false">Ok</v-btn>
    </v-snackbar>

    <v-dialog v-model="dialogYesNo.show" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">{{dialogYesNo.title}}</v-card-title>
        <v-card-text>{{dialogYesNo.message}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="dialogYesNo.show = false">Нет</v-btn>
          <v-btn color="primary darken-1" text @click="dialogYesNoApply">Да</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import AppHeader from "@/components/personal/app-header";
  import AppSidebar from "@/components/personal/app-sidebar";

  export default {
    data() {
      return {
        snackbar: {
          show: false,
          text: '',
          color: 'success'
        },
        dialogYesNo: {
          show: false,
          title: '',
          message: '',
          callback: null,
        }
      }
    },
    components: {
      AppSidebar,
      AppHeader
    },
    created() {
      this.$root.$on('showSnack', (message, color) => {
        this.snackbar.show = true
        this.snackbar.text = message
        this.snackbar.color = color
      });

      this.$root.$on('showYesNo', (title, message, callback) => {
        this.dialogYesNo.show = true
        this.dialogYesNo.title = title
        this.dialogYesNo.message = message
        this.dialogYesNo.callback = callback
      });

      this.$root.$on('showYesNoDefault', (callback) => {
        this.dialogYesNo.show = true
        this.dialogYesNo.title = 'Подтвердите действие'
        this.dialogYesNo.message = 'Вы уверены что хотите выполнить это действие?'
        this.dialogYesNo.callback = callback
      });
    },
    methods: {
      dialogYesNoApply() {
        this.dialogYesNo.show = false
        if (this.dialogYesNo.callback)
          this.dialogYesNo.callback()
      },
      authSignOut() {
        this.$apiAuth.signOut()
      }
    }
  }
</script>