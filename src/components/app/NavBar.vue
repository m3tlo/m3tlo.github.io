<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="fa-solid fa-bars" style="color: #000000"></i>
        </a>
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
          {{name}} 
            <i class="fa-solid fa-caret-down fa-lg right"></i>
          </a>

          <ul id="dropdown" class="dropdown-content">
        
            <li class="divider" tabindex="-1"></li>
            <li>
              <a 
                href="#" 
                class="black-text"
                @click.prevent="logout"    
            >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'
export default {

    data: () => ({
        date: new Date(),
        interval: null,
        dropdown: null,
    }),
    methods: {
       async logout(){
            await this.$store.dispatch('logout')
            console.log('logout success')
            this.$router.push('/login?message=logout')
        }
    },
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    mounted() {
     this.interval = setInterval(() => {
            this.date = new Date
        }, 1000)
       this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth:false,
        })
    },
    beforeDestroy() {
        clearInterval(this.interval)
        if (this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
        }
    }
}
</script>
