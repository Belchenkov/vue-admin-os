<template>
    <v-container class="lighten-5">
        <div v-if="item != null" class="d-flex">
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

        <v-row>
            <v-col v-if="item != null" class="col-7" no-gutters>
                <div class="d-flex">
                    <h2 class="flex justify-start">Информация</h2>
                </div>
                <v-card class="mt-5">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="indigo"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.organisation}}</v-list-item-title>
                            <v-list-item-subtitle>Организация</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="">mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.name.full_name}}</v-list-item-title>
                            <v-list-item-subtitle>Имя пользователя</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.unit}}</v-list-item-title>
                            <v-list-item-subtitle>Отдел</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.position}}</v-list-item-title>
                            <v-list-item-subtitle>Должность</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.office_address}}</v-list-item-title>
                            <v-list-item-subtitle>Офис и кабинет</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.schedule}}</v-list-item-title>
                            <v-list-item-subtitle>Рабочий график</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.status}} / {{item.in_office ? 'В офисе' : 'Не на работе'}} / {{item.online_office ? item.online_office : ''}}</v-list-item-title>
                            <v-list-item-subtitle>Статус</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.chief_main}}</v-list-item-title>
                            <v-list-item-title>{{item.chief}}</v-list-item-title>
                            <v-list-item-subtitle>Руководители</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color="">mdi-email</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.email}}</v-list-item-title>
                            <v-list-item-subtitle>Email</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.phone_mobile">
                        <v-list-item-icon>
                            <v-icon color="">mdi-phone</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.phone_mobile}}</v-list-item-title>
                            <v-list-item-subtitle>Мобильный телефон</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.phone_work">
                        <v-list-item-icon>
                            <v-icon color="">mdi-phone</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.phone_work}}</v-list-item-title>
                            <v-list-item-subtitle>Рабочий телефон</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.tab_no}}</v-list-item-title>
                            <v-list-item-subtitle>Табельный номер</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon color=""></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{item.id_phperson}}</v-list-item-title>
                            <v-list-item-subtitle>Номер из 1С</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col class="col-5" v-if="visits" no-gutters>
                <div class="d-flex">
                    <h2 class="flex justify-start">Последние посещения</h2>
                </div>
                <v-card  class="mt-5 pr-5 mx-auto">
                    <v-list-item v-for="(visit, day) in visits">
                        <v-list-item-content v-if="visit.empty">
                            <v-list-item-title class="text--red">{{day}} {{visit.day_of_week}}</v-list-item-title>
                            <v-list-item-subtitle>Нет данных</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content v-if="visit.holiday">
                            <v-list-item-title class="text--red">{{day}} {{visit.day_of_week}}</v-list-item-title>
                            <v-list-item-subtitle>{{visit.status}}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content v-if="!visit.empty && !visit.holiday" class="visit-time">
                            <v-list-item-title>{{day}} {{visit.day_of_week}}</v-list-item-title>
                            <v-row>
                                <v-col>
                                    <v-list-item-subtitle>Вход: {{visit.enter_time || '-'}}</v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                    <v-list-item-subtitle>Выход: {{visit.exit_time || '-'}}</v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                    <v-list-item-subtitle>Рабочее время: {{visit.work_time || '-'}}</v-list-item-subtitle>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-list-item-subtitle>Вне офиса: {{visit.idle_time || '-'}}</v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                    <v-list-item-subtitle>На территории: {{visit.territory_time || '-'}}</v-list-item-subtitle>
                                </v-col>
                                <v-col>
                                    <v-list-item-subtitle></v-list-item-subtitle>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    props: ['id_phperson'],
    components: {},
    data: () => {
      return {
        item: null,
        visits: null,
      }
    },
    mounted() {
      this.loadUser(this.id_phperson)
    },
    methods: {
      async loadUser(id_phperson) {
        let response = await this.$apiUsers.getUser(id_phperson)

        if (response.result) {
          this.item = response.data;

          response = await this.$apiUsers.getUserVisits(id_phperson)

          if (response.result) {
            this.visits = response.data
            this.visits.reverse
          }
        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки данных', 'error')
          this.item = null
          this.$router.push({name: 'users'})
        }
      }
    }
  }
</script>