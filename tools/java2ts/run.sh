#!/bin/bash
set -e
cd /home/claude/cloned/wso2-mi-language-server-ts
python3 /tmp/claude-0/-home-claude/50f936ba-2be0-5c9b-a139-3e8ff25e3d2b/scratchpad/j2t/j2t.py "$@" 2>&1 | grep -v "^ \|^$" | tail -8
:
python3 /tmp/claude-0/-home-claude/50f936ba-2be0-5c9b-a139-3e8ff25e3d2b/scratchpad/j2t/post_fixes.py
