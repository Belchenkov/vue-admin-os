<template>
    <v-card v-if="visits">
        <v-data-table
            :headers="headers"
            :items="tableItems"
            hide-default-footer
            class="elevation-0"
        >
            <template v-slot:item="{item, index, value}">
                <tr v-if="item.empty">
                    <td>{{item.day}} / {{item.day_of_week}}</td>
                    <td colspan="5">Выходной день</td>
                </tr>
                <tr v-else-if="item.holiday">
                    <td>{{item.day}} / {{item.day_of_week}}</td>
                    <td colspan="5">{{item.status}}</td>
                </tr>
                <tr v-else>
                    <td>{{item.day}} / {{item.day_of_week}}</td>
                    <td class="text-left">{{item.enter_time}}</td>
                    <td class="text-center">{{item.exit_time}}</td>
                    <td class="text-center">{{item.work_time}}</td>
                    <td class="text-center">{{item.idle_time}}</td>
                    <td class="text-center">{{item.territory_time}}</td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
  export default {
    name: 'user-visits',
    props: ['visits'],
    data() {
      return {
        headers: [
          {
            text: 'Дата',
            align: 'left',
            sortable: false,
            value: 'day',
            width: 140
          },
          {
            text: 'Вход',
            align: 'left',
            sortable: false,
            value: 'enter_time',
          },
          {
            text: 'Выход',
            align: 'center',
            sortable: false,
            value: 'exit_time',
          },
          {
            text: 'Рабочее время',
            align: 'center',
            sortable: false,
            value: 'work_time',
          },
          {
            text: 'Вне офиса',
            align: 'center',
            sortable: false,
            value: 'idle_time',
          },
          {
            text: 'На территории',
            align: 'center',
            sortable: false,
            value: 'territory_time',
          }
        ]
      }
    },
    computed: {
      tableItems() {
        let items = []

        for (var day in this.visits) {
          this.visits[day].day = day
          items.push(this.visits[day])
        }

        return items
      }
    },
    mounted() {
    }
  }
</script>