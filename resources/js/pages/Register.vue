<template>
    <v-container style="height: 100%;">
        <v-spacer style="height: 15%"></v-spacer>
        <v-card class="mx-auto" max-width="600">
            <v-card-text>
                <v-flex align-self-center class="mx-auto" style="max-width: 418px">
                    <img alt="Chatterbox Logo" id="logo" src="../../assets/Chatterbox_Black_Transparent.svg">
                </v-flex>
                <h1 class="pl-2 py-3">Register</h1>
                <v-form class="px-5" ref="form" @submit.prevent="register()" type="">
                    <v-layout row wrap>
                        <v-flex sm6 xs12>
                            <v-text-field
                                    :rules="[rules.name, required()]"
                                    class="pa-2"
                                    label="First Name"
                                    prepend-icon="mdi-account-box"
                                    v-model="firstName"
                            ></v-text-field>
                        </v-flex>
                        <v-flex sm6 xs12>
                            <v-text-field
                                    :rules="[rules.name, required()]"
                                    class="pa-2"
                                    label="Last Name"
                                    prepend-icon="mdi-account-box"
                                    v-model="lastName"
                            ></v-text-field>
                        </v-flex>

                        <v-flex sm7 xs12>
                            <v-text-field
                                    :rules="[rules.email, required()]"
                                    class="pa-2"
                                    label="Email"
                                    prepend-icon="mdi-email"
                                    type="email"
                                    v-model="email"
                            ></v-text-field>
                        </v-flex>
                        <v-flex sm5 xs12>
                            <v-text-field
                                    :rules="[rules.username, rules.username_length, required()]"
                                    class="pa-2"
                                    label="Username"
                                    prepend-icon="mdi-account-star"
                                    v-model="username"
                            ></v-text-field>
                        </v-flex>

                        <v-flex sm6 xs12>
                            <v-text-field
                                    :rules="[required()]"
                                    class="pa-2"
                                    label="Password"
                                    prepend-icon="mdi-lock-question"
                                    type="password"
                                    v-model="password"
                            ></v-text-field>
                        </v-flex>
                        <v-flex sm6 xs12>
                            <v-text-field
                                    :rules="[rules.confirm_pass, required()]"
                                    class="pa-2"
                                    label="Confirm Password"
                                    prepend-icon="mdi-lock-question"
                                    type="password"
                                    v-model="password_confirmation"
                            ></v-text-field>
                        </v-flex>
                        <v-flex class="text-sm-center" xs12>
                            <v-btn color="primary" type="submit">Register</v-btn>
                        </v-flex>
                        <v-flex class="text-sm-center pt-4" v-for="err in errors" :key="err" xs12>
                            <p class="error--text mb-0">{{err[0]}}</p>
                        </v-flex>
                        <v-flex class="text-sm-center" xs12>
                            <p class="pt-4">Already have an account?
                                <router-link to="login">Login</router-link>
                                instead.
                            </p>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                username: '',
                password_confirmation: '',
                has_error: false,
                error: '',
                errors: {},
                success: false,
                rules: {
                    name: s => /^[a-z ,.'-]{1,16}$/i.test(s) || "Name contains illegal characters.",
                    username: s => /^[a-zA-Z0-9_-]+$/.test(s) || "Username contains illegal characters.",
                    username_length: s => s.length >= 3 && s.length <= 16 || "Username must be between 3 and 16 characters.",
                    password_length: s => s.length >= 5 && s.length <= 64 || "Password must be between 5 and 64 characters.",
                    confirm_pass: s => s === this.password || "Passwords are not the same. " + s + " != " + this.password,
                    email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
                },
            }
        },
        methods: {
            register() {
                if (!this.$refs.form.validate()) return;

                var app = this;
                this.$auth.register({
                    data: {
                        email: app.email,
                        password: app.password,
                        password_confirmation: app.password_confirmation,
                        lastName: app.lastName,
                        firstName: app.firstName,
                        username: app.username,
                    },
                    success: function () {
                        app.success = true;
                        this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
                    },
                    error: function (res) {
                        console.log(res.response.data.errors);
                        app.has_error = true;
                        app.error = res.response.data.error;
                        app.errors = res.response.data.errors || {}
                    }
                })
            }
        }
    }
</script>
<style scoped>
    #logo {
        max-width: 100%;
        max-height: 100%;
        filter: invert(0.2);
    }

    p {
        margin-bottom: 5px;
    }
</style>