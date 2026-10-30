#!/usr/bin/env python3
"""Rename fields that clash with same named methods (Java allows both) to _name; gson.ts maps _isX back to isX when serialising."""
import re,sys,glob
for p in glob.glob('/home/claude/cloned/wso2-mi-language-server-ts/src/synapse/**/*.ts', recursive=True):
    s=open(p).read(); o=s
    for m in re.finditer(r'^  (?:static )?(?:readonly )?(is[A-Z]\w*|update\w+)\??: [^;=]+(?: = [^;]+)?;', s, re.M):
        name=m.group(1)
        if re.search(r'^  '+name+r'\(', s, re.M):
            new='_'+name
            s=re.sub(r'^(  (?:static )?(?:readonly )?)'+name+r'(\??:)', r'\1'+new+r'\2', s, flags=re.M)
            s=re.sub(r'this\.'+name+r'\b(?!\()', 'this.'+new, s)
            print(p.split('synapse/')[1], name)
    if s!=o: open(p,'w').write(s)
