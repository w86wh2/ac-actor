import Vue from 'vue'
import {
    Form,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Dialog,
    FormItem,
    Input,
    Select,
    Option,
    Alert,
    Tooltip,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Scrollbar,
    Row,
    Col,
    Popover,
    Tree,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioButton,
    RadioGroup,
    Message,
    MessageBox,
    Container,
    Main,
    Aside,
    Header,
    Footer,
    Loading,
    InputNumber,
    Switch,
    Tabs,
    TabPane,
    Upload,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination
} from 'element-ui'

Vue.use(Container)
Vue.use(Loading)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Form)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Alert)
Vue.use(Tooltip)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Scrollbar)
Vue.use(ButtonGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Popover)
Vue.use(Tree)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Upload)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
