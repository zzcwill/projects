#!/bin/bash
#本地mac-ssh-连接服务器

#$0: 脚本本身文件名称
#$1: 命令行第一个参数，$2为第二个，以此类推
#$*: 所有参数列表
#$@: 所有参数列表
#$#: 参数个数
#$$: 脚本运行时的PID
#$?: 脚本退出码

#-a: and
#-o: or

#-e filename 	如果 filename存在，则为真
#-d filename 	如果 filename为目录，则为真
#-f filename 	如果 filename为常规文件，则为真
#-L filename 	如果 filename为符号链接，则为真
#-r filename 	如果 filename可读，则为真
#-w filename 	如果 filename可写，则为真
#-x filename 	如果 filename可执行，则为真

#if then fi:如果是执行then
#if then else fi:如果是执行then,否者else
#if command 
# then
#　　command
#else
#　　if command
#　　then
#　　　　command
#　　fi
#fi

#case "$1" in
#za-web-pc | za-web-h5)
#    command
#    ;;
#za-web-risk）
#    command
#    ;;
#esac

DATE=`date +%Y%m%d`
TIME=`date +%Y%m%d%H%M%S`

#本地项目目录
Tfolder="/Users/zhengzhichao/Desktop"
#项目备份目录
BACKUP="/data/backup"
#阿里云公网ip
SLB_IP="47.110.42.110"
SLB_PORT1="22"

deploy_statc() {
  local ECS_PORT=$1
  local ADD=$2
	echo "backup $STATIC_PRO"
	ssh  -p $ECS_PORT root@$ADD "if [ -d $BACKUP/$STATIC_PRO$DATE ];then
                                mkdir -p $BACKUP/$STATIC_PRO$TIME
                                BACKUP_PATH=$BACKUP/$STATIC_PRO$TIME
                              else
                                mkdir -p  $BACKUP/$STATIC_PRO$DATE
                                BACKUP_PATH=$BACKUP/$STATIC_PRO$DATE
                              fi
                                mv /data/pro/$STATIC_PRO \$BACKUP_PATH
                              exit"

	echo "upload $STATIC_PRO"
	scp -P $ECS_PORT -r $Tfolder/$DATE/$STATIC_PRO root@$ADD:/data/pro/
}

case "$1" in
  za-web-pc|za-web-risk|za-web-h5)
    STATIC_PRO="$1"
    if [ "$1" == "za-web-pc" -o "$1" == "za-web-h5" ];then
      echo "$1"
    fi
        
    if [ "$1" == "za-web-risk" ];then
     deploy_statc $SLB_PORT1 $SLB_IP
    fi

    rm -rf $Tfolder/$DATE/"$1"
  ;;
  *)
		echo "Usage: $0  project-name"
		exit 2
  ;;
esac 

#返回0 成功
exit 0