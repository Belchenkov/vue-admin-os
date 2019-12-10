<template>
    <div>
        <div v-if="isLoading">
            <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                    class="mr-2"
            ></v-progress-circular>
            <span>Загрузка настроек пользователя...</span>
        </div>
        <v-card v-else>
            <v-sheet class="pa-5">
                <v-switch
                        v-model="settings.showKip"
                        inset
                        @change="showKipChange"
                        label="Отображать в КИП"
                ></v-switch>
            </v-sheet>
        </v-card>
    </div>
</template>
<script>
  export default {
    name: 'user-settings',
    props: ['id_phperson'],
    data() {
      return {
          isLoading: false,
          settings: {
              showKip: false
          }
      }
    },
    computed: {
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        async showKipChange() {
            await this.$apiUsers.showKipChange(this.id_phperson, this.settings.showKip);
        },

        async getSettings() {
            this.isLoading = true;
            let response = await this.$apiUsers.getSettings(this.id_phperson);

            this.isLoading = false;
            if (response.result) {
                this.settings.showKip = !!(+response.data.kip_global);
            }
        }
    }
  }
</script>