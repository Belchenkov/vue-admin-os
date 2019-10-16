export default {
  computed: {
    inProgress() {
      return this.$store.state.inProgress
    },

    isAuth() {
      return this.$store.state.isAuth
    },

    userProfile() {
      return this.$store.state.profile
    }
  }
}