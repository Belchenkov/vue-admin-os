<template>
    <v-container>
        <div class="d-flex">
            <h1 class="flex justify-start">Список администраторов системы</h1>
        </div>

        <v-card>
            <v-data-table :loading="loading" :single-select="select" :headers="headers" :items="items"
                          item-key="id" checkbox-icon class="elevation-0"
                          hide-default-footer>
                <template v-slot:item.full_name="{ item }">
                    <v-list-item class="user-list-item">
                        <v-list-item-avatar size="24" :color="item.avatar.background">
                            <v-img v-if="item.avatar.image" :src="item.avatar.image"></v-img>
                            <span v-if="!item.avatar.image" :style="'font-size: 10px; color:' + item.avatar.color">{{item.avatar.name}}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{item.full_name}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.department_name}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-slot:item.action="{item}">
                    <v-icon
                        small
                        class="mr-2"
                        @click="viewUser(item)"
                    >mdi-account-card-details
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    components: {},
    data: () => {
      return {
        loading: true,
        items: [],
        select: null,
        headers: [
          {
            text: 'Имя пользователя',
            align: 'left',
            sortable: false,
            value: 'full_name',
          },
          {
            text: 'Email',
            align: 'left',
            sortable: false,
            value: 'email',
          },
          {text: '', value: 'action', align: 'right', sortable: false},
        ]
      }
    },
    mounted() {
      this.loadList();
    },
    methods: {
      async loadList() {
        this.loading = true
        let response = await this.$apiUsers.getAdmins()

        if (response.result) {
          this.items = response.data
        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки данных', 'error')
        }

        this.loading = false
      },
      viewUser(item) {
        this.$router.push({name: 'users.view', params: {id_phperson: item.id_phperson}});
      }
    }
  }
</script>