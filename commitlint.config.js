module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            'build', // 修改构建系统(例如 gulp，webpack，rollup 的配置等)的提交
            'ci', // 修改继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
            'docs', // 文档更新，比如README, CHANGELOG, CONTRIBUTE等等
            'feat', // 新增功能
            'fix', // 修复bug
            'merge', // Merge branch ? of ?.
            'perf', // 优化相关，比如提升性能、体验
            'refactor', // 代码重构，没有加新功能或者修复bug
            'revert', // 回滚到上一个版本
            'style', // 仅仅修改了空格、格式缩进、都好等等，不改变代码逻辑
            'test', // 测试用例，包括单元测试、集成测试等
            'chore' // 不属于以上类型的其他类型
        ]]
    }
}
