<template>
  <form 
    class="card auth-card"
    @submit.prevent="submitHandler"
    >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input 
          id="email" 
          type="text" 
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">Email</label>
        <small 
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
        Это поле не должно быть пустым
        </small>
        <small 
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          Введите корректный email</small>
      </div>
      <div class="input-field">
        <input 
          id="password" 
          type="password" 
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        />
        <label for="password">Пароль</label>
        <small 
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
        Это поле не должно быть пустым
        </small>
        <small 
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
        Пароль должен состоять минимум из {{ $v.password.$params.minLength.min }} символов, сейчас {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="name" 
          type="text" 
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required
          }"      
        />
        <label for="name">Имя</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
        Это поле не должно быть пустым
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn  waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="fa-solid fa-share right"></i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'


export default {
  name: 'UserRegister', 
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8),},
    name: {required},
    agree: {checked: v => v},
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }
      try {
        await this.$store.dispatch('register', formData)
        console.log(formData)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
      
    },
  },
 async mounted() {
  await this.$store.dispatch('fetchInfo')

    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
}
</script>
