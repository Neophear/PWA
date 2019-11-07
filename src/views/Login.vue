<template>
  <div class="mx-auto" style="max-width:400px;">
    <h1>Log ind</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Brugernavn:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          required
          placeholder="Indtast brugernavn"
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Indtast password"
        />
      </b-form-group>

      <b-button type="submit" variant="primary" align-h="end">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { AUTH_REQUEST } from "../store/actions/auth";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const { username, password } = this.form;
      this.$store
        .dispatch(AUTH_REQUEST, { username, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }
};
</script>
