# 常青藤志愿服务后台

## Preview 预览

```
# stage environment
pnpm preview:stage

# prod environment
pnpm preview:prod
```

## Multi-environment packaging  多环境包装

```
# build the stage environment
pnpm build:stage

# build the prod environment
pnpm build:prod
```



## Code inspection 代码检查

```
# code formatting
pnpm lint

# unit test
pnpm test
```



## Git commit specification reference Git 提交规范参考

- `feat` add new functions
  `feat` 添加新函数
- `fix` Fix issues/bugs
  `fix` 修复问题/错误
- `perf` Optimize performance
  `perf` 优化性能
- `style` Change the code style without affecting the running result
  `style` 在不影响运行结果的情况下更改代码样式
- `refactor` Re-factor code `refactor` 重构代码
- `revert` Undo changes `revert` 撤消更改
- `test` Test related, does not involve changes to business code
  `test` 测试相关，不涉及业务代码的更改
- `docs` Documentation and Annotation
  `docs` 文档和注释
- `chore` Updating dependencies/modifying scaffolding configuration, etc.
  `chore` 更新依赖项/修改脚手架配置等。
- `workflow` Work flow Improvements
  `workflow` 工作流程改进
- `ci` CICD
- `types` Type definition
  `types` 类型定义
- `wip` In development `wip` 开发中

## 命名规范
组件大驼峰命名
页面横线命名
