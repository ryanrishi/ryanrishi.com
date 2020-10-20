---
layout: post
title:  Removing Large Files from Git History
date:   2019-12-29
tags:
  - terraform
  - git
---

```sh
➜  devops git:(master) git push --set-upstream origin master
Enumerating objects: 44, done.
Counting objects: 100% (44/44), done.
Delta compression using up to 12 threads
Compressing objects: 100% (42/42), done.
Writing objects: 100% (44/44), 34.15 MiB | 906.00 KiB/s, done.
Total 44 (delta 10), reused 0 (delta 0)
remote: Resolving deltas: 100% (10/10), done.
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: 54dea6924dfbd053e01852868cbe7ab6
remote: error: See http://git.io/iEPt8g for more information.
remote: error: File .terraform/plugins/darwin_amd64/terraform-provider-aws_v2.43.0_x4 is 157.62 MB; this exceeds GitHub's file size limit of 100.00 MB
To github.com:ryanrishi/devops.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'git@github.com:ryanrishi/devops.git'
```

```sh
git filter-branch --index-filter 'git rm -r -q --cached --ignore-unmatch .terraform/plugins/darwin_amd64/terraform-provider-aws_v2.43.0_x4' --prune-empty --tag-name-filter cat -- --all
```
https://rtyley.github.io/bfg-repo-cleaner/

https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository
