<template>
    <div>
        <v-card v-if="tasks">
            <v-data-table
                :headers="headers"
                :items="tasks"
                hide-default-footer
                class="elevation-0"
            >
                <template v-slot:item.name="{ item }">
                    <v-list-item class="user-list-item">
                        <v-list-item-avatar size="24" :color="item.initiator.avatar.background">
                            <v-img v-if="item.initiator.avatar.image" :src="item.initiator.avatar.image"></v-img>
                            <span v-if="!item.initiator.avatar.image" :style="'font-size: 10px; color:' + item.initiator.avatar.color">{{item.initiator.avatar.name}}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{item.name}}</v-list-item-title>
                            <v-list-item-subtitle>Инициатор: {{item.initiator.full_name}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
  export default {
    name: 'user-tasks-approval',
    props: ['tasks'],
    data() {
      return {
        headers: [
          {
            text: 'Название задачи',
            align: 'left',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Тип',
            align: 'left',
            sortable: false,
            value: 'type',
          },
        ]
      }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>