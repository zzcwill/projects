#!/bin/bash

DATE=`date +%Y%m%d`
TIME=`date +%Y%m%d%H%M%S`

Tfolder="/data/pro"
BACKUP="/data/backup"

SLB_IP="101.37.72.118"
SLB_PORT1="5001"
SLB_PORT2="5002"
SLB_PORT3="5003"
SLB_PORT4="5004"
SLB_PORT5="5005"
SLB_PORT6="5006"

SLB_PORT11_PRE_WEB2="5011"
SLB_PORT12_PRE_SERVICE2="5012"

zhenan_web1="10.253.107.127"
zhenan_web2="10.253.144.116"
zhenan_web3="10.253.144.55"
zhenan_web4="10.253.144.45"
zhenan_web5="10.253.144.75"
zhenan_web6="10.253.101.50"

pre_web2="10.253.79.149"
pre_service2="10.253.79.195"

mid_web01="10.253.210.199"
mid_web02="10.253.210.189"
mid_service01="10.253.210.197"
mid_service02="10.253.119.63"
pub_reg="10.253.168.61"
cuishou="120.55.52.195"
contract1="10.253.78.157"
contract2="10.253.78.132"


deploy_proj()
{
local ECS_PORT=$1
#local ADD=$2
ADD=$SLB_IP
echo "backup $CLS_PRO"
ssh -p $ECS_PORT root@$ADD "if [ -d $BACKUP/$CLS_PRO$DATE ];then
                     mkdir -p $BACKUP/$CLS_PRO$TIME
                     BACKUP_PATH=$BACKUP/$CLS_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$CLS_PRO$DATE
                     BACKUP_PATH=$BACKUP/$CLS_PRO$DATE
                   fi
                
                  if [ $MODEL -eq 0 ];then
                    mv /usr/local/tomcat/tomcat-$CLS_PRO/webapps/ROOT \$BACKUP_PATH
                  fi
                  if [ $MODEL -eq 1 ];then
                    cd /usr/local/dubbo-services/$CLS_PRO
                    mv conf/ lib/ \$BACKUP_PATH
                   fi
                   exit"

echo "upload $CLS_PRO"
if [ $MODEL -eq 0 ];then
scp -P$ECS_PORT -r  $Tfolder/$DATE/$P_PRO root@$ADD:/usr/local/tomcat/tomcat-$CLS_PRO/webapps/ROOT
fi

if [ $MODEL -eq 1 ];then
scp -P$ECS_PORT -r  $Tfolder/$DATE/$P_PRO/conf $Tfolder/$DATE/$P_PRO/lib root@$ADD:/usr/local/dubbo-services/$CLS_PRO
fi

echo "reboot $CLS_PRO"

ssh -p $ECS_PORT root@$ADD "if [ $MODEL -eq 0 ];then
                 ps  -ef|grep tomcat-$CLS_PRO|grep -v 'grep'|awk '{print \$2}'|xargs kill -9
                 source /etc/profile;cd /usr/local/tomcat/tomcat-$CLS_PRO/bin/;./startup.sh
                  fi
                    if [ $MODEL -eq 1 ];then
                    cd /usr/local/dubbo-services/$CLS_PRO/sbin 2>\&1>/dev/null
                    if [ \$? -ne 0 ];then
                    cd /usr/local/dubbo-services/$CLS_PRO/bin
                    fi
                    source /etc/profile;./stop.sh skip;./start.sh
                   fi
                   exit"


}


deploy_mid()
{
local ADD=$1

echo "backup $CLS_PRO"
ssh  root@$ADD "if [ -d $BACKUP/$CLS_PRO$DATE ];then
                     mkdir -p $BACKUP/$CLS_PRO$TIME
                     BACKUP_PATH=$BACKUP/$CLS_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$CLS_PRO$DATE
                     BACKUP_PATH=$BACKUP/$CLS_PRO$DATE
                   fi
                    mv /usr/local/applications/mid-$PRO_FOLDER/$CLS_PRO.jar \$BACKUP_PATH
                   exit"

echo "upload $CLS_PRO"
scp $Tfolder/$DATE/$CLS_PRO.jar root@$ADD:/usr/local/applications/mid-$PRO_FOLDER/
echo "reboot $CLS_PRO"

ssh  root@$ADD "source /etc/profile;cd /usr/local/applications/mid-$PRO_FOLDER/;sh ./run.sh stop;sh ./run.sh start"


} 

