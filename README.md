# Monorepo Template

基于 Lerna8 + Pnpm workspace 的 Monorepo 仓库模板。

## Scripts

### `pnpm new:pkg [name]` (Local)

创建子包。

`name`, 子包目录名。

### `pnpm ci:version` (CI)

创建 version。

此命令将会执行以下操作：

- 同步更改仓库中所有包的版本号
- 根据 Commit history 自动更新 CHANGELOG.md 文件
- 创建 Github Release

### `pnpm ci:publish` (CI)

发布 npm 版本。

根据 package.json 中的版本号和 npm 中的版本进行对比，如有更新即发布，反之跳过。
