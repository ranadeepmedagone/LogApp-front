<!-- <template>
  <div class="js-sidebar1 sidebar1__meetings">
    <div class="sidebar1__top">
      <button @click="closeMenu" class="sidebar1__close js-sidebar1-close">
        <svg class="icon icon-close">
          <use xlink:href="@/assets/theme/img/sprite.svg#icon-close"></use>
        </svg></button
      ><a class="sidebar1__logo" href=""
        ><img class="header__pic header__pic_black" src="@/assets/images/branding/logo-horizontal-colour.svg" alt=""
      /></a>
    </div>
    <div class="sidebar1__wrapper">
      
      <div class="sidebar1__group">
        <div class="sidebar1__body">
          <div class="sidebar1__item">
            <div class="sidebar1__link sidebar1__link__date" href="#">
              <div class="sidebar1__status"></div>
              <div class="sidebar1__text">Filter by Date</div>
              <el-date-picker
                v-model="filterDate.from_date"
                type="date"
                placeholder="From date"
                :picker-options="pickerOptions"
                size="small"
              >
              </el-date-picker>
              <span>To</span>
              <el-date-picker v-model="filterDate.to_date" type="date" placeholder="To date" :picker-options="pickerOptions" size="small">
              </el-date-picker>
              <span class="date__error" v-if="error">{{ error }}</span>
              <el-button class="date__submit" size="small" type="primary" plain @click="filterByDate">Filter by Date </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { NPermission } from '~/store'

export default {
  data() {
    return {
      error: '',
      pickerOptions: {
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
    },

    filterByDate() {
      this.error = ''
      if (!this.filterDate.from_date && !this.filterDate.to_date) {
        this.error = 'Enter at least one value'
        return
      }
      if (this.filterDate.from_date > this.filterDate.to_date) {
        this.error = 'From date cannot be greater than To date'
        return
      }
      this.$emit('filterByDate', this.filterDate)
    },
  },

  computed: {
    ...mapGetters(['hasPermission']),
    canCreate() {
      return this.hasPermission(NPermission.opinionpoll_create)
    },

    linkComponent() {
      return this.canCreate ? 'nuxt-link' : 'div'
    },
  },

  props: {
    filterDate: {
      type: Object,
      required: true,
    },
  },
  watch: {},
}
</script>

<style lang="scss">
.sidebar1__logo {
  img {
    max-width: 100%;
  }
}

.sidebar1__head {
  button {
    margin-left: 15px;
  }
}

.sidebar1__link.category {
  cursor: pointer;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
  }

  > button {
    margin-left: 10px;
  }

  &:hover,
  &.active {
    background-color: lightcyan;
  }
}

.sidebar1__meetings {
  position: fixed;
  top: 70px;
  left: 0;
  bottom: 0;
  width: 275px;
  padding-bottom: 70px;
  background: #fafafb;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
  transition: width 0.25s, transform 0.25s;

  .sidebar1__top {
    display: none;
  }
}

.date__error {
  margin-top: 6px !important;
  margin-bottom: 0px !important;
  color: $--color-danger;
  font-size: 12px;
}

.date__submit {
  margin-top: 8px;
}

.sidebar1__link__date {
  flex-direction: column;
  height: auto !important;

  > span {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .sidebar1__text {
    margin-bottom: 8px;
  }

  padding-bottom: 8px !important;
}

.sidebar1__head {
  &::before {
    display: none;
  }
}
</style> -->