deploy_jar()
{
local ADD=$1

echo "backup $CLS_PRO"
ssh  root@$ADD "if [ -d $BACKUP/$CLS_PRO$DATE ];then
                     mkdir -p $BACKUP/$CLS_PRO$TIME
                     BACKUP_PATH=$BACKUP/$CLS_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$CLS_PRO$DATE
                     BACKUP_PATH=$BACKUP/$CLS_PRO$DATE
                   fi
                    mv /usr/local/applications/$PRO_FOLDER/$CLS_PRO.jar \$BACKUP_PATH
                   exit"

echo "upload $CLS_PRO"
scp $Tfolder/$DATE/$CLS_PRO.jar root@$ADD:/usr/local/applications/$PRO_FOLDER/
echo "reboot $CLS_PRO"

ssh  root@$ADD "source /etc/profile;cd /usr/local/applications/$PRO_FOLDER/;sh ./run.sh stop;sh ./run.sh start"


}


deploy_2jar()
{
local ECS_PORT=$1
#local ADD=$2
ADD=$SLB_IP
echo "backup $CLS_PRO"
ssh -p $ECS_PORT root@$ADD "if [ -d $BACKUP/$CLS_PRO$DATE ];then
                     mkdir -p $BACKUP/$CLS_PRO$TIME
                     BACKUP_PATH=$BACKUP/$CLS_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$CLS_PRO$DATE
                     BACKUP_PATH=$BACKUP/$CLS_PRO$DATE
                   fi

                    mv /usr/local/dubbo-services/$PRO_FOLDER/$CLS_PRO.jar \$BACKUP_PATH
                   exit"

echo "upload $CLS_PRO"

scp -P$ECS_PORT -r  $Tfolder/$DATE/$CLS_PRO.jar root@$ADD:/usr/local/dubbo-services/$PRO_FOLDER


echo "reboot $CLS_PRO"

ssh -p $ECS_PORT root@$ADD "source /etc/profile
                   cd /usr/local/dubbo-services/$PRO_FOLDER
                   sh ./run.sh restart                   
                   exit"


}



deploy_3jar()
{
local ECS_PORT=$1
#local ADD=$2
ADD=$SLB_IP
echo "backup $CLS_PRO"
ssh -p $ECS_PORT root@$ADD "if [ -d $BACKUP/$CLS_PRO$DATE ];then
                     mkdir -p $BACKUP/$CLS_PRO$TIME
                     BACKUP_PATH=$BACKUP/$CLS_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$CLS_PRO$DATE
                     BACKUP_PATH=$BACKUP/$CLS_PRO$DATE
                   fi

                    mv /usr/local/applications/$PRO_FOLDER/$CLS_PRO.jar \$BACKUP_PATH
                   exit"

echo "upload $CLS_PRO"

scp -P$ECS_PORT -r  $Tfolder/$DATE/$CLS_PRO.jar root@$ADD:/usr/local/applications/$PRO_FOLDER


echo "reboot $CLS_PRO"

ssh -p $ECS_PORT root@$ADD "source /etc/profile
                   cd /usr/local/applications/$PRO_FOLDER
                   sh ./run.sh restart
                   exit"


}


deploy_statc()
{
local ADD=$1

echo "backup $STATIC_PRO"
ssh  root@$ADD "if [ -d $BACKUP/$STATIC_PRO$DATE ];then
                     mkdir -p $BACKUP/$STATIC_PRO$TIME
                     BACKUP_PATH=$BACKUP/$STATIC_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$STATIC_PRO$DATE
                     BACKUP_PATH=$BACKUP/$STATIC_PRO$DATE
                   fi
                    mv /usr/local/applications/$STATIC_PRO \$BACKUP_PATH
                   exit"

echo "upload $STATIC_PRO"
scp -r $Tfolder/$DATE/$STATIC_PRO root@$ADD:/usr/local/applications/

}

