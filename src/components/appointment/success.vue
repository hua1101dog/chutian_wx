<template>
    <div>
      <div class="logo"><img :src="require('../../assets/icons/visitors_pic_successful.png')" alt=""></div>
      <h2>提交成功,请等待运营方审核</h2>
    </div>
</template>

<script>
    export default {
        name: "success"
    }
</script>

<style scoped>
  .logo{
    text-align: center;
    margin-top: 60px;
  }
  h2{
    text-align: center;
  }
</style>
