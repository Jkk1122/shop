<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageno',pageNo-1)">上一页</button>
    <button v-if="continuesNumStartEnd.start > 1" @click="$emit('getPageno',1)" :class="{active:pageNo ==1}">1</button>
    <button v-if="continuesNumStartEnd.start > 2" >···</button>
    <template v-if="continuesNumStartEnd.end">
      <button v-for="(btn,index) in continuesNumStartEnd.end" :key="index" v-show=" btn >= continuesNumStartEnd.start" @click="$emit('getPageno',btn)" :class="{active:pageNo == btn}">{{ btn }}</button>
    </template>
    <button v-if="continuesNumStartEnd.end < totalPage - 1">···</button>
    <button v-if="continuesNumStartEnd.end < totalPage" :class="{active:pageNo == totalPage}" @click="$emit('getPageno',totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageno',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>
<script>
  export default {
    name: "Pagination",
    // pageNo 当前页 pageSize每页展示数量 total整个分页展示的数据 continues：代表分页连续的页码
    props:['pageNo','pageSize','total','continues'],
    computed:{
      // 计算多少页
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      // 计算连续页码的起始数字和结束数字
      continuesNumStartEnd(){
        const {total,pageSize,pageNo,continues} = this;

        let start = 0,end = 0
        // 不正常情况
        if(total < continues){
          start = 1
          end = this.totalPage
        }else{
          // 正常情况
          // 计算起始页码
          start = pageNo - parseInt(continues/2)
          // 计算结束页码
          end = pageNo + parseInt(continues/2)
          // 不正常情况，【start为负数，为零】
          if(start < 1){
            start = 1
            end = continues
          }
          // 不正常情况，【end溢出，即end的值大于最大的页数】
          if(end > this.totalPage){
            end =  this.totalPage
            start = end - continues + 1
          }
        }
        // console.log(start+','+end);
        return {start,end}
      }
    }
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: pink;
      color: #fff;

    }
  }
}
</style>