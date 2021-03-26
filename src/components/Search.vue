<template>
    <div class="container">
        <label> search string</label>
        <input type="search" v-model="term">
        <br>
        <br>

        <label>search br</label>
        <select v-model="term_by">
            <option value="name" >name</option>
            <option value="username" >username</option>
            <option value="email" >email</option>
            <option value="phone" >phone</option>
        </select>

        <br>
        <br>

        <div v-for="user in users_filtered" :key="user.id" class="box">
            username: {{user.username}} 
            <br>
            name: {{user.name}}
        </div>
    </div>
</template>

<script>
import { filter,capitalize } from "lodash";
export default {
    data(){
        return {
            term: '',
            term_by: 'name',
            users: require('../data/users.json')
        }
    },
    computed: {
        users_filtered(){
            if (this.term === '') {
                return this.users;
            }

            const filtered = filter(this.users,(user)=>{
                return user[this.term_by] === capitalize(this.term);
            });

            if (filtered.length === 0) {
                console.log(filtered);
                return this.users;
            }

            console.log(filtered);
            return filtered;
        }
    },
    methods: {
    }
}
</script>

<style>
.box{
    border: 1px solid green;
    margin: 0.5rem;
}
</style>