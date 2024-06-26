
#!/bin/bash
# test部署
# sh /home/yytj-shop/sh/test.sh

cd /home/yytj-shop
pm2 delete all
pnpm test


