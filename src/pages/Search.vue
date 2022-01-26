<template>
  <div class="container">
    <form @submit.prevent="search">
      <label> search string</label>
      <input type="search" v-model="term" />
      <button type="submit" >Search</button>
    </form>
    <button @click="reset">Reset Search</button>
    <br />
    <br />

    <template v-for="(term,index) in terms_searched" :key="term+index">
      <div class="pill">
        <p>{{ term }}</p>
        <button @click="removeTerm(term,index)">X</button>
      </div>
    </template>

    <!--         <label>search by</label>
        <select v-model="term_by">
            <option value="name" >name</option>
            <option value="username" >username</option>
            <option value="email" >email</option>
            <option value="phone" >phone</option>
        </select> -->

    <br />
    <br />

    Tamanho do array: {{ users.length }}
    <div v-for="user in users" :key="user.id" class="box">
      username: {{ user.name }}
      <br />
      <img :src="user.url" />
    </div>
  </div>
</template>

<script>
import { partTerm } from "../utils/search";
export default {
  data() {
    return {
      term: "",
      terms_searched: [],
      term_by: "name",
      users: require("../data/users.json"),
      all_users: require("../data/users.json")
    };
  },
  methods: {
    search() {
      this.terms_searched.push(this.term);
      let new_users = this.restoreFromTerms();
      this.users = partTerm(new_users, this.term_by, this.term);
      this.term = "";
    },
    reset() {
      this.users = this.all_users;
      this.term = "";
      this.terms_searched = [];
    },
    removeTerm(term,index) {
      this.terms_searched.splice(index,1);
      this.users = this.restoreFromTerms();
    },
    restoreFromTerms() {
      let new_users = this.all_users;
      for (let i = 0; i < this.terms_searched.length; i++) {
        new_users = partTerm(new_users, this.term_by, this.terms_searched[i]);
      }
      return new_users;
    }
  }
};
</script>

<style>
.box {
  border: 1px solid green;
  margin: 0.5rem;
}
.box img {
  width: 5rem;
}

.pill {
  display: flex;
}
</style>
