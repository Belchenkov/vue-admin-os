<template>
    <v-container>
        <div class="d-flex">
            <h1 class="flex justify-start">Рассылки PUSH уведомлений</h1>
            <div class="justify-end">
                <v-btn class="bth-shadow" :to="{name: 'mailing.create'}" depressed color="primary">Создать рассылку</v-btn>
            </div>
        </div>

        <v-card>
            <v-data-table :loading="loading" :headers="headers"
                          hide-default-footer :items="items" :items-per-page="25"
                          item-key="id" checkbox-icon class="elevation-0">
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
        loading: true,
        items: [],
        pagination: {
          current_page: 1,
          last_page: 0,
        },
        headers: [
          {
            text: 'Текст рассылки',
            align: 'left',
            sortable: false,
            value: 'content',
          },
          {
            text: 'Дата создания',
            align: 'right',
            sortable: false,
            value: 'created_at',
          },
        ]
      }
    },
    mounted() {
      this.loadList();
    },
    methods: {
      async loadList() {
        this.loading = true
        let response = await this.$apiMailing.getMailingList(this.pagination.current_page)

        if (response.result) {
          this.items = response.data.data
          this.pagination = {
            current_page: response.data.current_page,
            last_page: response.data.last_page,
          }
        } else {
          this.$root.$emit('showSnack', 'Ошибка загрузки данных', 'error')
        }
        this.loading = false
      },
    }
  }
</script>