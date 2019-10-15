<template>
  <div class="listleft">
    <div class="listtop">预约</div>
    <div class="leftlistbox">
      <ul>
        <li :class="{activeli:ind==0}" @click="tab(0,'/orderIndex')">个人预约</li>
        <li :class="{activeli:ind==1}" @click="tab(1,'/orderTeam')">团体预约</li>
        <li :class="{activeli:ind==2}" @click="tab(2,'/orderQuery')">预约查询</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LeftSlide",
    data() {
      return {
        ind: 0
      }
    },
    watch: {
      '$route': {
        handler(val) {
          // console.log(val)
          if (val.meta.cur||val.meta.cur==0) {
            this.ind = val.meta.cur;
          } else {
            this.ind = val.query.isteam
          }
        },
        immediate: true
      }
    },
    methods: {
      tab(index, path) {
        this.ind = index;
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped lang="scss">
  .listleft {
    width: 268px;
    float: left;

    .listtop {
      width: 268px;
      height: 50px;
      float: left;
      background-color: #083A8D;
      /*background-image: url(../images/blue.jpg);*/
      background-repeat: repeat;
      color: #FFFFFF;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
    }

    .leftlistbox {
      min-height: 614px;
      width: 268px;
      float: left;

      ul {
        width: 206px;
        margin: 10px auto;

        li {
          line-height: 38px;
          color: #fff;
          background-color: #AD3938;
          text-align: center;
          font-size: 14px;
          margin-bottom: 22px;
          cursor: pointer;
          transition: ease-in-out .3s;

          &:hover {
            background-color: #083a8d;
          }

          &.activeli {
            background-color: #083a8d;
          }
        }
      }
    }
  }
</style>
