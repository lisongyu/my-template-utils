#!/usr/bin/env zx
import pkg from "../package.json"
import inquirer from "inquirer"
import path from "path"
import fs from "fs"
import { $ } from "zx"
const version = pkg.version
const reg = /([1-9])\.([0-9])\.([0-9])(?:(\-\w*)\.([1-9]+))?/g
const execs = reg.exec(version) as Array<any>
const addOne = num => Number(num) + 1
const getVersion = ([major, minor, patch]) => `v${major}.${minor}.${patch}`
const getVersionlists = () => [
  getVersion([addOne(execs[1]), execs[2], execs[3]]),
  getVersion([execs[1], addOne(execs[2]), execs[3]]),
  getVersion([execs[1], execs[2], addOne(execs[3])])
]

const getBetaVersionLists = beta => [
  getVersion([execs[1], execs[2], execs[3]]),
  getVersion([execs[1], execs[2], execs[3]]) + `${beta}.${addOne(execs[5])}`
]

const onSelectVersion = async () => {
  const beta: any = execs[4]
  const lists = beta ? getBetaVersionLists(beta) : getVersionlists()
  inquirer
    .prompt([
      {
        name: "list",
        type: "list",
        message: "请选择发布的版本:",
        choices: lists,
        default: [lists[0]]
      }
    ])
    .then(async ({ list }) => {
      pkg.version = list
      let branch = await $`git branch`
      const { stdout } = branch
      const reg = /\*\D(.+)\D/g
      branch = (reg.exec(stdout) as any[])[1]
      fs.writeFile(
        path.join(__dirname, "../package.json"),
        String(JSON.stringify(pkg)),
        "utf8",
        async error => {
          if (error) {
            return
          }
          await $`git add .`
          await $`git commit -m ${list}`
          await $`git tag ${list}`
          await $`git push origin ${list}`
          await $`git push origin ${branch}`
          await $`npm run build&&npm publish`
        }
      )
    })
}
onSelectVersion()
