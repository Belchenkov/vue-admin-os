<template>
    <v-navigation-drawer :mini-variant="mini" app permanent elevation="5" class="side-bar">
        <v-list-item class="header-logo">
            <v-list-item-title v-if="!mini" class="header-logo"><b>Admin</b> Panel</v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
                <v-icon v-if="!mini">chevron_left</v-icon>
                <v-icon v-if="mini">chevron_right</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense flat>
            <v-list-item link :to="{name: 'dashboard'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-heart-pulse</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'administrators'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Администраторы</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'users'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-account-alert</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Справочник сотрудников</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'news'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-pencil-box-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Новости</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'tableau'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-chart-areaspline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Отчеты</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link :to="{name: 'mailing'}" class="side-bar__item">
                <v-list-item-icon>
                    <v-icon>mdi-comment-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Рассылки</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link class="side-bar__item" v-on:click="signOut">
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Выход</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'app-sidebar',
        data: () => {
            return {
                mini: false
            }
        },
        methods: {
            signOut() {
                this.$apiAuth.signOut();
            }
        }
    }
</script>