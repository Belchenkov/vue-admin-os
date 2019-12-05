<template>
    <v-container>
        <div class="d-flex">
            <h1 class="flex justify-start">Отчеты Tableau</h1>
            <div class="justify-end">
                <v-btn class="bth-shadow" :to="{name: 'tableau.create'}" depressed color="primary">Добавить отчет</v-btn>
            </div>
        </div>

        <v-card>
            <v-data-table :loading="loading" :single-select="select" :headers="headers"
                          hide-default-footer :items="items" :items-per-page="25"
                          item-key="id" checkbox-icon class="elevation-0">
                <template v-slot:item.action="{item}">
                    <v-icon small class="mr-2" @click="viewTableau(item)">edit</v-icon>
                    <v-icon small @click="deleteTableau(item)">delete</v-icon>
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
            text: 'Название',
            align: 'left',
            sortable: false,
            value: 'title',
          },
          {
            text: 'Дата создания',
            align: 'right',
            sortable: false,
            value: 'created_at',
          },
          {text: '', align: 'right', width: 90, align: 'right', value: 'action', sortable: false},
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
        let response = await this.$apiTableau.getTableauList(this.pagination.current_page)

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

      viewTableau(item) {
        this.$router.push({name: 'tableau.edit', params: {id: item.id}});
      },

      async deleteTableau(news) {
        this.$root.$emit('showYesNoDefault', async () => {
          let response = await this.$apiTableau.deleteTableau(news.id)

          if (response.result) {
            this.$root.$emit('showSnack', 'Отчет удален', 'success')
            this.loadList()
          } else {
            this.$root.$emit('showSnack', 'Ошибка удаления отчета', 'error')
          }
        })
      },
    }
  }
</script>