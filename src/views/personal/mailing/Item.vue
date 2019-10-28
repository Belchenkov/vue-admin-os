<template>
    <v-container>
        <div class="d-flex">
            <h1 class="flex justify-start">Новая PUSH рассылка</h1>

            <div class="justify-end">
                <v-btn class="bth-shadow" @click="createItem" depressed color="primary">Создать и отправить</v-btn>
            </div>
        </div>

        <v-row>
            <v-col class="col-12" no-gutters>
                <v-card>
                    <v-container>
                        <v-text-field
                            v-model="item.content"
                            :counter="200"
                            label="Содержание рассылки"
                            :error-messages="errors.content"
                            required
                        ></v-text-field>
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
        item: {
          content: '',
        },
        errors: {
          content: ''
        },
      }
    },
    mounted() {
    },
    methods: {
      async createItem() {
        this.loading = true

        let response = await this.$apiMailing.createMailing(this.item)

        if (response.result) {
          this.$root.$emit('showSnack', 'Сохранено! Рассылка в очереди задач!', 'success')
          this.$router.push({name: 'mailing'})
        } else {
          this.$root.$emit('showSnack', 'Ошибка при сохранении', 'error')
          this.errors = response.error
          this.$forceUpdate()
        }

        this.loading = false
      },
    }
  }
</script>