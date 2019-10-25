<template>
    <v-app-bar v-if="userProfile" app elevation="0" :height="59" class="app-header">
        <div class="flex-grow-1"></div>

        <v-list-item two-line class="app-header__profile">
            <v-list-item-content class="text-right">
                <v-list-item-title>{{userProfile.name.full_name}}</v-list-item-title>
                <v-list-item-subtitle>{{userProfile.email}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar :color="userProfile.avatar.background">
                <v-img v-if="userProfile.avatar.image" :src="userProfile.avatar.image"></v-img>
                <span v-if="!userProfile.avatar.image" :style="'color:' + userProfile.avatar.color">{{userProfile.avatar.name}}</span>
            </v-list-item-avatar>
        </v-list-item>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'app-header'
    }
</script>