deploy2_statc()
{
local ECS_PORT=$1
local ADD=$SLB_IP

echo "backup $STATIC_PRO"
ssh -p $ECS_PORT root@$ADD "if [ -d $BACKUP/$STATIC_PRO$DATE ];then
                     mkdir -p $BACKUP/$STATIC_PRO$TIME
                     BACKUP_PATH=$BACKUP/$STATIC_PRO$TIME
                 else
                     mkdir -p  $BACKUP/$STATIC_PRO$DATE
                     BACKUP_PATH=$BACKUP/$STATIC_PRO$DATE
                   fi
                    mv /usr/local/applications/$STATIC_PRO \$BACKUP_PATH
                   exit"

echo "upload $STATIC_PRO"
scp -P$ECS_PORT  -r $Tfolder/$DATE/$STATIC_PRO root@$ADD:/usr/local/applications/

}


case "$1" in
  cls-web|api-proxy|cls-app)
  MODEL=0
  P_PRO=$1
  if [ "$1" == "cls-web" ];then
    CLS_PRO=$1
  deploy_proj $SLB_PORT1
  deploy_proj $SLB_PORT2
  fi

  if [ "$1" == "api-proxy" ];then
   CLS_PRO="api"
   deploy_proj $SLB_PORT3
  fi
  if [ "$1" == "cls-app" ];then
   CLS_PRO=$1
   deploy_proj $SLB_PORT3
   deploy_proj $SLB_PORT4
  fi
  
  rm -rf $Tfolder/$DATE/"$1"
 ;;
 
 risk|message-center|za-usercenter-service|cls-base-service|cls-bss|supportingdata)
  MODEL=1
  P_PRO=$1
  if [ "$1" == "risk" ];then
   CLS_PRO="risk"
  fi   
  if [ "$1" == "message-center" ];then
   CLS_PRO="messagecenter"
   echo "to zhenan-web3"
   deploy_proj $SLB_PORT3
  fi
  if [ "$1" == "za-usercenter-service" ];then
   CLS_PRO="user-center"
   echo "to zhenan-web3"
   deploy_proj $SLB_PORT3
  fi
  if [ "$1" == "cls-base-service" ];then
   CLS_PRO="cls-base-service"
   echo "to zhenan-web3"
   deploy_proj $SLB_PORT3
  fi
  if [ "$1" == "cls-bss" ];then
   CLS_PRO="cls-bss"
   echo "to zhenan-web3"
   deploy_proj $SLB_PORT3
  fi
  if [ "$1" == "supportingdata" ];then
   CLS_PRO="supporting-data"
   echo "to zhenan-web3"
   deploy_proj $SLB_PORT3
  fi
  echo "to zhenan-web4"
  deploy_proj $SLB_PORT4

  rm -rf $Tfolder/$DATE/"$1"
  ;;

  registry.jar|gateway.jar|notification.jar|zcaf.jar|mid-ivs.jar|mid-ucas.jar|cls-info.jar|deip.jar|xxl-job.jar|becs.jar|estage.jar|mid-admin.jar|dingtalk.jar|risk-eds.jar|axq.jar|mid-venus.jar)
  if [ "$1" == "registry.jar" ];then
   CLS_PRO="registry"
   PRO_FOLDER="reg"
   deploy_mid $pub_reg
  fi
  if [ "$1" == "gateway.jar" ];then
   CLS_PRO="gateway"
   PRO_FOLDER="gateway"
   deploy_mid $pub_reg
  fi
  
  if [ "$1" == "notification.jar" ];then
   CLS_PRO="notification"
   PRO_FOLDER="notification"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi
  
  if [ "$1" == "zcaf.jar" ];then
   CLS_PRO="zcaf"
   PRO_FOLDER="zcaf"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi
  
  if [ "$1" == "mid-ivs.jar" ];then
   CLS_PRO="mid-ivs"
   PRO_FOLDER="ivs"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi
  
  if [ "$1" == "mid-ucas.jar" ];then
   CLS_PRO="mid-ucas"
   PRO_FOLDER="ucas"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi


   if [ "$1" == "cls-info.jar" ];then
   CLS_PRO="cls-info"
   PRO_FOLDER="cls-info"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi


   if [ "$1" == "deip.jar" ];then
   CLS_PRO="deip"
   PRO_FOLDER="deip"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi


   if [ "$1" == "xxl-job.jar" ];then
   CLS_PRO="xxl-job"
   PRO_FOLDER="xxl-job"
   deploy_3jar $SLB_PORT5
  fi


   if [ "$1" == "becs.jar" ];then
   CLS_PRO="becs"
   PRO_FOLDER="becs"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi

   if [ "$1" == "estage.jar" ];then
   CLS_PRO="estage"
   PRO_FOLDER="estage"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi

   if [ "$1" == "mid-admin.jar" ];then
   CLS_PRO="mid-admin"
   PRO_FOLDER="admin"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi

   if [ "$1" == "dingtalk.jar" ];then
   CLS_PRO="dingtalk"
   PRO_FOLDER="dingtalk"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi

  if [ "$1" == "risk-eds.jar" ];then
   CLS_PRO="risk-eds"
   PRO_FOLDER="risk-eds"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi


   if [ "$1" == "axq.jar" ];then
   CLS_PRO="axq"
   PRO_FOLDER="axq"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi


   if [ "$1" == "mid-venus.jar" ];then
   CLS_PRO="mid-venus"
   PRO_FOLDER="venus"
   deploy_mid $mid_service01
   echo "to02"
   deploy_mid $mid_service02
  fi

   rm -rf $Tfolder/$DATE/"$1"
  ;;


  ccms-web.jar|cls-report-provider.jar|cls-open-provider.jar|support-data.jar|open-cloud-upms.jar|open-cloud-gateway.jar|open-cloud-wechat-front.jar|open-cloud-wechat-backstage.jar)

   if [ "$1" == "ccms-web.jar" ];then
   CLS_PRO="ccms-web"
   PRO_FOLDER="ccms-web"
   deploy_jar $cuishou
  fi

    if [ "$1" == "support-data.jar" ];then
   CLS_PRO="support-data"
   PRO_FOLDER="support-data"
   deploy_jar $mid_service01
   echo "to02"
   deploy_jar $mid_service02
  fi

    if [ "$1" == "cls-open-provider.jar" ];then
   CLS_PRO="cls-open-provider"
   PRO_FOLDER="cls-open-provider"
   deploy_2jar $SLB_PORT3
   echo "to02"
   deploy_2jar $SLB_PORT4
  fi


    if [ "$1" == "cls-report-provider.jar" ];then
   CLS_PRO="cls-report-provider"
   PRO_FOLDER="cls-report-provider"
   deploy_2jar $SLB_PORT3
   echo "to02"
   deploy_2jar $SLB_PORT4
  fi

    if [ "$1" == "open-cloud-upms.jar" ];then
   CLS_PRO="open-cloud-upms"
   PRO_FOLDER="open-cloud-upms"
   deploy_jar $contract1
   echo "to02"
   deploy_jar $contract2
  fi


  if [ "$1" == "open-cloud-gateway.jar" ];then
   CLS_PRO="open-cloud-gateway"
   PRO_FOLDER="open-cloud-gateway"
   deploy_jar $contract1
   echo "to02"
   deploy_jar $contract2
  fi

  if [ "$1" == "open-cloud-wechat-front.jar" ];then
   CLS_PRO="open-cloud-wechat-front"
   PRO_FOLDER="open-cloud-wechat-front"
   deploy_jar $contract1
   echo "to02"
   deploy_jar $contract2
  fi

  if [ "$1" == "open-cloud-wechat-backstage.jar" ];then
   CLS_PRO="open-cloud-wechat-backstage"
   PRO_FOLDER="open-cloud-wechat-backstage"
   deploy_jar $contract1
   echo "to02"
   deploy_jar $contract2
  fi

   rm -rf $Tfolder/$DATE/"$1"
  ;;

  za-web-pc|za-web-risk|za-vue-h5|cs-web-home|za-wechat|open-cloud-pc)
    STATIC_PRO="$1"
    if [ "$1" == "za-web-pc" -o "$1" == "za-vue-h5" ];then
       deploy2_statc $SLB_PORT1
       echo "to02"
       deploy2_statc $SLB_PORT2
    fi
        
    if [ "$1" == "za-web-risk" ];then
     deploy_statc $mid_web01
     echo "to02"
     deploy_statc $mid_web02
    fi  
    if [ "$1" == "cs-web-home" ];then
     deploy_statc $contract1
     echo "to02"
     deploy_statc $contract2
    fi
     if [ "$1" == "za-wechat" ];then
     deploy_statc $contract1
     echo "to02"
     deploy_statc $contract2
    fi

    if [ "$1" == "open-cloud-pc" ];then
     deploy_statc $contract1
     echo "to02"
     deploy_statc $contract2
    fi

    rm -rf $Tfolder/$DATE/"$1"
 ;;


  *)
        echo "Usage: $0  project-name"
        exit 2
        ;;

esac


exit 0