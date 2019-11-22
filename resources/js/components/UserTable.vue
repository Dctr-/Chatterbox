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
                    {text: "Name", value: "name", align: "center", sortable: true},
                    {text: "Email", value: "email", align: "center", sortable: true},
                    {text: "Register Date", value: "register_date", align: "center", sortable: true},
                    {text: "Role", value: "role", align: "center", sortable: true},
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
                    console.log(res);
                    console.log(res.data);
                    console.log(res.data.users);
                    res.data.users.forEach(function(user) {
                        self.users.push(
                            {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                register_date: user.created_at,
                                role: user.role == 1 ? "User" : "Admin"
                            }
                        );
                    })
                });
            }
        }
    }
</script>