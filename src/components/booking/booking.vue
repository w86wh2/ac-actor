<template>
    <div class="booking-room__page">
      <div class='toolbar'>
        <el-form ref="form" label-width="1px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="">
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  size='mini'
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" >
              <div class='tc'>{{title}}</div>
            </el-col>
          </el-row>

        </el-form>

      </div>
      <div class='booking-room'>
         <div class='header'>
            <div class='leftBar'>表头</div>
            <div class='x_data'>
              <div v-for='(item, key) in x_data' :key='item' :class=" momentDate === item  ? 'item active' : 'item'">
                {{item}}
                <div>
                  {{weeks[key]}}
                </div>
                </div>
            </div>
          </div>
          <div class='classContainer' id='actionArea'>
            <div class='y_data_item' v-for='item in y_data' :key='item'>
            <div class='leftBar'>
              {{item}}
            </div>
            <div class='x_data'>
              <div v-for='x_item in x_data' :key='x_item' class='item'></div>
            </div>
          </div>
          <div class='mark' v-for ='(item, key) in classList' :key='key'
          :style='transStyle(item)'
          >
            {{item.className}}
            {{item.startTime}}
          </div>
          </div>

      </div>

    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'AcBooking',
    props: {
        classList: {
            type: Array,
            default() { return [] }
        },
        originDate: {
            default() { return null }
        }
    },
    data() {
        return {
            startDate: new Date(),
            // 纵坐标从几点开始 几点结束
            y_start: 8,
            y_end: 21,
            // 每个格子高度
            w: 13, // 百分比
            h: 27, // px
            weeks: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
        }
    },
    computed: {
        // 获取x 轴
        x_data() {
            let weekOfday = parseInt(moment(this.startDate).format('E'))
            let dataArr = []
            for (let i = 0; i < 7; i++) {
                dataArr.push(`${moment(this.startDate).subtract(weekOfday - 1 - i, 'days').format('YYYY-MM-DD')}`)
            }
            return dataArr
        },
        // 容器单位宽 每天所占容器的宽度
        // 容器单位高
        // 获取y轴
        y_data() {
            let dataY = []
            for (let i = this.y_start; i < this.y_end; i++) {
                dataY.push(`${i}:00`)
                dataY.push(`${i}:30`)
            }
            dataY.push(`${this.y_end}:00`)
            return dataY
        },
        momentDate() {
            return moment(this.startDate).format('YYYY-MM-DD')
        },
        title() {
            if (this.x_data.length) {
                return `${this.x_data[0]}至${this.x_data[6]}`
            }
            return ''
        }
    },
    methods: {
        transStyle(item) {
            const date = moment(new Date(item.startTime))
            const week = parseInt(date.format('E'))
            const h = parseInt(date.format('HH'))
            const m = parseInt(date.format('mm'))
            return `
            height: ${(item.lessonTime / 30) * this.h}px;
            width: 13%;
            left: ${9 + (week - 1) * this.w}%;
            top: ${(h - this.y_start + m / 60) * 2 * this.h}px
            `
        }

    }
}
</script>
<style lang="scss">
.booking-room__page {

  //
  .tc {
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
  }
  .booking-room {
    .leftBar {
      flex-basis: 9%;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    .header {
      position: sticky;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      .leftBar {
        border-top: 1px solid #ddd;
      }
      .x_data {
        display: flex;
        align-items: center;
        width: 91%;
        justify-content: space-around;
        .item {
          flex:1;
          text-align: center;
          border: 1px solid #ddd;
          border-right: 1px solid transparent;
          &.active {
            background: pink
          }
        }

      }
    }
    .y_data_item {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      .leftBar {
        height: 25px;
        line-height: 25px;
        border-top:1px solid transparent;
      }
      .x_data {
        display: flex;
        align-items: center;
        width: 91%;
        justify-content: space-around;
        .item {
          flex:1;
           height: 25px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #ddd;
          border-top:1px solid transparent;
          border-right: 1px solid transparent;
        }
      }
      &:nth-child(2n) .item, &:nth-child(2n) .leftBar {
        border-bottom: 1px dashed #ddd;
      }
    }
    .classContainer {
      position: relative;
    }
    .mark {
      position: absolute;
      background: yellow
    }
  }
}
</style>
