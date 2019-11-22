<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant.sync="mini"
                permanent
                app
                v-if="authed()"
        >
            <v-list-item>
                <v-list-item-avatar>
                   <v-avatar color="primary" size="38">
                       <span class="white--text headline" v-if="authed()">{{$auth.user().name[0]}}</span>
                       <v-icon color="white" v-else>mdi-account-circle</v-icon>
                   </v-avatar>
                </v-list-item-avatar>

                <v-list-item-title>{{this.$auth.user().name != null ? this.$auth.user().name : "Unknown"}}</v-list-item-title>

                <v-btn
                        icon
                        @click.stop="mini = !mini"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item v-if="" link to="/">
                    <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>Home</v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item v-if="" link to="/topics">
                    <v-list-item-icon><v-icon>mdi-format-list-bulleted-square</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>Topics</v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item v-if="" link to="/dashboard">
                    <v-list-item-icon><v-icon>mdi-view-dashboard-variant</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>Dashboard</v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item v-if="isAdmin()" link to="/admin">
                    <v-list-item-icon><v-icon>mdi-monitor-dashboard</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>Admin Dashboard</v-list-item-title></v-list-item-content>
                </v-list-item>
                <v-list-item v-if="$auth.check()" @click.prevent="$auth.logout()">
                    <v-list-item-icon><v-icon>mdi-logout-variant</v-icon></v-list-item-icon>
                    <v-list-item-content><v-list-item-title>Logout</v-list-item-title></v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>
    export default {
        data () {
            return {
                drawer: true,
                mini: true,
            }
        },
        methods: {
            log() {
                console.log(this.$auth.user().name);
            },
        }
    }
</script>
