<template>
    <v-data-table
    v-bind:headers="headers"
    v-bind:items="users"
    :items-per-page="20"
    :loading="loading"
    no-results-text="No users found."
    >
    </v-data-table>
</template>
<script>
    export default {
        data() {
            return {
                headers: [
                    {text: "ID", value: "id", align: "center", sortable: true},
                    {text: "Username", value: "username", align: "center", sortable: true},
                    {text: "Firt Name", value: "firstName", align: "center", sortable: true},
                    {text: "Last Name", value: "lastName", align: "center", sortable: true},
                    {text: "Email", value: "email", align: "center", sortable: true},
                    {text: "Register Date", value: "registered", align: "center", sortable: true},
                    {text: "Role", value: "roleString", align: "center", sortable: true},
                ],
                users: [],
                loading: false,
            }
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                self = this;
                this.$http({
                    url: `users`,
                    method: 'GET'
                }).then((res) => {
                    res.data.users.forEach(function(user) {
                        user.roleString = user.role == 1 ? "User" : "Admin";
                        user.registered = self.formatDate(user.created_at);
                    });
                    self.users = res.data.users;
                });
            }
        }
    }
</script>