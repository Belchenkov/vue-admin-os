<template>
    <v-container>
        <div class="d-flex">
            <h1 v-if="!this.id" class="flex justify-start">Новый отчет</h1>
            <h1 v-if="this.id" class="flex justify-start">Редактировать отчет</h1>

            <div class="justify-end">
                <v-btn v-if="!this.id" class="bth-shadow" @click="createItem" depressed color="primary">Создать</v-btn>
                <v-btn v-if="this.id" class="bth-shadow mr-2" @click="deleteItem" outlined depressed color="error">Удалить</v-btn>
                <v-btn v-if="this.id" class="bth-shadow" @click="saveItem" depressed color="primary">Сохранить</v-btn>
            </div>
        </div>

        <v-row v-if="item != null">
            <v-col class="col-12" no-gutters>
                <v-card>
                    <v-container>
                        <v-text-field
                            v-model="item.title"
                            :counter="255"
                            label="Заголовок новости"
                            :error-messages="errors.title"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="item.tableau_url"
                            :counter="2048"
                            label="Ссылка на отчет в Tableau (share link)"
                            :error-messages="errors.tableau_url"
                            required
                        ></v-text-field>

                        <v-autocomplete
                            v-model="selectedUsers"
                            :disabled="loading"
                            :items="users"
                            filled
                            chips
                            color="blue-grey lighten-2"
                            label="Пользователи видящие отчет"
                            item-text="full_name"
                            item-value="id_phperson"
                            multiple
                        >
                            <template v-slot:selection="data">
                                <v-chip
                                    v-bind="data.attrs"
                                    :input-value="data.selected"
                                    close
                                    @click="data.select"
                                    @click:close="remove(data.item)"
                                >
                                    <v-avatar :color="data.item.avatar.background" left>
                                        <span v-if="!data.item.avatar.image" :style="'color:' + data.item.avatar.color">{{data.item.avatar.name}}</span>
                                        <img v-else :src="data.item.avatar.image">
                                    </v-avatar>
                                    {{ data.item.full_name }}
                                </v-chip>
                            </template>
                            <template v-slot:item="data">
                                <template v-if="typeof data.item !== 'object'">
                                    <v-list-item-content v-text="data.item"></v-list-item-content>
                                </template>
                                <template v-else>
                                    <v-list-item-avatar :color="data.item.avatar.background">
                                        <span v-if="!data.item.avatar.image" :style="'color:' + data.item.avatar.color">{{data.item.avatar.name}}</span>
                                        <img v-else :src="data.item.avatar.image">
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-html="data.item.full_name"></v-list-item-title>
                                        <v-list-item-subtitle v-html="data.item.position"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    components: {},
    props: ['id'],
    data: () => {
      return {
        valid: false,
        loading: true,
        users: [],
        selectedUsers: [],
        item: {
          title: '',
          tableau_url: '',
          users: [],
        },
        errors: {
          title: '',
          tableau_url: ''
        },
      }
    },
    mounted() {
      if (this.id) {
        this.loadItem()
      } else
        this.loadUsers()
    },
    methods: {
      loadUsers() {
        this.loading = true
        this.$apiUsers.getUserCatalog(-1, false).then((response) => {
          this.users = response.data
          this.loading = false
        })
      },

      remove (item) {
        const index = this.selectedUsers.indexOf(item.id_phperson)
        if (index >= 0) this.selectedUsers.splice(index, 1)
      },

      async loadItem() {
        this.loading = true

        let response = await this.$apiTableau.getTableau(this.id)

        if (response.result) {
          this.item = response.data
          this.selectedUsers = this.item.users
          this.loading = false
          this.loadUsers()
        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки отчета', 'error')
          this.$router.push({name: 'tableau'})
        }
      },

      async deleteItem() {
        this.$root.$emit('showYesNoDefault', async () => {
          let response = await this.$apiTableau.deleteTableau(this.id)

          if (response.result) {
            this.$root.$emit('showSnack', 'Отчет удален', 'success')
            this.$router.push({name: 'tableau'})
          } else {
            this.$root.$emit('showSnack', 'Ошибка удаления отчета', 'error')
          }
        })
      },

      async saveItem() {
        this.loading = true

        this.item.users = this.selectedUsers
        let response = await this.$apiTableau.updateTableau(this.id, this.item)

        if (response.result) {
          this.$root.$emit('showSnack', 'Сохранено', 'success')
        } else {
          this.$root.$emit('showSnack', 'Ошибка при сохранении', 'error')
          this.errors = response.error
          this.$forceUpdate()
        }

        this.loading = false
      },

      async createItem() {
        this.loading = true

        this.item.users = this.selectedUsers
        let response = await this.$apiTableau.createTableau(this.item)

        if (response.result) {
          this.$root.$emit('showSnack', 'Сохранено', 'success')
          this.$router.push({name: 'tableau'})
        } else {
          this.$root.$emit('showSnack', 'Ошибка при сохранении', 'error')
          this.errors = response.error
          this.$forceUpdate()
        }

        this.loading = false
      }
    }
  }
</script>