<template>
  <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover" @visible-change="visableChange">
    <div class="avatar-wrapper">
      <img v-if="avatar" :src="prefix + avatar" class="user-avatar" />
      <img v-else src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar" />
      <span class="user-name">{{ name ? name : "admin" }}</span>
      <el-icon class="icon" v-if="visiable"><ArrowDown /></el-icon>
      <el-icon class="icon" v-else><ArrowUp /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/user/admin">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display: block" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
export default defineComponent({
  name: "Avatar",
  data() {
    return {
      visiable: true,
    };
  },
  setup() {
    const app = useAppStore();
    const user = useUserStore();

    const prefix = app.$state.prefix;
    const avatar = user.$state.avatar;
    const name = user.$state.name;
    return {
      prefix,
      avatar,
      name,
    };
  },
  methods: {
    async logout() {
      console.log("退出登录");
    },
    visableChange(callback: boolean) {
      this.visiable = !callback;
    },
  },
});
</script>

<style lang="scss" scoped>
.avatar-container {
  margin: 0 20px;

  .avatar-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .user-name {
      margin-left: 5px;
    }
  }
}
</style>
