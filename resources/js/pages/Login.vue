<template>
    <v-container style="height: 100%;">
        <v-spacer style="height: 15%"></v-spacer>
            <v-card class="mx-auto" max-width="450">
                <v-card-text>
                    <v-flex class="full-width">
                        <img alt="Chatterbox Logo" src="../../assets/Chatterbox_Black_Transparent.svg" id="logo">
                    </v-flex>
                    <v-form ref="form" class="px-3" @submit.prevent="login()" type="">
                        <v-text-field
                                v-model="email"
                                :rules="[emailRule, required()]"
                                type="email"
                                label="Email"
                                prepend-icon="mdi-email"
                                class="pb-2"
                        ></v-text-field>
                        <v-text-field
                                v-model="password"
                                :rules="[required()]"
                                type="password"
                                label="Password"
                                prepend-icon="mdi-lock-question"
                                class="pb-2"
                        ></v-text-field>
                        <v-flex class="text-sm-center">
                            <v-btn color="primary" type="submit">Login</v-btn>
                        </v-flex>
                        <v-flex class="text-sm-center pt-4" v-show="has_error">
                            <p class="error--text mb-0">Invalid login, try again.</p>
                        </v-flex>
                        <v-flex class="text-sm-center">
                            <p class="pt-4">Don't have an account? <router-link to="register">Register</router-link> instead.</p>
                        </v-flex>
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
                valid: true,
                has_error: false,
                emailRule: v => /.+@.+/.test(v) || 'E-mail must be valid',
            }
        },
        mounted() {
            //
        },
        methods: {
            login() {
                if(!this.$refs.form.validate()) return;
                // get the redirect object
                var redirect = this.$auth.redirect();
                var self = this;
                this.$auth.login({
                    params: {
                        email: self.email,
                        password: self.password
                    },
                    success: function () {
                        // handle redirection
                        const redirectTo = redirect ? redirect.from.name : this.$auth.user().role == 2 ? 'admin.dashboard' : 'dashboard'
                        this.$router.push({name: redirectTo}).catch(err => {console.log(err)});
                    },
                    error: function () {
                        self.has_error = true
                    },
                    rememberMe: true,
                    fetchUser: true
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