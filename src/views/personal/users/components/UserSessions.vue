<template>
    <div>
        <v-card v-if="sessions">
            <v-data-table
                :headers="headers"
                :items="sessions"
                hide-default-footer
                class="elevation-0"
            >
                <template v-slot:item.action="{item}">
                    <v-icon small @click="deleteSession(item)">delete</v-icon>
                </template>
            </v-data-table>
        </v-card>

        <div class="justify-start mt-5">
            <v-btn class="bth-shadow mr-2" @click="deleteSessions" depressed color="error">Удалить все сессии</v-btn>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'user-sessions',
    props: ['sessions', 'id_phperson'],
    data() {
      return {
        headers: [
          {
            text: 'User Agent',
            align: 'left',
            sortable: false,
            value: 'user_agent',
          },
          {
            text: 'IP Address',
            align: 'right',
            sortable: false,
            value: 'ip_address',
            width: "150px"
          },
          {
            text: 'Создана',
            align: 'right',
            sortable: false,
            value: 'created_at',
            width: "200px"
          },
          {
            text: 'Годна до',
            align: 'right',
            sortable: false,
            value: 'access_expire_at',
            width: "200px"
          },
          {text: '', align: 'right', width: 40, align: 'right', value: 'action', sortable: false},
        ]
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {

      async deleteSessions() {
        this.$root.$emit('showYesNoDefault', async () => {
          let response = await this.$apiUsers.clearUserSessions(this.id_phperson)

          if (response.result) {
            this.$root.$emit('update')
            this.$root.$emit('showSnack', 'Сессии очищены', 'success')
          } else {
            this.$root.$emit('showSnack', 'Ошибка очистки сессии', 'error')
          }
        })
      },

      async deleteSession(item) {
        this.$root.$emit('showYesNoDefault', async () => {
          let response = await this.$apiUsers.deleteUserSession(this.id_phperson, item.id)

          if (response.result) {
            this.$root.$emit('update')
            this.$root.$emit('showSnack', 'Сессия удалена', 'success')
          } else {
            this.$root.$emit('showSnack', 'Ошибка удаления сессии', 'error')
          }
        })
      },
    }
  }
</script>