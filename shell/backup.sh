#!/bin/bash

#备份mongodb数据
#shell-mongodb-demo

#保存目录
backUpFolder=/home/db/data
#保存时间
data_now=`date +%Y_%m_%d_%H%M` 
#备份临时目录
backFileName=data_$data_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1 -d dbname -o $backFileName
tar zcvf $backFileName.tar.gz $backFileName
rm -rf $backFileName