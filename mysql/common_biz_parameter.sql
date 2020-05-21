/*
 Navicat Premium Data Transfer

 Source Server         : ftcs-db-dev
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 192.168.27.7:3306
 Source Schema         : cls

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 21/05/2020 09:58:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for common_biz_parameter
-- ----------------------------
DROP TABLE IF EXISTS `common_biz_parameter`;
CREATE TABLE `common_biz_parameter` (
  `param_name` varchar(50) NOT NULL COMMENT '参数名称',
  `description` varchar(1000) NOT NULL COMMENT '参数描述说明',
  `param_type` tinyint(2) NOT NULL COMMENT '参数类型{1:填充参数 2:签名参数(必须设置Bean值) 3.列表参数(目前不支持)}',
  `select_sql` varchar(500) DEFAULT NULL COMMENT 'Select部分的sql,如: when gender case 1 then ‘男’ else ‘女’  end, full_name,如不填写，则是select *, 注意:不包含 select',
  `table_name` varchar(200) DEFAULT NULL COMMENT '表名称',
  `column_name` varchar(50) DEFAULT NULL COMMENT '列名称',
  `format_expr` varchar(100) DEFAULT NULL COMMENT '格式化表达式，目前支持:{1.日期型：支持日期常用格式化，如 yyyy-MM-dd;MM;dd 2.数值型:[1].toCn 转中文大写,[2].常用数值型格式化 #0.00, [3].cell 向上取整, [4].floor 向下取整, [5].Scale(保留小数位数,ROUND_HALF_UP) 其中 BigDecimal.ROUND_HALF_UP 四舍五入，BigDecimal.ROUND_FLOOR 向下取整，BigDecimal.ROUND_CEILING  向上取整； 3.字符串:abbr(保留字符串长度) }',
  `search_index_type` tinyint(2) DEFAULT NULL COMMENT '检索参数类型(1:征信id,2:贷款Id)其他后续拓展',
  `search_index_column` varchar(50) DEFAULT NULL COMMENT '检索参数对应的字段名称，若字段名称是标准的，如：credit_id,project_id,则无须填写',
  `order_by_sql` varchar(200) DEFAULT NULL COMMENT 'order by （排序 sql）,注意:sql里不能有 order by ',
  `where_sql` varchar(200) DEFAULT NULL COMMENT 'where 条件(固定where条件sql,  如 relation_ship_type = 1 And sign_type = 1) ,注意:sql里不能有 where  ',
  `value_index` int(8) DEFAULT '1' COMMENT '记录索引号，当查询到多条记录时，获取第几条，从1开始',
  `handler_bean_name` varchar(200) DEFAULT NULL COMMENT '特别处理bean (与以上（表、字段、格式化、where、order by 与 转化处理 bean）配置互斥，且此配置优先) ',
  `del_flag` tinyint(1) NOT NULL DEFAULT '0' COMMENT '停用标示(0:启用,1:停用)',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公共业务参数表';

-- ----------------------------
-- Records of common_biz_parameter
-- ----------------------------
BEGIN;
INSERT INTO `common_biz_parameter` VALUES ('bankName', '合作银行名称', 1, NULL, 'loan_approve_project', 'co_bank_name', NULL, 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:02:25', '2020-05-20 19:02:25');
INSERT INTO `common_biz_parameter` VALUES ('billPrice', '车辆开票价', 1, NULL, 'loan_approve_project', 'billing_price', '#0.00', 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:03:54', '2020-05-20 19:03:54');
INSERT INTO `common_biz_parameter` VALUES ('carBrandName', '车辆品牌名称', 1, NULL, 'loan_approve_project', 'car_brand_name', NULL, 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:05:18', '2020-05-20 19:05:18');
INSERT INTO `common_biz_parameter` VALUES ('carFrameNo', '车架号', 1, NULL, 'loan_car_info', 'car_frame_no', NULL, 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:06:49', '2020-05-20 19:06:49');
INSERT INTO `common_biz_parameter` VALUES ('firstAdvanceDateCn', '首个公司代偿日期', 1, 'min(advance_date) as firstAdvanceDateCn', 'advance_detail a INNER JOIN advance_fee b on  a.advance_id = b.id', 'min(advance_date) as firstAdvanceDateCn', 'yyyy年MM月dd日', 2, 'a.project_id', NULL, 'a.is_dc = 1 and a.isvalid = 1 and b.apply_status = 4', 1, NULL, 0, '2020-05-20 17:40:43', '2020-05-20 17:40:43');
INSERT INTO `common_biz_parameter` VALUES ('lastAdvanceDateCn', '最后一次代偿日期', 1, 'max(advance_date) as lastAdvanceDateCn', 'advance_detail a INNER JOIN advance_fee b on  a.advance_id = b.id ', 'lastAdvanceDateCn', 'yyyy年MM月dd日', 2, 'a.project_id', NULL, 'a.is_dc = 1 and a.isvalid = 1 and b.apply_status = 4', 1, NULL, 0, '2020-05-20 19:16:51', '2020-05-20 19:16:51');
INSERT INTO `common_biz_parameter` VALUES ('lawsuitAmountAdvanced', '司法诉讼垫款总额', 1, 'Sum(IFNULL(b.advance_amt,0)) as lawsuitAmountAdvanced', 'advance_detail a INNER JOIN advance_fee b on  a.advance_id = b.id ', 'lawsuitAmountAdvanced', '#0.00', 2, 'a.project_id', NULL, 'a.is_dc = 1 and a.isvalid = 1 and b.apply_status = 4', 1, NULL, 0, '2020-05-20 17:05:38', '2020-05-20 17:05:38');
INSERT INTO `common_biz_parameter` VALUES ('lawsuitDateCn', '司法诉讼发起日期', 1, NULL, 'lawsuit_info', 'create_time', 'yyyy年MM月dd日', 2, 'id', NULL, NULL, 1, NULL, 0, '2020-05-20 17:43:58', '2020-05-20 17:43:58');
INSERT INTO `common_biz_parameter` VALUES ('lawsuitInterestSum', '诉讼利息', 1, 'sum(0) as lawsuitInterestSum', 'advance_detail a INNER JOIN advance_fee b on  a.advance_id = b.id ', 'lawsuitInterestSum', '#0.00', 2, 'a.project_id', NULL, 'a.is_dc = 1 and a.isvalid = 1 and b.apply_status = 4', 1, NULL, 0, '2020-05-20 17:57:13', '2020-05-20 17:57:13');
INSERT INTO `common_biz_parameter` VALUES ('lawsuitNextDateCn', '司法诉讼发起日期的下一天', 1, 'DATE_ADD(create_time,INTERVAL 1 DAY) as lawsuitNextDateCn', 'lawsuit_info', 'lawsuitNextDateCn', 'yyyy年MM月dd日', 2, 'id', NULL, NULL, 1, NULL, 0, '2020-05-20 17:43:58', '2020-05-20 18:01:39');
INSERT INTO `common_biz_parameter` VALUES ('lawsuitTargerAmount', '诉讼目标金额合计（代偿金额+利息）', 1, 'sum(0) as lawsuitTargerAmount', 'advance_detail a INNER JOIN advance_fee b on  a.advance_id = b.id ', 'lawsuitTargerAmount', '#0.00', 2, ' a.project_id', '', 'a.is_dc = 1 and a.isvalid = 1 and b.apply_status = 4', 1, NULL, 0, '2020-05-20 18:03:14', '2020-05-20 18:03:14');
INSERT INTO `common_biz_parameter` VALUES ('leaderHomeAddress', '主贷人家庭地址', 1, 'CONCAT(home_address_pname ,home_address_cname, home_address_rname , home_address_detail) as leaderHomeAddress', 'loan_approve_customer', 'leaderHomeAddress', NULL, 2, NULL, 'id desc', NULL, 1, NULL, 0, '2020-05-20 15:09:29', '2020-05-20 16:32:13');
INSERT INTO `common_biz_parameter` VALUES ('lenderBirthdayCn', '出生日期中文（年月日）', 1, NULL, 'loan_approve_customer', 'birthday', 'yyyy年MM月dd日', 2, NULL, 'id desc', NULL, 1, NULL, 0, '2020-05-20 15:05:20', '2020-05-20 15:05:20');
INSERT INTO `common_biz_parameter` VALUES ('lenderGender', '主贷人性别', 1, NULL, 'loan_approve_customer', 'sex', 'enum:com.cgw360.cls.enums.NormalSexEnum#getCodeName', 2, NULL, ' id desc', NULL, 1, NULL, 0, '2020-05-20 14:45:58', '2020-05-20 16:41:21');
INSERT INTO `common_biz_parameter` VALUES ('lenderIdCard', '主贷人身份证', 1, NULL, 'loan_approve_customer', 'card_no', NULL, 2, NULL, 'id desc', NULL, 1, NULL, 0, '2020-05-20 15:06:46', '2020-05-20 15:06:46');
INSERT INTO `common_biz_parameter` VALUES ('lenderMobile', '主贷人手机号', 1, NULL, 'loan_approve_customer', 'mobile_phone', NULL, 2, NULL, 'id desc', NULL, 1, NULL, 0, '2020-05-20 15:13:02', '2020-05-20 15:13:02');
INSERT INTO `common_biz_parameter` VALUES ('lenderName', '主贷人姓名', 1, NULL, 'loan_approve_customer', 'customer_name', '', 2, NULL, 'id desc', NULL, 1, NULL, 0, '2020-05-20 14:42:55', '2020-05-20 14:46:18');
INSERT INTO `common_biz_parameter` VALUES ('requiredAmount', '分期金额', 1, NULL, 'loan_approve_project', 'required_amount', '#0.00', 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:13:52', '2020-05-20 19:13:52');
INSERT INTO `common_biz_parameter` VALUES ('signDateCn', '签单日期(中文yyyy年MM月dd日)', 1, NULL, 'loan_approve_project', 'sign_date', 'yyyy年MM月dd日', 2, NULL, NULL, NULL, 1, NULL, 0, '2020-05-20 19:00:08', '2020-05-20 19:00:08');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
