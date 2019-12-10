<template>
    <v-container class="lighten-5">
        <div v-if="!item">
            <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
                class="mr-2"
            ></v-progress-circular>
            <span>Загрузка данных пользователя...</span>
        </div>
        <div v-if="item != null" class="d-flex">
            <div class="justify-start col-8">
                <v-list-item>
                    <v-list-item-avatar size="100" :color="item.avatar.background">
                        <v-img v-if="item.avatar.image" :src="item.avatar.image"></v-img>
                        <span v-if="!item.avatar.image" :style="'font-size: 45px; color:' + item.avatar.color">{{item.avatar.name}}</span>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title style="font-size: 25px">{{item.name.full_name}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.unit}}: {{item.position}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </div>
            <div class="justify-end col-4 row wrap align-center">
                <v-btn class="bth-shadow" @click="updateProfile" depressed outlined color="primary">
                    Обновить
                    <v-icon right dark>mdi-autorenew</v-icon>
                </v-btn>
            </div>
        </div>

        <v-tabs
            v-if="item != null"
            v-model="tab"
            background-color="transparent">
            <v-tab>Информация о пользователе</v-tab>
            <v-tab>Статистика посещений</v-tab>
            <v-tab>Кабинет согласований</v-tab>
            <v-tab>Сессии авторизации</v-tab>
            <v-tab>Настройки</v-tab>
        </v-tabs>

        <v-tabs-items v-if="item != null" class="mt-5" v-model="tab">
            <v-tab-item :transition="false" :reverse-transition="false">
                <user-information v-if="item" :item="item"></user-information>
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
                <user-visits v-if="visits" :visits="visits"></user-visits>
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
                <user-tasks-approval
                    :tasks="approval"
                >
                </user-tasks-approval>
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
                <user-sessions
                    :sessions="sessions"
                    :id_phperson="id_phperson"
                    @updateProfile="updateProfile"
                ></user-sessions>
            </v-tab-item>
            <v-tab-item :transition="false" :reverse-transition="false">
                <user-settings
                    :id_phperson="id_phperson"
                ></user-settings>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script>
  import UserInformation from "./components/UserInformation";
  import UserVisits from "./components/UserVisits";
  import UserSessions from "./components/UserSessions";
  import UserSettings from "./components/UserSettings";
  import UserTasksApproval from "./components/UserTasksApproval";

  export default {
    props: ['id_phperson'],
    components: {UserInformation, UserVisits, UserSessions, UserTasksApproval, UserSettings},
    data: () => {
      return {
        item: null,
        visits: null,
        sessions: null,
        approval: null,
        tab: 0,
      }
    },
    watch: {
      $route(to, from) {
        this.item = null
        this.$forceUpdate()
        this.loadUser(this.id_phperson)
      }
    },
    created() {
    },
    mounted() {;
      this.loadUser(this.id_phperson)
    },
    methods: {
      async updateProfile() {
        await this.loadUser(this.id_phperson)
        this.$root.$emit('showSnack', 'Данные обновлены', 'success')
      },
      async loadVisits(id_phperson) {
        let response = await this.$apiUsers.getUserVisits(id_phperson)
        this.visits = null

        if (response.result) {
          this.visits = response.data
          this.visits.reverse
        }
      },

      async loadSessions(id_phperson) {
        let response = await this.$apiUsers.getUserSessions(id_phperson)
        this.sessions = null

        if (response.result) {
          this.sessions = response.data
        }
      },

      async loadApprovalTasks(id_phperson) {
        let response = await this.$apiUsers.getUserApprovalTasks(id_phperson)
        this.approval = null
        if (response.result) {
          this.approval = response.data
        }
      },

      async loadUser(id_phperson) {
        let response = await this.$apiUsers.getUser(id_phperson)

        if (response.result) {
          this.item = response.data;
          this.loadVisits(id_phperson)
          this.loadSessions(id_phperson)
          this.loadApprovalTasks(id_phperson)
          this.loadApprovalTasks(id_phperson)

        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки данных', 'error')
          this.item = null
          this.$router.push({name: 'users'})
        }
      }
    }
  }
</script>