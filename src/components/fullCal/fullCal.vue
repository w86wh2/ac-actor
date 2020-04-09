<template>
<div class="hello">
    <vue-cal
      default-view="week"
      v-bind='config'
      :events="events"
      :on-event-click="onEventClick"
      @ready='viewChange'
      @view-change='viewChange'
      @cell-dblclick='cellDbclick'
      @event-duration-change="eventDurationChange"
      @event-title-change="eventTitleChange"
      small
    >
    </vue-cal>
  </div>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/zh-cn.js'
import 'vue-cal/dist/vuecal.css'
export default {
    name: 'AcFullCal',
    components: { VueCal },
    data() {
        return {
            config: {
                locale: 'zh-cn',
                disableViews: ['years', 'year'],
                eventsOnMonthView: 'short', // 在月份上简短显示任务
                timeFrom: 8 * 60,
                timeTo: 19 * 60,
                timeStep: 30,
                selectedDate: '2018-11-19',
                cellClickHold: false, // 阻止点击默认事件
                editableEvents: true // 允许编辑任务
            },
            events: [
                {
                    start: '2018-11-20 14:00',
                    end: '2018-11-20 18:00',
                    title: '购物',
                    icon: 'shopping_cart', // Custom attribute.
                    content: '需要去商场购物',
                    // contentFull: 'My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.
                    class: 'leisure',
                    resizable: false // 不能改时间
                },
                {
                    start: '2018-11-22 10:00',
                    end: '2018-11-22 15:00',
                    title: '送礼',
                    icon: 'golf_course', // Custom attribute.
                    content: '去约翰家送礼',
                    // contentFull: 'Okay.<br>It will be a 18 hole golf course.', // Custom attribute.
                    class: 'sport',
                    deletable: true
                }
            ]
        }
    },
    methods: {
        viewChange(e) {
            console.log(e)
        },
        onEventClick(e) {
            this.$emit('onEventClick', e)
        },
        cellDbclick(e) {
            console.log(e)
        },
        eventDurationChange(e) {
            console.log(e)
        },
        eventTitleChange(e) {
            console.log(e)
        }
    }
}
</script>
<style lang="scss">
.vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
.vuecal__menu button {border-bottom-color: #fff;color: #fff;}
.vuecal__menu button.active {background-color: rgba(255, 255, 255, 0.15);}
.vuecal__title-bar {background-color: #e4f5ef;}
.vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
.vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
.vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
.vuecal__cell.disabled {text-decoration: line-through;}
.vuecal__cell.disabled.before-min {color: #b6d6c7;}
.vuecal__cell.disabled.after-max {color: #008b8b;}
// event
.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
// month
.vuecal--month-view .vuecal__cell {height: 80px;}
.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}
.vuecal--month-view .vuecal__cell-date {padding: 4px;}
.vuecal--month-view .vuecal__no-event {display: none;}

</style>
