<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4>
        <v-toolbar class="primary">
          <v-toolbar-title class="white--text">Login to control panel</v-toolbar-title>
        </v-toolbar>
        <v-card class="v-card--with-header">
          <v-card-text class="pt-4">
            <div>
              <v-form v-model="valid" ref="formLogin">
                <v-text-field
                    label="Enter your e-mail address"
                    v-model="email"
                    :rules="emailRules"
                    :error-messages="errors.auth"
                    required
                ></v-text-field>
                <v-text-field
                    label="Enter your password"
                    v-model="password"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    @click:append="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    counter
                    required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn @click="submit" class="bth-shadow" depressed color="primary">Войти</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        e1: true,
        password: '',
        passwordRules: [
          (v) => !!v || 'Password is required',
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        errors: {
          auth: ''
        }
      }
    },
    methods: {
      async submit() {
        if (this.$refs.formLogin.validate()) {
          this.errors = {}
          let response = await this.$apiAuth.login(this.email, this.password)

          if (!response.result) {
            console.log('ERROR!')
            this.errors.auth = 'Пользователь с таким логином и паролем не наиден!'
            this.$forceUpdate()
          } else
            this.$router.push({name: 'dashboard'})
        }
      },
      clear() {
        this.$refs.form.reset()
      }
    }
  }
</script>
