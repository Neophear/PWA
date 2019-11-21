<template>
  <div class="mx-auto" style="max-width:400px;">
    <h1>Log ind</h1>
    <b-alert
      variant="danger"
      fade
      :show="dismissCountDown"
      @dismissed="dismissCountDown = 0"
      >{{ msg }}</b-alert
    >
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
      msg: "",
      dismissCountDown: 0,
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
          if (!err.response) this.msg = "Network error.";
          else if (err.response.status === 401)
            this.msg = "Wrong username or password.";
          this.dismissCountDown = 10;
        });
    }
  }
};
</script>
