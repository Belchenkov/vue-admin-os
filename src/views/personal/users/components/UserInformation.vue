<template>
    <v-card v-if="item">
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
</template>
<script>
  export default {
    name: 'user-information',
    props: ['item'],
  }
</script>