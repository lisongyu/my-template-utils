module.exports = {
  // 采用 cz 自定义的提交规范, > .cz-config.js
  extends: ["cz"],
  rules: {
    // type 类型定义，表示 git 提交的type 必须在一下类型范围内
    // 参数一：表示当前验证的错误级别，参数二：表示在什么情况下验证，参数三：【】泛型内容
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "build"
      ]
    ],
    // subject 大小写不做校验
    "subject-case": [0]
  }
}
