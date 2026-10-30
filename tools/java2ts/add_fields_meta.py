#!/usr/bin/env python3
"""Adds `static readonly __fields` (Java declared instance fields, minus transient) to generated classes so Gson style serialisation can keep the Java field order."""
import re, glob, os
ROOT='/home/claude/cloned/wso2-mi-language-server-ts/src/'
JAVA='/home/claude/cloned/mi-language-server/org.eclipse.lemminx/src/main/java/'
n=0
for p in glob.glob(ROOT+'synapse/**/*.ts',recursive=True)+glob.glob(ROOT+'syntaxTree/pojo/**/*.ts',recursive=True):
    s=open(p).read()
    m=re.search(r'// Generated from (\S+\.java)',s)
    if not m: continue
    if '__fields' in s: continue
    jp=JAVA+m.group(1)
    transient=set()
    if os.path.exists(jp):
        js=open(jp).read()
        transient=set(re.findall(r'\btransient\s+[\w<>\[\], ?.]+?\s+(\w+)\s*[;=]',js))
    for cm in re.finditer(r'^export (?:abstract )?class (\w+)[^{\n]*\{\n',s,re.M):
        start=cm.end()
        # class body ends at the next top level "}" line
        end=s.find('\n}\n',start)
        body=s[start:end if end>0 else len(s)]
        names=[]
        for fm in re.finditer(r'^  (?:readonly )?(\w+)[?!]?: ',body,re.M):
            names.append(fm.group(1))
        # drop static members and anything with a static prefix is excluded by the regex (starts with 'static')
        names=[x for x in names if x not in transient and x!='constructor']
        decl='  static readonly __fields: string[] = %s;\n\n' % ('['+', '.join('"%s"'%x for x in names)+']')
        s=s[:start]+decl+s[start:]
        n+=1
        break
    open(p,'w').write(s)
print("classes annotated:",n)
