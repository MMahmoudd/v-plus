import store from '../store/store'
import { mapState } from 'vuex'

const mixins = {
     store: store,
     data () {
         return {
             userWithPermissions: [],
         }
     },
     computed: {
          ...mapState({
               userData: state => state.login.userData,
          }),
     },
     methods: {
         can: (modelName) => {
             const { read, update, delete: remove, add, approval } = JSON.parse(localStorage.getItem('userPermissions'))[modelName]
             return ({ read, update, remove, add, approval })
            //  return read
         },
     },
     watch: {
          userData: {
              handler () {
                  if (this.userData && this.userData.id) {
                    //    console.log(this.userData)
                    //   this.userWithPermissions = this.userData.permissions;
                  }
              },
              immediate: true,
          },
      },
}

export default mixins
