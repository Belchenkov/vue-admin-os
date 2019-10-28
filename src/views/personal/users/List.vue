<template>
    <v-container>
        <div class="d-flex">
            <h1 class="flex justify-start">Справочник сотрудников</h1>
        </div>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    @keyup.native.enter="pagination.current_page = 1; loadList();"
                ></v-text-field>
            </v-card-title>
            <v-data-table :loading="loading" :single-select="select" :headers="headers"
                          hide-default-footer :items="items" :items-per-page="15"
                          item-key="id" checkbox-icon class="elevation-0">
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
            <div class="pt-5 pb-5">
                <v-pagination
                    class="app-pagination"
                    @input="this.loadList"
                    v-model="pagination.current_page"
                    :length="pagination.last_page"
                    :total-visible="6"
                ></v-pagination>
            </div>
        </v-card>
    </v-container>
</template>

<script>
  export default {
    components: {},
    data: () => {
      return {
        search: '',
        loading: true,
        items: [],
        pagination: {
          current_page: 1,
          last_page: 0,
        },
        select: null,
        headers: [
          {
            text: 'Имя пользователя',
            align: 'left',
            sortable: false,
            value: 'full_name',
          },
          {
            text: 'Должность',
            align: 'left',
            sortable: false,
            value: 'position',
          },
          {
            text: 'Email',
            align: 'left',
            sortable: false,
            value: 'email',
          },
          {text: '', value: 'action', sortable: false},
        ]
      }
    },
    mounted() {
      this.loadList();
    },
    methods: {
      async loadList() {
        document.getElementById('app').scrollIntoView()

        this.loading = true
        let response = await this.$apiUsers.getUserCatalog(this.pagination.current_page, false, this.search)

        if (response.result) {
          this.items = response.data
          this.pagination = response.meta
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