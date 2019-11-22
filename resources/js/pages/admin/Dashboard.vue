<template>
    <v-container>
        <h1>Admin Dashboard</h1>
        <userTable></userTable>
    </v-container>
</template>
<script>
    import userTable from '../../components/UserTable.vue';
    export default {
        mounted() {
            //
        },
        components: {
            userTable,
        }
    }
</script>