<template>
  <div id="app" class="nybox">
    <LeftSlide/>
    <div class="nyright">
      <div class="nyrmbox">
        <div class="nyrighttop">
          <div class="nyrighttopl">当前位置：<a href="http://www.ahczww.com/">首页</a>&nbsp;&gt;&nbsp;<a
            href="http://www.ahczww.com/order">预约</a></div>
        </div>
        <div class="nyrightnrbox">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftSlide from '@/components/LeftSlide'

  export default {
    name: 'App',
    components: {
      LeftSlide
    },
    created() {
      localStorage.removeItem('teamsubmit');
      localStorage.removeItem('submit');
    }
  }
</script>

<style scoped lang="scss">
  .nybox {
    width: 1127px;
    margin: 20px auto;
    background-image: url(./assets/imgs/nybj.png);
    background-repeat: no-repeat;
    background-position: left bottom;
    overflow: hidden;
    font-size: 12px;
  }

  .nyright {
    width: 840px;
    margin-left: 19px;
    float: left;
    background-image: url(./assets/imgs/ny_right_top.jpg);
    background-repeat: no-repeat;
    overflow: hidden;

    .nyrmbox {
      background-image: url(./assets/imgs/ny_right_center.jpg);
      margin-top: 10px;

      .nyrighttop {
        height: 50px;
        background-image: url(./assets/imgs/ny_right_btbg.gif);
        background-position: center;
        background-repeat: no-repeat;
        line-height: 50px;
        padding-left: 30px;

        .nyrighttopl {
          margin-left: 50px;

          a {
            color: #9f6f22;
          }
        }
      }

      .nyrightnrbox {
        padding: 0 30px;
        min-height: 604px;
        background-image: url(./assets/imgs/ny_right_foot.jpg);
        background-position: bottom;
        background-repeat: no-repeat;
        overflow: hidden;
      }
    }
  }

</style>
