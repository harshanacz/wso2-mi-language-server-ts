#!/bin/bash
# Type check generated files for real errors (unknown names, missing members) by dropping @ts-nocheck on a copy.
cd /home/claude/cloned/wso2-mi-language-server-ts
rm -rf /tmp/chk && mkdir -p /tmp/chk && cp -r src /tmp/chk/src && cp tsconfig.json /tmp/chk/ && ln -s $PWD/node_modules /tmp/chk/node_modules
find /tmp/chk/src -name '*.ts' -exec sed -i '1s,^// @ts-nocheck,//,' {} +
cd /tmp/chk
node -e '
const fs=require("fs");const t=JSON.parse(fs.readFileSync("tsconfig.json","utf8"));
t.compilerOptions=Object.assign(t.compilerOptions||{},{strict:false,noImplicitAny:false,strictNullChecks:false,noEmit:true,noUnusedLocals:false,skipLibCheck:true});
t.include=["src/**/*.ts"];delete t.exclude;fs.writeFileSync("tsconfig.json",JSON.stringify(t))'
npx tsc -p . 2>&1 | grep "error TS" | grep -E "${1:-.}" | sed 's/(\([0-9]*\),[0-9]*)/:\1/' 
