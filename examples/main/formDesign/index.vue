<template>
    <div class="page-form-design">
        <el-container>
            <el-main>
                <el-container class="page-form-main">
                    <el-aside style="wdith: 250px;">
                        <div class="components-list">
                            <div class="widget-cate">基础字段</div>
                            <draggable tag="ul" :list="basicComponents"
                                :group="{ name: 'people', pull: 'clone', put: false }"
                                ghost-class="ghost"
                                :sortable="false"
                                @end="handleMoveEnd"
                                @start="handleMoveStart"
                                :move="handleMove"
                            >

                                <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
                                    <a>
                                    <i class="icon iconfont" :class="item.icon"></i>
                                    <span>{{item.name}}</span>
                                    </a>
                                </li>
                            </draggable>
                            <div class="widget-cate">高级字段</div>
                            <draggable
                                 tag="ul"
                                :list="advanceComponents"
                                :group="{ name: 'people', pull: 'clone', put: false }"
                                ghost-class="ghost"
                                :sortable="false"
                                @end="handleMoveEnd"
                                @start="handleMoveStart"
                                :move="handleMove"
                            >
                                <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
                                    <a>
                                    <i class="icon iconfont" :class="item.icon"></i>
                                    <span>{{item.name}}</span>
                                    </a>
                                </li>
                            </draggable>

                            <div class="widget-cate" >布局字段</div>
                            <draggable tag="ul" :list="layoutComponents"
                                :group="{ name: 'people', pull: 'clone', put: false }"
                                ghost-class="ghost"
                                :sortable="false"
                                @end="handleMoveEnd"
                                @start="handleMoveStart"
                                :move="handleMove"
                            >
                                <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
                                    <a>
                                    <i class="icon iconfont" :class="item.icon"></i>
                                    <span>{{item.name}}</span>
                                    </a>
                                </li>
                            </draggable>
                        </div>
                    </el-aside>
                    <el-container class="center-container" direction="vertical">
                        <el-header class="btn-bar" style="height: 45px;">
                            <el-button  type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
                            <el-button  type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
                            <el-button  type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">查看JSON</el-button>
                            <el-button  type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
                        </el-header>
                        <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
                            <widget-form  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
                        </el-main>
                    </el-container>
                    <el-aside class="widget-config-container">
                        <el-container>
                            <el-header height="45px">
                            <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
                            <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
                            </el-header>
                            <el-main class="config-content">
                                <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :config="widgetForm.config"></widget-config>
                                <form-config v-show="configTab=='form'" :data="widgetForm.config"></form-config>
                            </el-main>
                        </el-container>
                    </el-aside>
                </el-container>
            </el-main>
            <el-footer height="30px">power by aicai FE Teams</el-footer>
        </el-container>
        <ac-dialog
            :dialog="uploadVisible"
            @close="uploadVisible = false"
            @submit="handleUploadJson"
            ref="uploadJson"
            width="800px"
            form
        >
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </ac-dialog>
        <ac-dialog
            :dialog="jsonVisible"
            @close="jsonVisible = false"
            ref="jsonPreview"
            width="800px"
            center
            form
        >
          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
          <template slot="action">
            <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button>
          </template>
        </ac-dialog>
        <ac-dialog
            :dialog="codeVisible"
            @close="codeVisible = false"
            ref="codePreview"
            width="800px"
            form
            :action="false"
        >
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </ac-dialog>
        <ac-dialog
          :dialog="previewVisible"
          @close="previewVisible = false"
          ref="widgetPreview"
          @submit="handleTest"
          width="1000px"
          form
        >
          <ac-form insite="true" v-if="previewVisible" :data="widgetForm" :functions="functions" :dicts="dicts" ref="generateForm">
          </ac-form>
        </ac-dialog>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import Clipboard from 'clipboard'
import { basicComponents, layoutComponents, advanceComponents } from './componentsConfig.js'
import { loadJs, loadCss, generateCode } from './config.js'
import widgetForm from './widgetForm.vue'
import FormConfig from './formConfig'
import WidgetConfig from './widgetConfig'
export default {
    name: 'AcFormDesign',
    components: {
        Draggable,
        widgetForm,
        FormConfig,
        WidgetConfig
    },
    data() {
        return {
            basicComponents,
            layoutComponents,
            advanceComponents,
            jsonEg: `{"list": []}`,
            uploadVisible: false,
            jsonTemplate: '',
            jsonVisible: false,
            htmlTemplate: '',
            codeVisible: false,
            previewVisible: false,
            widgetForm: {
                list: [
                ],
                config: {
                    labelWidth: 100,
                    labelPosition: 'left',
                    size: 'small',
                    isTab: false
                }
            },
            functions: {},
            dicts: {},
            configTab: 'widget',
            widgetFormSelect: {}
        }
    },
    mounted() {
        loadJs('libs/ace/src-min/ace.js')
    },
    methods: {
        // 拖拽事件
        handleMoveStart() {
        },
        handleMoveEnd() {
        },
        handleMove() {
            return true
        },
        // header 事件
        handleUpload() {
            this.uploadVisible = true
            this.$nextTick(() => {
                this.uploadEditor = ace.edit('uploadeditor')
                this.uploadEditor.session.setMode('ace/mode/json')
            })
        },
        handleUploadJson() {
            try {
                this.setJSON(JSON.parse(this.uploadEditor.getValue()))
                this.uploadVisible = false
            } catch (e) {
                this.$message.error(e.message)
                this.$refs.uploadJson.end()
            }
        },
        setJSON(json) {
            if (json.list.length > 0) {
                this.widgetForm = json
                this.widgetFormSelect = json.list[0]
            }
        },
        handlePreview() {
            this.previewVisible = true
        },
        handleTest() {
            this.$refs.generateForm.getData().then(data => {
                this.$alert(data, '').catch(e => {})
                this.$refs.widgetPreview.end()
            }).catch(e => {
                this.$refs.widgetPreview.end()
            })
        },
        handleGenerateJson() {
            this.jsonVisible = true
            this.jsonTemplate = this.widgetForm
            this.$nextTick(() => {
                const editor = ace.edit('jsoneditor')
                editor.session.setMode('ace/mode/json')
                const btnCopy = new Clipboard('#copybtn')
            })
        },
        handleGenerateCode() {
            this.codeVisible = true
            this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
            this.$nextTick(() => {
                const editor = ace.edit('codeeditor')
                editor.session.setMode('ace/mode/html')
            })
        },
        // 右侧 widget 点击事件
        handleConfigSelect(config) {
            this.configTab = config
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/styles/normalize.css';
@import '../../assets/styles/design.scss';
.page-form-design {
    box-sizing: border-box;
    height: 100%;
    padding-top: 50px;
}
</style>
