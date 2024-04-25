/*
 Navicat Premium Data Transfer

 Source Server         : xc-test
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : 192.168.26.11:3306
 Source Schema         : car-loan

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 26/08/2020 11:22:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for agency_access_organization
-- ----------------------------
DROP TABLE IF EXISTS `agency_access_organization`;
CREATE TABLE `agency_access_organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `agency_id` bigint(20) DEFAULT NULL COMMENT '合作单位ID',
  `organization_id` bigint(20) DEFAULT NULL COMMENT '组织机构ID',
  `access_business_type` varchar(10) DEFAULT '1' COMMENT '准入业务类型。枚举：AccessBusinessTypeEnum ',
  `status` tinyint(1) DEFAULT '1' COMMENT '1：启用，0：停用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_aoad` (`agency_id`,`organization_id`,`access_business_type`,`deleted`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='准入机构';

-- ----------------------------
-- Table structure for agency_business_rate
-- ----------------------------
DROP TABLE IF EXISTS `agency_business_rate`;
CREATE TABLE `agency_business_rate` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `agency_id` bigint(11) NOT NULL,
  `access_business_type` varchar(10) DEFAULT '1' COMMENT '准入业务类型。枚举：AccessBusinessTypeEnum',
  `sub_business_types` varchar(10) DEFAULT '1' COMMENT '业务品种。枚举：BusinessVariety',
  `period` int(11) DEFAULT '1' COMMENT '期数，枚举PeriodNumberType',
  `rate` double(10,4) DEFAULT NULL COMMENT '手续费率（%）',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_aspad` (`access_business_type`,`sub_business_types`,`period`,`agency_id`,`deleted`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=745 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='机构与直属合作机构关系表';

-- ----------------------------
-- Table structure for agency_fund_account
-- ----------------------------
DROP TABLE IF EXISTS `agency_fund_account`;
CREATE TABLE `agency_fund_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `agency_id` bigint(20) DEFAULT NULL COMMENT '合作单位ID',
  `fund_account_purpose` int(11) DEFAULT '1' COMMENT '账户用途/账户类别：10:保证金账户、20:分润账户、30代扣账户、40收款账户',
  `fund_account_type` int(11) DEFAULT '1' COMMENT '账户类型,枚举：AccountTypeEnum 1:对公账户,2:个人账户',
  `fund_account_name` varchar(55) DEFAULT NULL COMMENT '车行账户名',
  `card_no` varchar(40) DEFAULT NULL COMMENT '卡号',
  `opening_bank` varchar(55) DEFAULT NULL COMMENT '开户行',
  `sub_bank_name` varchar(55) DEFAULT NULL COMMENT '支行名称',
  `sub_bank_id` bigint(20) DEFAULT NULL COMMENT 'cash_bank_outlets支行号ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_afd` (`agency_id`,`fund_account_purpose`,`deleted`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='车行账户信息表';

-- ----------------------------
-- Table structure for agency_info
-- ----------------------------
DROP TABLE IF EXISTS `agency_info`;
CREATE TABLE `agency_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `agency_name` varchar(45) NOT NULL COMMENT '合作单位名称',
  `agency_short_name` varchar(45) DEFAULT NULL COMMENT '合作单位简称',
  `agency_code` varchar(55) NOT NULL COMMENT '合作单位代码',
  `agency_type` int(4) DEFAULT '1' COMMENT '合作单位类型，字典项AGENCY_TYPE',
  `social_credit_code` varchar(32) DEFAULT NULL COMMENT '机构社会信用码',
  `contact_name` varchar(15) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(15) DEFAULT NULL COMMENT '联系人电话',
  `legal_representative_name` varchar(32) DEFAULT '' COMMENT '法人代表姓名',
  `legal_representative_phone` varchar(32) DEFAULT NULL COMMENT '法人代表手机号',
  `legal_representative_idcard` varchar(32) DEFAULT NULL COMMENT '法人代表身份证号',
  `province_code` varchar(25) DEFAULT NULL COMMENT '省编码',
  `city_code` varchar(25) DEFAULT NULL COMMENT '市编码',
  `county_code` varchar(25) DEFAULT NULL COMMENT '区/县编码',
  `province` varchar(255) DEFAULT NULL COMMENT '省名称',
  `city` varchar(255) DEFAULT NULL COMMENT '市名称',
  `county` varchar(255) DEFAULT NULL COMMENT '区/县名称',
  `detailed_address` varchar(99) DEFAULT NULL COMMENT '详细地址',
  `agency_certificate_pic_ids` varchar(1000) DEFAULT NULL COMMENT '合作机构证件id列表，以逗号分隔',
  `legal_representative_certificate_pic_ids` varchar(1000) DEFAULT NULL COMMENT '法人代表证件id列表，以逗号分隔',
  `protacal_pic_ids` varchar(1000) DEFAULT NULL COMMENT '合作协议证件id列表，以逗号分隔',
  `create_user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` int(4) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `certificate_serial_number` varchar(31) DEFAULT NULL COMMENT '证书序列号',
  `certificate_register_status` int(1) unsigned zerofill DEFAULT '0' COMMENT '证书注册状态(0:未注册 1:已注册)',
  `certificate_pwd` varchar(31) DEFAULT NULL COMMENT '证书密码',
  `electronic_stamp_pic` varchar(255) DEFAULT NULL COMMENT '电子签章图片',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uniq_agency_code` (`agency_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='合作单位信息';

-- ----------------------------
-- Table structure for agency_info_modify_record
-- ----------------------------
DROP TABLE IF EXISTS `agency_info_modify_record`;
CREATE TABLE `agency_info_modify_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `agency_id` bigint(11) DEFAULT NULL,
  `field_name` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL COMMENT '修改字段',
  `before_value` varchar(255) DEFAULT NULL COMMENT '修改前内容',
  `after_value` varchar(255) DEFAULT NULL COMMENT '修改后内容',
  `modify_user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `modify_user_name` varchar(40) DEFAULT NULL COMMENT '登记人ID',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='合作单位信息修改表';

-- ----------------------------
-- Table structure for balance
-- ----------------------------
DROP TABLE IF EXISTS `balance`;
CREATE TABLE `balance` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACTNBR` varchar(35) NOT NULL COMMENT '银行账号（主键）',
  `CCYNBR` char(7) NOT NULL COMMENT '主键（币种）',
  `ACTNAM` varchar(128) DEFAULT NULL COMMENT '账户名称',
  `AVLBAL` decimal(15,2) DEFAULT NULL COMMENT '可用余额',
  `BACKND` char(1) DEFAULT NULL COMMENT '账户种类',
  `BACTYP` char(1) DEFAULT NULL COMMENT '账号类型',
  `BNKBAL` decimal(15,2) DEFAULT NULL COMMENT '余额',
  `BNKTYP` char(3) DEFAULT NULL COMMENT '银行类型',
  `CLTNBR` char(4) DEFAULT NULL COMMENT '客户号',
  `EXTTX1` varchar(128) DEFAULT NULL COMMENT '扩展字段1',
  `EXTTX2` varchar(128) DEFAULT NULL COMMENT '扩展字段2',
  `EXTTX3` varchar(256) DEFAULT NULL COMMENT '扩展字段3',
  `EXTTX4` varchar(256) DEFAULT NULL COMMENT '扩展字段4',
  `LUPDAT` char(10) DEFAULT NULL COMMENT '最后更新日期',
  `LUPTIM` char(8) DEFAULT NULL COMMENT '最后更新时间',
  `OPNBNK` varchar(200) DEFAULT NULL COMMENT '开户行',
  `UPPER_ACCOUNT_NO` varchar(35) DEFAULT NULL COMMENT '上级账号',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='银行余额记录';

-- ----------------------------
-- Table structure for bank_financial_condition
-- ----------------------------
DROP TABLE IF EXISTS `bank_financial_condition`;
CREATE TABLE `bank_financial_condition` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) DEFAULT NULL COMMENT '金融产品ID',
  `parameter1` varchar(255) DEFAULT NULL COMMENT '参数1',
  `symbol` varchar(255) DEFAULT NULL COMMENT '符号 >=  <= > < =',
  `parameter2` varchar(255) DEFAULT NULL COMMENT '参数2',
  `condition_explain` varchar(255) DEFAULT NULL COMMENT '控制条件文案',
  `is_enable` int(11) DEFAULT '1' COMMENT '是否启用，1：启用，2：不启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2221 DEFAULT CHARSET=utf8 COMMENT='金融产品启用条件表';

-- ----------------------------
-- Table structure for bank_financial_product
-- ----------------------------
DROP TABLE IF EXISTS `bank_financial_product`;
CREATE TABLE `bank_financial_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_id` bigint(20) DEFAULT NULL COMMENT '银行ID',
  `product_name` varchar(255) DEFAULT NULL COMMENT '产品名称',
  `business_type` int(11) DEFAULT NULL COMMENT '业务品种， 1：信用卡分期，2：银行直销，3：个人消费贷款',
  `nper` int(11) DEFAULT NULL COMMENT '期数',
  `benchmark_rate` decimal(20,6) DEFAULT NULL COMMENT '基准费率',
  `guarantee_fee` varchar(255) DEFAULT NULL COMMENT '担保费用公式',
  `guarantee_fee_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `down_payment` varchar(255) DEFAULT NULL COMMENT '银行首付公式',
  `down_payment_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `installment_amount` varchar(255) DEFAULT NULL COMMENT '银行分期金额公式',
  `installment_pattern` int(11) DEFAULT NULL COMMENT '分期取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `installment_handling_charge` varchar(255) DEFAULT NULL COMMENT '分期手续费公司',
  `installment_handling_charge_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)，6：向下保留两位小数',
  `apply_amount` varchar(255) DEFAULT NULL COMMENT '申请金额',
  `per_repay_amount` varchar(255) DEFAULT NULL COMMENT '每期偿还本金公司',
  `per_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `per_interest` varchar(255) DEFAULT NULL COMMENT '每期利息公式',
  `per_interest_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `first_repay_amount` varchar(255) DEFAULT NULL COMMENT '首期偿还本金公式',
  `first_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `first_interest` varchar(255) DEFAULT NULL COMMENT '首期利息',
  `first_interest_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `first_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '首期偿还总额',
  `first_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `per_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '每期偿还总额',
  `per_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `bill_date` varchar(255) DEFAULT NULL COMMENT '账单日',
  `open_card_fee` decimal(20,6) DEFAULT '0.000000' COMMENT '开卡费',
  `capital_discount_no` varchar(16) DEFAULT NULL COMMENT '资方贴息编号(即我方对放款方特殊贴息方案的编号)',
  `status` int(11) DEFAULT '1' COMMENT '状态，1：启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '是否已删除，0：未删除，1：已删除',
  `create_time` datetime DEFAULT NULL COMMENT '创建日期',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改日期',
  `last_repay_amount` varchar(255) DEFAULT NULL COMMENT '末期偿还本金',
  `last_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '末期偿还本金取整方式',
  `last_interest` varchar(255) DEFAULT NULL COMMENT '末期利息',
  `last_interest_pattern` int(11) DEFAULT NULL COMMENT '末期利息取整方式',
  `last_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '末期偿还总额',
  `last_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '末期偿还总额取整方式',
  `notice_first_repay_car_loan_amount` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还本金',
  `notice_first_repay_car_loan_amount_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还本金取整方式',
  `notice_first_repay_car_loan_interest` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还利息',
  `notice_first_repay_car_loan_interest_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还利息取整方式',
  `notice_first_repay_car_loan_total` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还总额',
  `notice_first_repay_car_loan_total_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期车辆贷款偿还总额取整方式',
  `notice_per_repay_car_loan_amount` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还本金',
  `notice_per_repay_car_loan_amount_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还本金取整方式',
  `notice_per_repay_car_loan_interest` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还利息',
  `notice_per_repay_car_loan_interest_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还利息取整方式',
  `notice_per_repay_car_loan_total` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还总额',
  `notice_per_repay_car_loan_total_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期车辆贷款偿还总额取整方式',
  `notice_first_repay_extra_loan_amount` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还本金',
  `notice_first_repay_extra_loan_amount_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还本金取整方式',
  `notice_first_repay_extra_loan_interest` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还利息',
  `notice_first_repay_extra_loan_interest_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还利息取整方式',
  `notice_first_repay_extra_loan_total` varchar(255) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还总额',
  `notice_first_repay_extra_loan_total_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-首期附加费偿还总额取整方式',
  `notice_per_repay_extra_loan_amount` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还本金',
  `notice_per_repay_extra_loan_amount_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还本金取整方式',
  `notice_per_repay_extra_loan_interest` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还利息',
  `notice_per_repay_extra_loan_interest_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还利息取整方式',
  `notice_per_repay_extra_loan_total` varchar(255) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还总额',
  `notice_per_repay_extra_loan_total_pattern` int(11) DEFAULT NULL COMMENT '用卡须知-每期附加费偿还总额取整方式',
  `contract_per_repay_amount` varchar(255) DEFAULT NULL COMMENT '合同-每期偿还本金',
  `contract_per_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-每期偿还本金取整方式',
  `contract_per_interest` varchar(255) DEFAULT NULL COMMENT '合同-每期利息',
  `contract_per_interest_pattern` int(11) DEFAULT NULL COMMENT '合同-每期利息取整方式',
  `contract_first_repay_amount` varchar(255) DEFAULT NULL COMMENT '合同-首期偿还本金',
  `contract_first_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-首期偿还本金',
  `contract_first_interest` varchar(255) DEFAULT NULL COMMENT '合同-首期利息',
  `contract_first_interest_pattern` int(11) DEFAULT NULL COMMENT '合同-首期利息取整方式',
  `contract_last_repay_amount` varchar(255) DEFAULT NULL COMMENT '合同-末期偿还本金',
  `contract_last_repay_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-末期偿还本金取整方式',
  `contract_last_interest` varchar(255) DEFAULT NULL COMMENT '合同-末期利息',
  `contract_last_interest_pattern` int(11) DEFAULT NULL COMMENT '合同-末期利息取整方式',
  `contract_first_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '合同-首期偿还总额',
  `contract_first_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-首期偿还总额取整方式',
  `contract_per_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '合同-每期偿还总额',
  `contract_per_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-每期偿还总额公式',
  `contract_last_repay_total_amount` varchar(255) DEFAULT NULL COMMENT '合同-末期偿还总额',
  `contract_last_repay_total_amount_pattern` int(11) DEFAULT NULL COMMENT '合同-末期偿还总额取整方式',
  `apply_amount_pattern` int(11) DEFAULT NULL COMMENT '申请金额,取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `loan_amount` varchar(255) DEFAULT NULL COMMENT '贷款金额',
  `loan_amount_pattern` int(11) DEFAULT NULL COMMENT '贷款金额,取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `consume_loan` varchar(255) DEFAULT NULL COMMENT '消费贷款金额',
  `consume_loan_pattern` int(11) DEFAULT NULL COMMENT '消费贷款金额,取整方式，1：向上取整，2：向下取整，3：四舍五入，4：不处理，5：保留两位小数(四舍五入)',
  `extra_loan_amount` varchar(255) DEFAULT NULL COMMENT '附加费分期金额',
  `extra_loan_amount_pattern` int(11) DEFAULT NULL COMMENT '附加费分期金额取整方式',
  `extra_loan_handing_fee` varchar(255) DEFAULT NULL COMMENT '附加费分期手续费',
  `extra_loan_handing_fee_pattern` int(11) DEFAULT NULL COMMENT '附加费分期手续费取整方式',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8 COMMENT='合作银行金融产品';

-- ----------------------------
-- Table structure for biz_group_account
-- ----------------------------
DROP TABLE IF EXISTS `biz_group_account`;
CREATE TABLE `biz_group_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `company_id` bigint(20) DEFAULT NULL COMMENT '关联公司ID',
  `company_name` varchar(200) DEFAULT NULL COMMENT '关联公司名称',
  `biz_group_id` bigint(20) DEFAULT NULL COMMENT '关联业务组ID',
  `biz_group_name` varchar(100) DEFAULT NULL COMMENT '关联业务组名称',
  `opening_bank` varchar(20) DEFAULT NULL COMMENT '开户行',
  `open_bank_name` varchar(50) DEFAULT NULL COMMENT '银行中文名称',
  `sub_bank_name` varchar(55) DEFAULT NULL COMMENT '支行名称',
  `account_name` varchar(55) DEFAULT NULL COMMENT '账户名',
  `card_number` varchar(50) DEFAULT NULL COMMENT '卡号',
  `strategy_type` int(2) DEFAULT NULL COMMENT '策略类型 1:优先使用,2:均衡分配',
  `limit_amount` decimal(24,6) DEFAULT NULL COMMENT '账户限制划款金额上限',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0:未删除，1：已删除',
  `account_type` int(2) DEFAULT '1' COMMENT '账户类型,1:对公账户,2:个人账户',
  `account_purpose` int(2) DEFAULT '1' COMMENT '账户用途：1:公司账号 、2:垫款账号、3:贴息账号',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `sys_type` varchar(50) DEFAULT NULL COMMENT '系统标识',
  `sub_bank_id` bigint(20) DEFAULT NULL COMMENT 'cash_bank_outlets支行号ID',
  `status` int(11) DEFAULT '1' COMMENT '1：启用，0：停用',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='分公司业务组账户表';

-- ----------------------------
-- Table structure for car_dealer_account
-- ----------------------------
DROP TABLE IF EXISTS `car_dealer_account`;
CREATE TABLE `car_dealer_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dealer_id` bigint(20) DEFAULT NULL COMMENT '车商id',
  `account_name` varchar(55) DEFAULT NULL COMMENT '车行账户名',
  `opening_bank` varchar(55) DEFAULT NULL COMMENT '开户行',
  `sub_bank_name` varchar(55) DEFAULT NULL COMMENT '支行名称',
  `card_number` varchar(25) DEFAULT NULL COMMENT '卡号',
  `status` int(11) DEFAULT '1' COMMENT '1：启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0:未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_code` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车行账户信息表';

-- ----------------------------
-- Table structure for car_dealer_info
-- ----------------------------
DROP TABLE IF EXISTS `car_dealer_info`;
CREATE TABLE `car_dealer_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dealer_no` varchar(80) DEFAULT '' COMMENT '车行编号，按规则生成',
  `dealer_name` varchar(30) NOT NULL COMMENT '车行名称',
  `contact_name` varchar(25) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(15) DEFAULT NULL COMMENT '联系人手机号',
  `company_id` bigint(20) DEFAULT NULL,
  `affiliations` varchar(35) DEFAULT NULL COMMENT '机构、分公司',
  `person_in_charge_id` bigint(20) DEFAULT NULL COMMENT '责任人ID',
  `person_in_charge` varchar(15) DEFAULT NULL COMMENT '责任人',
  `province` varchar(15) DEFAULT NULL COMMENT '省',
  `city` varchar(15) DEFAULT NULL COMMENT '市',
  `county` varchar(15) DEFAULT NULL COMMENT '县',
  `detailed_address` varchar(99) DEFAULT NULL COMMENT '详细地址',
  `status` int(11) DEFAULT '1' COMMENT '状态，0：停用，1：启用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车行信息表';

-- ----------------------------
-- Table structure for car_dealer_rate
-- ----------------------------
DROP TABLE IF EXISTS `car_dealer_rate`;
CREATE TABLE `car_dealer_rate` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `org_id` int(255) NOT NULL COMMENT '机构id',
  `org_name` varchar(255) NOT NULL COMMENT '机构名',
  `car_dealer_rate_upper` varchar(255) NOT NULL COMMENT '车商系数上限',
  `car_dealer_rate_lower` varchar(255) NOT NULL COMMENT '车商系数下限',
  `object_type` int(13) DEFAULT NULL COMMENT '业品种',
  `car_type` int(13) DEFAULT NULL COMMENT '汽车类型',
  `loan_term` int(13) DEFAULT NULL COMMENT '期限',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for cash_bank_outlets
-- ----------------------------
DROP TABLE IF EXISTS `cash_bank_outlets`;
CREATE TABLE `cash_bank_outlets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bank_name` varchar(100) DEFAULT NULL COMMENT '网点名称',
  `bank_code` varchar(15) DEFAULT NULL COMMENT '联行号',
  `province_code` varchar(5) DEFAULT NULL COMMENT '省份编码',
  `province_name` varchar(10) DEFAULT NULL COMMENT '省份名称',
  `city_code` varchar(7) DEFAULT NULL COMMENT '城市编码',
  `city_name` varchar(30) DEFAULT NULL COMMENT '城市名称',
  `bank_type` varchar(30) DEFAULT NULL COMMENT '银行类型code',
  `bank_number` varchar(30) DEFAULT NULL COMMENT '银行号',
  PRIMARY KEY (`id`),
  KEY `inx_bankcode` (`bank_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=140467 DEFAULT CHARSET=utf8 COMMENT='银行支行数据字典';

-- ----------------------------
-- Table structure for cash_white_list
-- ----------------------------
DROP TABLE IF EXISTS `cash_white_list`;
CREATE TABLE `cash_white_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL COMMENT 'ip地址',
  `status` int(3) DEFAULT '0' COMMENT '0白名单 1黑名单',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for code_library_fee
-- ----------------------------
DROP TABLE IF EXISTS `code_library_fee`;
CREATE TABLE `code_library_fee` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `code_id` varchar(20) NOT NULL DEFAULT '' COMMENT '代码编号',
  `code_name` varchar(50) NOT NULL COMMENT '代码名称',
  `code_type` varchar(50) NOT NULL COMMENT '类型',
  `sort_no` varchar(3) DEFAULT NULL COMMENT '排序号',
  `parent_id` bigint(11) DEFAULT NULL COMMENT '记录子类父类',
  `note` varchar(200) DEFAULT NULL COMMENT '描述',
  `is_inuse` int(1) DEFAULT NULL COMMENT '是否启用 1启用  ',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `code_library_type` (`code_type`) USING BTREE,
  KEY `code_library_code` (`code_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 COMMENT='代码配置字典项表';

-- ----------------------------
-- Table structure for company_account
-- ----------------------------
DROP TABLE IF EXISTS `company_account`;
CREATE TABLE `company_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `company_id` bigint(20) DEFAULT NULL COMMENT '关联公司ID',
  `account_name` varchar(55) DEFAULT NULL COMMENT '车行账户名',
  `opening_bank` varchar(55) DEFAULT NULL COMMENT '开户行',
  `open_bank_name` varchar(255) DEFAULT NULL COMMENT '银行中文名称',
  `sub_bank_name` varchar(55) DEFAULT NULL COMMENT '支行名称',
  `card_number` varchar(50) DEFAULT NULL COMMENT '卡号',
  `status` int(11) DEFAULT '1' COMMENT '1：启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0:未删除，1：已删除',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `account_type` int(11) DEFAULT NULL COMMENT '账户类型,1:对公账户,2:个人账户',
  `account_purpose` int(11) DEFAULT '1' COMMENT '账户用途：1:公司账号 、2:垫款账号、3:贴息账号',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `old_id` varchar(50) DEFAULT NULL COMMENT '旧主键',
  `sys_type` varchar(50) DEFAULT NULL COMMENT '系统标识',
  `sub_bank_id` bigint(20) DEFAULT NULL COMMENT 'cash_bank_outlets支行号ID',
  PRIMARY KEY (`id`),
  KEY `idx_mtime` (`modify_time`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COMMENT='车行账户信息表';

-- ----------------------------
-- Table structure for company_account_config
-- ----------------------------
DROP TABLE IF EXISTS `company_account_config`;
CREATE TABLE `company_account_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_account_no` varchar(50) DEFAULT NULL COMMENT '公司卡号',
  `payment_mode` varchar(30) DEFAULT NULL COMMENT '0人工付款 1招行CBS(逗号隔开存放)',
  `payment_type` varchar(30) DEFAULT NULL COMMENT '1贷款申请资金部付款\r\n2贷款申请分公司付款\r\n3贷款修改分公司确认\r\n4贷款修改资金部付款\r\n5贷款修改分公司付款\r\n6贷款作废分公司确认\r\n(逗号分隔)',
  `status` int(5) DEFAULT '0' COMMENT '0正常 1删除',
  `default_value` int(5) DEFAULT '0' COMMENT 'payment_mode默认值',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COMMENT='公司打款账户 默认付款方式表';

-- ----------------------------
-- Table structure for company_bank_r
-- ----------------------------
DROP TABLE IF EXISTS `company_bank_r`;
CREATE TABLE `company_bank_r` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `bank_id` bigint(11) DEFAULT NULL COMMENT '合作银行id',
  `company_id` bigint(11) DEFAULT NULL COMMENT '分公司id',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=750 DEFAULT CHARSET=utf8 COMMENT='分公司合作银行关联表';

-- ----------------------------
-- Table structure for company_insurance_type_r
-- ----------------------------
DROP TABLE IF EXISTS `company_insurance_type_r`;
CREATE TABLE `company_insurance_type_r` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT '0' COMMENT '分公司id',
  `insurance_id` bigint(20) DEFAULT '0' COMMENT '保险公司id',
  `type_id` bigint(20) DEFAULT '0' COMMENT '险种类型id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=797 DEFAULT CHARSET=utf8 COMMENT='分公司、保险公司、险种类型关系表';

-- ----------------------------
-- Table structure for cooperation_bank_bill_rule
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_bill_rule`;
CREATE TABLE `cooperation_bank_bill_rule` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `co_bank_id` bigint(20) DEFAULT NULL COMMENT '合作银行Id',
  `co_bank_name` varchar(64) DEFAULT NULL COMMENT '合作银行名称',
  `bill_date` int(11) DEFAULT NULL COMMENT '账单日',
  `repay_date` int(11) DEFAULT NULL COMMENT '还款日',
  `first_repay_date_pending_rule` varchar(64) DEFAULT NULL COMMENT '首期还款日顺延规则',
  `first_repay_date_pending_month` int(11) DEFAULT NULL COMMENT '首期还款日顺延月数',
  `effective_start_date` date DEFAULT NULL COMMENT '有效期起始日',
  `effective_end_date` date DEFAULT NULL COMMENT '有效期截止日',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合作银行账单规则配置表';

-- ----------------------------
-- Table structure for cooperation_bank_bill_rule_bak
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_bill_rule_bak`;
CREATE TABLE `cooperation_bank_bill_rule_bak` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT '主键',
  `co_bank_id` bigint(20) DEFAULT NULL COMMENT '合作银行Id',
  `co_bank_name` varchar(64) DEFAULT NULL COMMENT '合作银行名称',
  `bill_date` int(11) DEFAULT NULL COMMENT '账单日',
  `repay_date` int(11) DEFAULT NULL COMMENT '还款日',
  `first_repay_date_pending_rule` varchar(64) DEFAULT NULL COMMENT '首期还款日顺延规则',
  `first_repay_date_pending_month` int(11) DEFAULT NULL COMMENT '首期还款日顺延月数',
  `effective_start_date` date DEFAULT NULL COMMENT '有效期起始日',
  `effective_end_date` date DEFAULT NULL COMMENT '有效期截止日',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for cooperation_bank_document_dir_templet
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_document_dir_templet`;
CREATE TABLE `cooperation_bank_document_dir_templet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `directory_path` varchar(31) DEFAULT NULL COMMENT '目录路径(目录名称)',
  `parent_dic_id` bigint(20) DEFAULT NULL COMMENT '父目录ID',
  `is_inuse` bit(1) DEFAULT b'1' COMMENT '是否启用（0：停用，1：启用）',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='银行目录文档模板信息表';

-- ----------------------------
-- Table structure for cooperation_bank_info
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_info`;
CREATE TABLE `cooperation_bank_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `company_id` bigint(20) DEFAULT NULL COMMENT '机构管理，公司id',
  `guarantee_id` bigint(20) DEFAULT NULL COMMENT '担保公司id',
  `bank_code` varchar(55) DEFAULT NULL COMMENT '银行编号',
  `bank_name` varchar(45) NOT NULL COMMENT '银行名称',
  `organization_code` varchar(45) DEFAULT NULL COMMENT '组织机构代码',
  `company_phone` varchar(15) DEFAULT NULL COMMENT '公司电话',
  `company_fax` varchar(15) DEFAULT NULL COMMENT '公司传真',
  `contact_name` varchar(15) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(15) DEFAULT NULL COMMENT '联系人电话',
  `contact_mail` varchar(45) DEFAULT NULL COMMENT '联系人邮箱',
  `province` varchar(25) DEFAULT NULL COMMENT '省',
  `city` varchar(25) DEFAULT NULL COMMENT '市',
  `county` varchar(25) DEFAULT NULL COMMENT '县',
  `province_name` varchar(255) DEFAULT NULL COMMENT '省名称',
  `city_name` varchar(255) DEFAULT NULL COMMENT '市名称',
  `county_name` varchar(255) DEFAULT NULL COMMENT '区名称',
  `detailed_address` varchar(99) DEFAULT NULL COMMENT '详细地址',
  `status` int(11) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime DEFAULT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `interest_free_day` int(11) DEFAULT '0' COMMENT '免息日',
  `bank_name_abbr` varchar(255) DEFAULT NULL COMMENT '银行简写',
  `bank_outlets` varchar(255) DEFAULT NULL COMMENT '银行网点',
  `bank_post_code` varchar(255) DEFAULT NULL COMMENT '银行邮编',
  `contract_print_no` varchar(50) DEFAULT NULL COMMENT '合同套打编号',
  `open_card_fee` decimal(24,6) DEFAULT '0.000000' COMMENT '开卡费',
  `marketing_code` varchar(55) DEFAULT NULL COMMENT '营销代码',
  `network_name` varchar(55) DEFAULT NULL COMMENT '领卡网点',
  `mq_queue_code` varchar(255) DEFAULT NULL COMMENT 'MQ队列编码(决定发送哪个中间件)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='合作银行信息表';

-- ----------------------------
-- Table structure for cooperation_bank_info_back
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_info_back`;
CREATE TABLE `cooperation_bank_info_back` (
  `new_back_id` varchar(50) DEFAULT NULL,
  `new_back_name` varchar(100) DEFAULT NULL,
  `new_guarantee_id` varchar(50) DEFAULT NULL,
  `old_bank_id` varchar(50) DEFAULT NULL,
  `old_bank_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合作银行信息表(备份)';

-- ----------------------------
-- Table structure for cooperation_bank_member
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_member`;
CREATE TABLE `cooperation_bank_member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_id` bigint(20) DEFAULT NULL COMMENT '合作银行ID',
  `member_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `member_name` varchar(255) DEFAULT NULL COMMENT '用户，成员 真实名字',
  `company_id` bigint(20) DEFAULT NULL COMMENT '分公司ID',
  `company_name` varchar(255) DEFAULT NULL COMMENT '分公司名称',
  `department_id` bigint(20) DEFAULT NULL COMMENT '部门ID',
  `department_name` varchar(255) DEFAULT NULL COMMENT '部门名称',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8 COMMENT='合作银行，助行内勤';

-- ----------------------------
-- Table structure for cooperation_bank_rate
-- ----------------------------
DROP TABLE IF EXISTS `cooperation_bank_rate`;
CREATE TABLE `cooperation_bank_rate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bank_id` bigint(20) DEFAULT NULL COMMENT '银行id',
  `nper` varchar(15) DEFAULT NULL COMMENT '期数',
  `rate` double(8,6) DEFAULT NULL COMMENT '利率',
  `status` int(11) DEFAULT '1' COMMENT '状态：1启用，0停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合作银行利率信息';

-- ----------------------------
-- Table structure for credit_message_role
-- ----------------------------
DROP TABLE IF EXISTS `credit_message_role`;
CREATE TABLE `credit_message_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色Id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_idx` (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for customer_base_info
-- ----------------------------
DROP TABLE IF EXISTS `customer_base_info`;
CREATE TABLE `customer_base_info` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_name` varchar(50) DEFAULT NULL COMMENT '客户名称',
  `customer_no` varchar(30) DEFAULT NULL COMMENT '客户编号',
  `customer_number` varchar(30) DEFAULT NULL COMMENT '客户编号(外部系统）',
  `source` int(1) DEFAULT NULL COMMENT '客户来源（1：个人申请，2：车商线下推荐， 3：车商线上推送）',
  `manager_id` bigint(20) DEFAULT NULL COMMENT '客户经理ID',
  `register_date` datetime DEFAULT NULL COMMENT '建档日期',
  `gender` int(1) DEFAULT NULL COMMENT '性别 0 男，1 女',
  `card_type` int(1) DEFAULT NULL COMMENT '证件类型（1：身份证，2：军官证，3：侨胞证，4：外籍人士）',
  `card_no` varchar(30) DEFAULT NULL COMMENT '证件号码',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `age` int(3) DEFAULT NULL COMMENT '年龄',
  `marital_status` int(1) DEFAULT NULL COMMENT '婚姻状况（1：已婚，2：未婚，3：离异，4：丧偶）',
  `mobile` char(11) DEFAULT NULL COMMENT '手机号码',
  `home_phone` varchar(15) DEFAULT NULL COMMENT '家庭电话',
  `native_place` varchar(12) DEFAULT NULL COMMENT '籍贯',
  `education` varchar(8) DEFAULT NULL COMMENT '最高学历（1：初中及以下，2：高中，3：大专，4：本科，5：硕士及以上）',
  `housing_status` int(2) DEFAULT NULL COMMENT '住房状况(1：自有住房，2：贷款购房，3：租房：4：其他)',
  `month_repayment` varchar(15) DEFAULT NULL COMMENT '月还款\\月租\\说明',
  `profession` varchar(45) DEFAULT NULL COMMENT '专业/职业',
  `industry` varchar(45) DEFAULT NULL COMMENT '所属行业（1：互联网，2：金融）',
  `monthly_income` varchar(25) DEFAULT NULL COMMENT '月收入（1：1-4999，2：5000-9999，3：10000-14999，4：15000-19999，5：2万以上）',
  `company` varchar(100) DEFAULT NULL COMMENT '工作单位',
  `work_phone` varchar(20) DEFAULT NULL COMMENT '单位电话',
  `reserved_funds` varchar(20) DEFAULT NULL COMMENT '公积金（1：无，2：1-500，3：501-1000，4：1001-1500，5：1501-2000，6：2001-2500，7：2501-3000，8：3000以上）',
  `company_address_province_code` varchar(11) DEFAULT NULL COMMENT '单位地址 省代码',
  `company_address_province` varchar(30) DEFAULT NULL COMMENT '单位地址 省',
  `company_address_city_code` varchar(11) DEFAULT NULL COMMENT '单位地址 市代码',
  `company_address_city` varchar(30) DEFAULT NULL COMMENT '单位地址 市',
  `company_address_county_code` varchar(11) DEFAULT NULL COMMENT '单位地址 县代码',
  `company_address_county` varchar(30) DEFAULT NULL COMMENT '单位地址 县',
  `company_address` varchar(50) DEFAULT NULL COMMENT '单位地址',
  `home_address_province_code` varchar(11) DEFAULT NULL COMMENT '家庭住址 省代码',
  `home_address_province` varchar(30) DEFAULT NULL COMMENT '家庭住址 省',
  `home_address_city_code` varchar(11) DEFAULT NULL COMMENT '家庭住址 市代码',
  `home_address_city` varchar(30) DEFAULT NULL COMMENT '家庭住址 市',
  `home_address_county_code` varchar(11) DEFAULT NULL COMMENT '家庭住址 县代码',
  `home_address_county` varchar(30) DEFAULT NULL COMMENT '家庭住址 县',
  `home_address_village` varchar(100) DEFAULT NULL COMMENT '家庭住址 村',
  `spouse_name` varchar(25) DEFAULT NULL COMMENT '配偶姓名',
  `spouse_card_type` int(1) DEFAULT NULL COMMENT '配偶证件类型（1：身份证，2：军官证，3：侨胞证，4：外籍人士）',
  `spouse_card_no` varchar(30) DEFAULT NULL COMMENT '配偶证件号码',
  `spouse_mobile` varchar(11) DEFAULT NULL COMMENT '配偶手机号码',
  `spouse_native_place` varchar(15) DEFAULT NULL COMMENT '配偶户籍地址',
  `spouse_reserved_funds` int(1) DEFAULT NULL COMMENT '配偶公积金（1：无，2：1-500，3：501-1000，4：1001-1500，5：1501-2000，6：2001-2500，7：2501-3000，8：3000以上）',
  `spouse_company` varchar(30) DEFAULT NULL COMMENT '配偶工作单位',
  `spouse_company_phone` varchar(30) DEFAULT NULL COMMENT '配偶单位电话',
  `spouse_company_addr_province_code` varchar(11) DEFAULT NULL COMMENT '配偶单位地址 省代码',
  `spouse_company_addr_province` varchar(30) DEFAULT NULL COMMENT '配偶单位地址 省',
  `spouse_company_addr_city_code` varchar(11) DEFAULT NULL COMMENT '配偶单位地址 市代码',
  `spouse_company_addr_city` varchar(30) DEFAULT NULL COMMENT '配偶单位地址 市',
  `spouse_company_addr_county_code` varchar(11) DEFAULT NULL COMMENT '配偶单位地址 县代码',
  `spouse_company_addr_county` varchar(30) DEFAULT NULL COMMENT '配偶单位地址 县',
  `spouse_company_addr` varchar(100) DEFAULT NULL COMMENT '配偶单位地址',
  `spouse_monthly_income` int(1) DEFAULT NULL COMMENT '配偶月收入（1：1-4999，2：5000-9999，3：10000-14999，4：15000-19999，5：2万以上）',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `status` int(1) DEFAULT NULL COMMENT '客户状态（1：未生效，2：生效，-1：已删除）',
  `risk_status` int(1) DEFAULT NULL COMMENT '客户风险状态（1：正常，2：黑名单，3：灰名单）',
  `risk_time` timestamp NULL DEFAULT NULL COMMENT '客户风险状态更新时间',
  `risk_detail` varchar(1000) DEFAULT NULL COMMENT '客户风险状态详情',
  PRIMARY KEY (`id`),
  KEY `IDX_CUSTOMER_NAME` (`customer_name`) USING BTREE,
  KEY `IDX_CUSTOMER_NO` (`customer_no`) USING BTREE,
  KEY `IDX_MANAGER_ID` (`manager_id`) USING BTREE,
  KEY `IDX_SERIAL_NUMBER` (`customer_number`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户基本信息';

-- ----------------------------
-- Table structure for dealer_group
-- ----------------------------
DROP TABLE IF EXISTS `dealer_group`;
CREATE TABLE `dealer_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `group_name` varchar(100) DEFAULT NULL COMMENT '集团名称',
  `group_type` int(1) NOT NULL DEFAULT '1' COMMENT '集团类型',
  `sort_order` int(5) unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态（1：正常，0：已删除）',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='经销商集团表';

-- ----------------------------
-- Table structure for discount_host_factory
-- ----------------------------
DROP TABLE IF EXISTS `discount_host_factory`;
CREATE TABLE `discount_host_factory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `host_factory_name` varchar(255) DEFAULT NULL COMMENT '主机厂名称',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '是否删除，1：删除，0：未删除',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='贴息适用主机厂配置表';

-- ----------------------------
-- Table structure for escrow_account
-- ----------------------------
DROP TABLE IF EXISTS `escrow_account`;
CREATE TABLE `escrow_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `escrow_account_name` varchar(255) NOT NULL COMMENT '第三方账户名',
  `escrow_account_number` varchar(255) NOT NULL COMMENT '第三方账户账号',
  `account_type` int(2) DEFAULT NULL COMMENT '账户类型 1对公 2:个人',
  `sub_bank_id` varchar(255) DEFAULT NULL COMMENT '分行id',
  `escrow_open_account_bank` varchar(255) NOT NULL COMMENT '第三方账户开户行',
  `status` bigint(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for escrow_account_company
-- ----------------------------
DROP TABLE IF EXISTS `escrow_account_company`;
CREATE TABLE `escrow_account_company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `org_id` bigint(20) NOT NULL COMMENT '机构ID',
  `escrow_account_id` bigint(20) NOT NULL COMMENT '第三方账户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for escrow_account_dealer
-- ----------------------------
DROP TABLE IF EXISTS `escrow_account_dealer`;
CREATE TABLE `escrow_account_dealer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `escrow_account_id` bigint(20) NOT NULL COMMENT '第三方账户ID',
  `car_dealer_id` bigint(20) NOT NULL COMMENT '车商ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for file_storage_record
-- ----------------------------
DROP TABLE IF EXISTS `file_storage_record`;
CREATE TABLE `file_storage_record` (
  `id` bigint(64) NOT NULL COMMENT '雪花ID',
  `file_type` varchar(100) DEFAULT NULL COMMENT '图片类型',
  `file_size` bigint(30) DEFAULT NULL COMMENT '图片大小',
  `file_path` varchar(255) DEFAULT NULL COMMENT '图片url',
  `file_name` varchar(255) DEFAULT NULL COMMENT '文件名',
  `original_name` varchar(255) DEFAULT NULL COMMENT '原文件名',
  `business_type` varchar(50) DEFAULT NULL COMMENT '业务类型:1合作机构证件；2法人代表证件；3合作协议证件',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `status` int(11) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文件存储记录表';

-- ----------------------------
-- Table structure for flow
-- ----------------------------
DROP TABLE IF EXISTS `flow`;
CREATE TABLE `flow` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `flow_type` varchar(30) NOT NULL COMMENT '流程类型编码',
  `flow_name` varchar(30) NOT NULL COMMENT '流程名称',
  `flow_desc` varchar(255) NOT NULL COMMENT '流程描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for flow_node
-- ----------------------------
DROP TABLE IF EXISTS `flow_node`;
CREATE TABLE `flow_node` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `flow_type` varchar(30) NOT NULL COMMENT '所属流程ID',
  `node_index` int(20) NOT NULL COMMENT '节点所在流程内索引',
  `node_code` varchar(30) NOT NULL COMMENT '节点编码',
  `node_name` varchar(30) NOT NULL COMMENT '节点名称',
  `node_desc` varchar(255) DEFAULT NULL COMMENT '节点描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for gps_product
-- ----------------------------
DROP TABLE IF EXISTS `gps_product`;
CREATE TABLE `gps_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `supplier_id` bigint(20) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '产品名称',
  `spec` varchar(50) NOT NULL COMMENT '规格型号',
  `type` int(1) NOT NULL COMMENT '产品类型1 有线 2 无线',
  `price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '参考价格',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态：0：不可用，1：可用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='产品表';

-- ----------------------------
-- Table structure for gps_supplier
-- ----------------------------
DROP TABLE IF EXISTS `gps_supplier`;
CREATE TABLE `gps_supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '供应商名称',
  `province_code` varchar(15) DEFAULT NULL COMMENT '省份编码',
  `province_name` varchar(50) DEFAULT NULL COMMENT '省份名称',
  `city_code` varchar(15) DEFAULT NULL COMMENT '城市编码',
  `city_name` varchar(50) DEFAULT NULL COMMENT '城市名称',
  `area_code` varchar(15) DEFAULT NULL COMMENT '区编码',
  `area_name` varchar(50) DEFAULT NULL COMMENT '区名称',
  `address` varchar(200) DEFAULT NULL COMMENT '详细地址',
  `link_man` varchar(20) DEFAULT NULL COMMENT '联系人',
  `link_mobile` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `link_email` varchar(100) DEFAULT NULL COMMENT '联系人邮箱',
  `tel` varchar(20) DEFAULT NULL COMMENT '公司电话',
  `intro` varchar(100) DEFAULT NULL COMMENT '介绍',
  `sort_order` int(3) unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  `status` int(11) NOT NULL COMMENT '状态-1删除，0 不可用 ，1可用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='供应商信息表';

-- ----------------------------
-- Table structure for guarantee_company_account
-- ----------------------------
DROP TABLE IF EXISTS `guarantee_company_account`;
CREATE TABLE `guarantee_company_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `guarantee_id` bigint(20) DEFAULT NULL COMMENT '担保公司id',
  `account_name` varchar(55) DEFAULT NULL COMMENT '账户名',
  `opening_bank` varchar(55) DEFAULT NULL COMMENT '开户银行',
  `sub_bank_name` varchar(55) DEFAULT NULL COMMENT '支行名称',
  `card_number` varchar(35) DEFAULT NULL COMMENT '卡号',
  `status` int(11) DEFAULT '1' COMMENT '1：启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 COMMENT='担保公司账户信息表';

-- ----------------------------
-- Table structure for guarantee_company_info
-- ----------------------------
DROP TABLE IF EXISTS `guarantee_company_info`;
CREATE TABLE `guarantee_company_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_org_id` bigint(20) DEFAULT NULL COMMENT '上级公司ID',
  `guarantee_code` varchar(30) DEFAULT '' COMMENT '担保机构编号',
  `organization_name` varchar(45) NOT NULL COMMENT '机构名称',
  `parent_organization` varchar(25) DEFAULT NULL COMMENT '上级机构',
  `organization_type` varchar(25) NOT NULL COMMENT '机构类型',
  `company_phone` varchar(15) DEFAULT NULL COMMENT '公司电话',
  `company_fax` varchar(25) DEFAULT NULL COMMENT '公司传真',
  `establish_time` datetime DEFAULT NULL COMMENT '成立时间',
  `contact_name` varchar(25) DEFAULT NULL COMMENT '联系人',
  `contact_phone` varchar(25) DEFAULT NULL COMMENT '联系人手机号码',
  `contact_mail` varchar(45) DEFAULT NULL COMMENT '联系人邮箱',
  `status` int(11) DEFAULT '1' COMMENT '1:启用，0：停用',
  `province` varchar(15) NOT NULL COMMENT '省',
  `city` varchar(15) NOT NULL COMMENT '市',
  `county` varchar(15) NOT NULL COMMENT '县',
  `detailed_address` varchar(99) NOT NULL COMMENT '详细地址',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='担保公司信息';

-- ----------------------------
-- Table structure for guarantee_framework
-- ----------------------------
DROP TABLE IF EXISTS `guarantee_framework`;
CREATE TABLE `guarantee_framework` (
  `gid` int(11) NOT NULL,
  `gname` varchar(255) NOT NULL,
  `fid` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`gid`,`fid`),
  KEY `fid` (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for insurance_company_info
-- ----------------------------
DROP TABLE IF EXISTS `insurance_company_info`;
CREATE TABLE `insurance_company_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL COMMENT '机构管理，公司id',
  `parent_org_id` varchar(255) DEFAULT NULL COMMENT '上级公司id',
  `insurance_company_name` varchar(45) NOT NULL COMMENT '保险公司名字',
  `policy_prefix` varchar(25) DEFAULT NULL COMMENT '保单前缀',
  `company_fax` varchar(25) DEFAULT NULL COMMENT '公司传真',
  `company_phone` varchar(15) DEFAULT NULL COMMENT '公司电话',
  `contact_name` varchar(15) DEFAULT NULL COMMENT '联系人姓名',
  `contact_mobile` varchar(15) DEFAULT NULL COMMENT '联系人电话',
  `contact_mail` varchar(50) DEFAULT NULL COMMENT '联系人邮箱',
  `province` varchar(25) DEFAULT NULL COMMENT '省',
  `city` varchar(25) DEFAULT NULL COMMENT '市',
  `county` varchar(25) DEFAULT NULL COMMENT '县',
  `status` int(11) DEFAULT '1' COMMENT '状态，1：启用，0：停用',
  `detailed_address` varchar(99) DEFAULT NULL COMMENT '详细地址',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8 COMMENT='保险公司信息表';

-- ----------------------------
-- Table structure for insurance_company_type
-- ----------------------------
DROP TABLE IF EXISTS `insurance_company_type`;
CREATE TABLE `insurance_company_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `insurance_id` bigint(20) DEFAULT NULL COMMENT '保险公司id',
  `type` varchar(15) DEFAULT NULL COMMENT '类型',
  `insurance_name` varchar(35) DEFAULT NULL COMMENT '险种名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` int(11) DEFAULT '1' COMMENT '1：启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1730 DEFAULT CHARSET=utf8 COMMENT='保险公司险种类型表';

-- ----------------------------
-- Table structure for keep_addr
-- ----------------------------
DROP TABLE IF EXISTS `keep_addr`;
CREATE TABLE `keep_addr` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(100) DEFAULT NULL COMMENT '保管地名称',
  `province_code` varchar(15) NOT NULL COMMENT '省份编码',
  `province_name` varchar(255) NOT NULL COMMENT '省份名称',
  `city_code` varchar(15) NOT NULL COMMENT '城市编码',
  `city_name` varchar(255) NOT NULL COMMENT '城市名称',
  `area_code` varchar(15) NOT NULL COMMENT '区编码',
  `area_name` varchar(255) NOT NULL COMMENT '区名称',
  `addr_detail` varchar(255) DEFAULT NULL COMMENT '详细地址',
  `addr_longitude` decimal(20,15) DEFAULT NULL COMMENT '地址经度坐标',
  `addr_latitude` decimal(20,15) DEFAULT NULL COMMENT '地址纬度坐标',
  `org_id` bigint(20) DEFAULT NULL COMMENT '保管员所属机构id',
  `org_name` varchar(100) DEFAULT NULL COMMENT '保管员所属机构名称',
  `keep_user_id` bigint(20) DEFAULT NULL COMMENT '保管员id',
  `keep_user_name` varchar(50) DEFAULT NULL COMMENT '保管员全名',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态（1：正常，0：已删除）',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='保管地址表';

-- ----------------------------
-- Table structure for loan_evaluation_subject
-- ----------------------------
DROP TABLE IF EXISTS `loan_evaluation_subject`;
CREATE TABLE `loan_evaluation_subject` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `year` varchar(16) DEFAULT NULL COMMENT '年份',
  `first_name` varchar(64) DEFAULT NULL COMMENT '一级名称',
  `second_name` varchar(64) DEFAULT NULL COMMENT '二级名称',
  `third_name` varchar(64) DEFAULT NULL COMMENT '三级名称',
  `org_ids` varchar(512) DEFAULT NULL COMMENT '关联机构ids',
  `org_names` varchar(512) DEFAULT NULL COMMENT '关联机构names',
  `check_target` decimal(24,6) DEFAULT NULL COMMENT '年度考核指标',
  `employee_num_1` int(11) DEFAULT NULL COMMENT '1月员工数',
  `employee_num_2` int(11) DEFAULT NULL COMMENT '2月员工数',
  `employee_num_3` int(11) DEFAULT NULL COMMENT '3月员工数',
  `employee_num_4` int(11) DEFAULT NULL COMMENT '4月员工数',
  `employee_num_5` int(11) DEFAULT NULL COMMENT '5月员工数',
  `employee_num_6` int(11) DEFAULT NULL COMMENT '6月员工数',
  `employee_num_7` int(11) DEFAULT NULL COMMENT '7月员工数',
  `employee_num_8` int(11) DEFAULT NULL COMMENT '8月员工数',
  `employee_num_9` int(11) DEFAULT NULL COMMENT '9月员工数',
  `employee_num_10` int(11) DEFAULT NULL COMMENT '10月员工数',
  `employee_num_11` int(11) DEFAULT NULL COMMENT '11月员工数',
  `employee_num_12` int(11) DEFAULT NULL COMMENT '12月员工数',
  `create_time` datetime NOT NULL COMMENT '登记时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `isvalid` int(11) NOT NULL DEFAULT '1' COMMENT '1.有效（未删除） 0.无效（已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8276 DEFAULT CHARSET=utf8 COMMENT='考核主体管理表';

-- ----------------------------
-- Table structure for loan_template
-- ----------------------------
DROP TABLE IF EXISTS `loan_template`;
CREATE TABLE `loan_template` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_name` varchar(50) DEFAULT NULL COMMENT '模版名称',
  `template_type_code` int(10) DEFAULT NULL COMMENT '模版类型编码',
  `status` int(10) DEFAULT NULL COMMENT '状态',
  `page_num` int(10) DEFAULT NULL COMMENT '页数',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人id',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `user_group_id` bigint(20) DEFAULT NULL COMMENT '业务组ID',
  `user_group_name` varchar(50) DEFAULT NULL COMMENT '业务组名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构id',
  `org_name` varchar(100) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `in_new_menu` int(2) DEFAULT '0' COMMENT '展示（2：只展示在新菜单，1：两者都展示，0：只展示在合同抄写）',
  `sort` int(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `template_name` (`template_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1214 DEFAULT CHARSET=utf8 COMMENT='模版表';

-- ----------------------------
-- Table structure for loan_template_bank
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_bank`;
CREATE TABLE `loan_template_bank` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模版ID',
  `bank_id` bigint(20) DEFAULT NULL COMMENT '银行ID',
  `bank_name` varchar(50) DEFAULT NULL COMMENT '银行名称',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8203 DEFAULT CHARSET=utf8 COMMENT='模版银行对应表';

-- ----------------------------
-- Table structure for loan_template_content
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_content`;
CREATE TABLE `loan_template_content` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模版id',
  `template_content` varchar(14000) DEFAULT NULL COMMENT '模版名称',
  `file_path` varchar(300) DEFAULT NULL COMMENT '上传路径',
  `page_id` int(10) DEFAULT NULL COMMENT '页码',
  `status` int(10) DEFAULT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `in_new_menu` int(2) DEFAULT '0' COMMENT '是否展示在新菜单（1：是，0：否）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12750 DEFAULT CHARSET=utf8 COMMENT='模版内容表';

-- ----------------------------
-- Table structure for loan_template_content_repair
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_content_repair`;
CREATE TABLE `loan_template_content_repair` (
  `template_name` varchar(200) NOT NULL COMMENT 'id',
  `page_id` bigint(20) DEFAULT NULL,
  `template_content` varchar(14000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for loan_template_file
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_file`;
CREATE TABLE `loan_template_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `business_id` bigint(20) DEFAULT NULL COMMENT '业务关联主键',
  `file_name` varchar(200) DEFAULT NULL COMMENT '文件名称',
  `file_size` decimal(18,2) DEFAULT NULL COMMENT '文件大小（k）',
  `file_path` varchar(300) DEFAULT NULL COMMENT '上传路径',
  `is_inuse` int(1) DEFAULT NULL COMMENT '使用启用（1：启用2：停用）',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8 COMMENT='模版图片表';

-- ----------------------------
-- Table structure for loan_template_org
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_org`;
CREATE TABLE `loan_template_org` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模版ID',
  `org_id` bigint(20) DEFAULT NULL COMMENT '适用机构ID',
  `org_name` varchar(50) DEFAULT NULL COMMENT '适用机构名称',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17575 DEFAULT CHARSET=utf8 COMMENT='模版机构对应表';

-- ----------------------------
-- Table structure for loan_template_org_bak_20180514
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_org_bak_20180514`;
CREATE TABLE `loan_template_org_bak_20180514` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT '主键',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模版ID',
  `org_id` bigint(20) DEFAULT NULL COMMENT '适用机构ID',
  `org_name` varchar(50) DEFAULT NULL COMMENT '适用机构名称',
  `create_time` datetime NOT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for loan_template_org_skew
-- ----------------------------
DROP TABLE IF EXISTS `loan_template_org_skew`;
CREATE TABLE `loan_template_org_skew` (
  `id` int(11) NOT NULL COMMENT '主键',
  `org_id` bigint(20) NOT NULL COMMENT '机构ID',
  `template_id` bigint(20) NOT NULL COMMENT '模板ID',
  `page_id` int(11) NOT NULL COMMENT '页码',
  `X` int(11) DEFAULT NULL COMMENT 'X轴偏移距离',
  `Y` int(11) DEFAULT NULL COMMENT 'Y轴偏移距离',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for opening_bank_info
-- ----------------------------
DROP TABLE IF EXISTS `opening_bank_info`;
CREATE TABLE `opening_bank_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bank_code` varchar(55) DEFAULT NULL COMMENT '银行编号',
  `bank_name` varchar(45) NOT NULL COMMENT '银行名称',
  `status` int(11) DEFAULT '1' COMMENT '状态：1:启用，0：停用',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '0：未删除，1：已删除',
  `user_id` bigint(20) DEFAULT NULL COMMENT '登记人ID',
  `user_name` varchar(50) DEFAULT NULL COMMENT '用户名称',
  `org_id` bigint(20) DEFAULT NULL COMMENT '用户机构ID',
  `org_name` varchar(20) DEFAULT NULL COMMENT '用户机构编号',
  `create_time` datetime DEFAULT NULL COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8 COMMENT='开放银行信息表';

-- ----------------------------
-- Table structure for other_fee_apply
-- ----------------------------
DROP TABLE IF EXISTS `other_fee_apply`;
CREATE TABLE `other_fee_apply` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cost_type` varchar(50) DEFAULT NULL COMMENT '费用类型',
  `cost_category` varchar(50) DEFAULT NULL COMMENT '费用类别',
  `cost_name` varchar(50) DEFAULT NULL COMMENT '费用名称',
  `application_number` varchar(200) DEFAULT NULL COMMENT '诉讼申请编号',
  `handle_legal` varchar(50) DEFAULT NULL COMMENT '经办法务',
  `case_course` varchar(50) DEFAULT NULL COMMENT '案件进程',
  `loan_number` varchar(200) DEFAULT NULL COMMENT '贷款编号',
  `client_name` varchar(50) DEFAULT NULL COMMENT '客户名称',
  `client_manager` varchar(50) DEFAULT NULL COMMENT '客户经理',
  `company_name` varchar(200) DEFAULT NULL COMMENT '业务机构',
  `cost_money` bigint(20) DEFAULT NULL COMMENT '申请金额',
  `payment_method` varchar(50) DEFAULT NULL COMMENT '付款方式',
  `payee_name` varchar(50) DEFAULT NULL COMMENT '收款人名称',
  `payee_account` bigint(20) DEFAULT NULL COMMENT '收款账号',
  `payee_bank` varchar(50) DEFAULT NULL COMMENT '收款银行',
  `handle_name` varchar(50) DEFAULT NULL COMMENT '经办人',
  `cost_create_time` datetime DEFAULT NULL COMMENT '费用发生日期',
  `remarks` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for out_ref_document_dir
-- ----------------------------
DROP TABLE IF EXISTS `out_ref_document_dir`;
CREATE TABLE `out_ref_document_dir` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `out_ref_id` bigint(20) DEFAULT NULL COMMENT '外部关联id',
  `out_ref_type` varchar(31) DEFAULT NULL COMMENT '外部关联表',
  `dir_templet_id` bigint(20) DEFAULT NULL COMMENT '模板id',
  `bank_code` varchar(31) DEFAULT NULL COMMENT '银行编号',
  `bank_name` varchar(31) DEFAULT NULL COMMENT '银行名称',
  `object_type` varchar(127) DEFAULT NULL COMMENT '业务类型',
  `dir_class` varchar(2) DEFAULT NULL COMMENT '目录分类（1：项目文档，2：二手车汽车资料，3：新车汽车资料，4：贷前汽车资料，5：其他）',
  `doc_type` varchar(2) DEFAULT NULL COMMENT '该目录存放的文件类型（1：图片，2：视频）',
  `dir_no` varchar(31) DEFAULT NULL COMMENT '文档编号',
  `sort` int(1) DEFAULT NULL COMMENT '顺序',
  `is_inuse` bit(1) DEFAULT b'1' COMMENT '是否启用（0：停用，1：启用）',
  `chk_disabled` bit(1) DEFAULT NULL COMMENT '是否可编辑 (1:否，0:是）',
  `pic_num` int(1) DEFAULT NULL COMMENT '控制数量',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='外部关联文档目录表';

-- ----------------------------
-- Table structure for quota_node
-- ----------------------------
DROP TABLE IF EXISTS `quota_node`;
CREATE TABLE `quota_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business_type` varchar(255) DEFAULT NULL,
  `node_key` varchar(255) DEFAULT NULL,
  `describe` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for release_note
-- ----------------------------
DROP TABLE IF EXISTS `release_note`;
CREATE TABLE `release_note` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `notice_type` int(4) DEFAULT NULL COMMENT '消息所属分类(一级),参见枚举或数据字典',
  `notice_type_code` varchar(32) DEFAULT NULL COMMENT '消息所属分类标识(一级)',
  `notice_type_name` varchar(32) DEFAULT NULL COMMENT '消息所属分类名称(一级)',
  `notice_key` int(4) DEFAULT NULL COMMENT '消息所属分类(二级),参见枚举或数据字典',
  `notice_key_code` varchar(32) DEFAULT NULL COMMENT '消息所属分类标识(二级)',
  `notice_key_name` varchar(32) DEFAULT NULL COMMENT '消息所属分类名称(二级)',
  `bop_info_id` bigint(20) DEFAULT NULL COMMENT '消息关联的待办Id(业务流程对象表主键)',
  `title` varchar(100) DEFAULT NULL COMMENT '消息标题',
  `message` varchar(2048) DEFAULT NULL COMMENT '消息正文',
  `dest_user_id` bigint(20) DEFAULT NULL COMMENT '目标推送用户Id',
  `dest_user_name` varchar(50) DEFAULT NULL COMMENT '目标推送用户姓名',
  `is_read` int(1) NOT NULL DEFAULT '0' COMMENT '阅读状态(0:未读;1:已读)',
  `read_time` datetime DEFAULT NULL COMMENT '阅读时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`,`create_time`),
  KEY `idx_dnn` (`dest_user_id`,`notice_type`,`notice_key`) USING BTREE,
  KEY `idx_is_read` (`is_read`) USING BTREE,
  KEY `idx_create_time` (`create_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=208030 DEFAULT CHARSET=utf8 COMMENT='消息通知表'
/*!50100 PARTITION BY RANGE (to_days(create_time))
(PARTITION P0 VALUES LESS THAN (737850) ENGINE = InnoDB,
 PARTITION P1 VALUES LESS THAN (737881) ENGINE = InnoDB,
 PARTITION P4 VALUES LESS THAN (737911) ENGINE = InnoDB,
 PARTITION P5 VALUES LESS THAN (737942) ENGINE = InnoDB,
 PARTITION P6 VALUES LESS THAN (737972) ENGINE = InnoDB,
 PARTITION P7 VALUES LESS THAN (738003) ENGINE = InnoDB,
 PARTITION P8 VALUES LESS THAN (738034) ENGINE = InnoDB,
 PARTITION P9 VALUES LESS THAN (738064) ENGINE = InnoDB,
 PARTITION P11 VALUES LESS THAN (738095) ENGINE = InnoDB,
 PARTITION P12 VALUES LESS THAN (738125) ENGINE = InnoDB,
 PARTITION P13 VALUES LESS THAN (738156) ENGINE = InnoDB,
 PARTITION P14 VALUES LESS THAN (738187) ENGINE = InnoDB,
 PARTITION P15 VALUES LESS THAN (738215) ENGINE = InnoDB,
 PARTITION P16 VALUES LESS THAN (738246) ENGINE = InnoDB,
 PARTITION P17 VALUES LESS THAN (738276) ENGINE = InnoDB,
 PARTITION P18 VALUES LESS THAN (738307) ENGINE = InnoDB,
 PARTITION P19 VALUES LESS THAN (738337) ENGINE = InnoDB,
 PARTITION P20 VALUES LESS THAN (738368) ENGINE = InnoDB,
 PARTITION P21 VALUES LESS THAN (738399) ENGINE = InnoDB,
 PARTITION P22 VALUES LESS THAN (738429) ENGINE = InnoDB,
 PARTITION P23 VALUES LESS THAN (738460) ENGINE = InnoDB,
 PARTITION P24 VALUES LESS THAN (738490) ENGINE = InnoDB,
 PARTITION P25 VALUES LESS THAN (738521) ENGINE = InnoDB,
 PARTITION P26 VALUES LESS THAN (738552) ENGINE = InnoDB,
 PARTITION P27 VALUES LESS THAN (738580) ENGINE = InnoDB,
 PARTITION P28 VALUES LESS THAN (738611) ENGINE = InnoDB,
 PARTITION P29 VALUES LESS THAN (738641) ENGINE = InnoDB,
 PARTITION P30 VALUES LESS THAN (738672) ENGINE = InnoDB,
 PARTITION P31 VALUES LESS THAN (738702) ENGINE = InnoDB,
 PARTITION P32 VALUES LESS THAN (738733) ENGINE = InnoDB,
 PARTITION P33 VALUES LESS THAN (738764) ENGINE = InnoDB,
 PARTITION P34 VALUES LESS THAN (738794) ENGINE = InnoDB,
 PARTITION P35 VALUES LESS THAN (738825) ENGINE = InnoDB,
 PARTITION P36 VALUES LESS THAN (738855) ENGINE = InnoDB,
 PARTITION P37 VALUES LESS THAN MAXVALUE ENGINE = InnoDB) */;

-- ----------------------------
-- Table structure for release_note_detail
-- ----------------------------
DROP TABLE IF EXISTS `release_note_detail`;
CREATE TABLE `release_note_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` int(10) DEFAULT NULL COMMENT '内容类型（1：说明文档，2：查看类型文档，3：下载类型文件 ）',
  `content` varchar(10000) DEFAULT NULL COMMENT '内容（文档下载路径或者内容）',
  `file_size` decimal(18,2) DEFAULT NULL COMMENT '文件大小（k）',
  `file_format` varchar(20) DEFAULT NULL COMMENT '文件格式',
  `group_index` int(10) DEFAULT NULL COMMENT '附件或文本消息发布批次（1开始）',
  `deleted` int(2) DEFAULT NULL COMMENT '是否删除(1是，0否)',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15875 DEFAULT CHARSET=utf8 COMMENT='发布说明详情';

-- ----------------------------
-- Table structure for release_note_file_del
-- ----------------------------
DROP TABLE IF EXISTS `release_note_file_del`;
CREATE TABLE `release_note_file_del` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL COMMENT '删除文件地址',
  `user_id` bigint(20) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息中心附件删除记录';

-- ----------------------------
-- Table structure for release_note_read_record
-- ----------------------------
DROP TABLE IF EXISTS `release_note_read_record`;
CREATE TABLE `release_note_read_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `release_id` bigint(20) DEFAULT NULL COMMENT '公告通知Id',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户Id',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `read_idx` (`release_id`,`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=24892 DEFAULT CHARSET=utf8 COMMENT='公告通知用户已读记录表';

-- ----------------------------
-- Table structure for tbl_ccms_etl_za_organization
-- ----------------------------
DROP TABLE IF EXISTS `tbl_ccms_etl_za_organization`;
CREATE TABLE `tbl_ccms_etl_za_organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '机构名称',
  `code` varchar(255) DEFAULT NULL COMMENT '机构编码，唯一，暂时由产品维护',
  `type` varchar(255) DEFAULT NULL COMMENT '组织类型：集团，分公司，部门，业务组 (HEAD_COMPANY,BRANCH_COMPANY,DEPARTMENT,BUSINESS_GROUP)',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级机构id',
  `manager_id` int(11) DEFAULT NULL COMMENT '负责人userid',
  `fax` varchar(255) DEFAULT NULL COMMENT '传真',
  `telephone` varchar(255) DEFAULT NULL COMMENT '电话',
  `addr_province` varchar(255) DEFAULT NULL COMMENT '所在省',
  `addr_city` varchar(255) DEFAULT NULL COMMENT '所在市',
  `addr_area` varchar(255) DEFAULT NULL COMMENT '所在区',
  `addr_province_name` varchar(255) DEFAULT NULL COMMENT '所在省名称',
  `addr_city_name` varchar(255) DEFAULT NULL COMMENT '所在市名称',
  `addr_area_name` varchar(255) DEFAULT NULL COMMENT '所在区名称',
  `addr_detail` varchar(255) DEFAULT NULL COMMENT '详细地址',
  `founded_time` varchar(255) DEFAULT NULL COMMENT '成立时间',
  `contact_realname` varchar(255) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` varchar(255) DEFAULT NULL COMMENT '联系人电话',
  `contact_email` varchar(255) DEFAULT NULL COMMENT '联系人邮箱',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `state` tinyint(1) DEFAULT '0' COMMENT '状态字段 0.未同步 1.同步成功',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统标识',
  `old_id` varchar(255) DEFAULT NULL COMMENT '旧主键',
  `org_coop_type` int(2) DEFAULT NULL COMMENT '合作类型，区分陕西辽宁等',
  `short_name` varchar(50) DEFAULT NULL COMMENT '机构简称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='振安机构表（同步自振安）';

-- ----------------------------
-- Table structure for template_settings
-- ----------------------------
DROP TABLE IF EXISTS `template_settings`;
CREATE TABLE `template_settings` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) DEFAULT NULL COMMENT '模板名称',
  `type` int(2) DEFAULT NULL COMMENT '模板类型  1：逾期导入 2：合同导入  3：银行放款导入',
  `start_row_number` int(10) DEFAULT NULL COMMENT '数据开始行数',
  `bank_id` varchar(1024) DEFAULT NULL COMMENT '合作银行IDS',
  `bank_name` varchar(1024) DEFAULT NULL COMMENT '合作银行名称',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` int(2) DEFAULT NULL COMMENT '启用状态 0：未启用  1：启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='模板设置主表';

-- ----------------------------
-- Table structure for template_settings_column
-- ----------------------------
DROP TABLE IF EXISTS `template_settings_column`;
CREATE TABLE `template_settings_column` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `template_id` bigint(20) DEFAULT NULL COMMENT '模板ID',
  `name` varchar(20) DEFAULT NULL COMMENT '系统字段名称',
  `field_name` varchar(50) DEFAULT NULL COMMENT '字段名称',
  `execel_id` varchar(30) DEFAULT NULL COMMENT 'excel_id',
  `type` int(10) DEFAULT NULL COMMENT '字段类型   1:匹配项 2:导入值',
  `create_time` datetime DEFAULT NULL,
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1796 DEFAULT CHARSET=utf8 COMMENT='excel模板列表';

-- ----------------------------
-- Table structure for user_coop_company
-- ----------------------------
DROP TABLE IF EXISTS `user_coop_company`;
CREATE TABLE `user_coop_company` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(40) DEFAULT NULL COMMENT '用户名，现统一为手机号',
  `level` int(4) DEFAULT NULL COMMENT '保留字段，用户级别',
  `external_assets_partner_name` varchar(255) DEFAULT NULL COMMENT '外部资产合作伙伴',
  `external_assets_partner_id` int(11) DEFAULT NULL COMMENT '外部资产合作伙伴ID',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=3589 DEFAULT CHARSET=utf8 COMMENT='外部资产合作伙伴信息表';

-- ----------------------------
-- Table structure for user_message_config
-- ----------------------------
DROP TABLE IF EXISTS `user_message_config`;
CREATE TABLE `user_message_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户Id',
  `message_status` int(1) NOT NULL DEFAULT '1' COMMENT '消息推送状态（1开，2关）',
  `todo_message_status` int(1) NOT NULL DEFAULT '1' COMMENT '待办消息推送状态（1开，2关）',
  `release_message_status` int(1) NOT NULL DEFAULT '1' COMMENT '公告消息推送状态（1开，2关）',
  `credit_message_status` int(1) NOT NULL DEFAULT '1' COMMENT '征信进度推送状态（1开，2关，0无权限）',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_idx` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=553 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for za_business
-- ----------------------------
DROP TABLE IF EXISTS `za_business`;
CREATE TABLE `za_business` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '业务名称',
  `type_id` int(11) DEFAULT NULL COMMENT '业务类型ID',
  `description` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='业务表\r\n';

-- ----------------------------
-- Table structure for za_business_type
-- ----------------------------
DROP TABLE IF EXISTS `za_business_type`;
CREATE TABLE `za_business_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '类型名称',
  `description` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='业务类型表\r\n';

-- ----------------------------
-- Table structure for za_cash_user
-- ----------------------------
DROP TABLE IF EXISTS `za_cash_user`;
CREATE TABLE `za_cash_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL COMMENT '支付密码',
  `salt` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT '当前状态：NORMAL,LOCKED,DEAD',
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `retry_count` int(11) DEFAULT '0' COMMENT '支付密码重试次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='支付用户表';

-- ----------------------------
-- Table structure for za_organization
-- ----------------------------
DROP TABLE IF EXISTS `za_organization`;
CREATE TABLE `za_organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '机构名称',
  `code` varchar(255) NOT NULL COMMENT '机构编码，系统创建，就6位数字1、2位表示总行，3、4位表示分行，5、6位表示支行',
  `type` varchar(255) DEFAULT NULL COMMENT '机构类型为 HEAD_COMPANY:"总行", BRANCH_COMPANY:"分行", SUB_BRANCH:"支行" 3种',
  `parent_id` int(11) DEFAULT NULL COMMENT '上级机构id',
  `manager_id` int(11) DEFAULT NULL COMMENT '负责人userid',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `state` tinyint(1) DEFAULT '0' COMMENT '状态字段 0.未同步 1.同步成功',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统标识',
  `old_id` varchar(255) DEFAULT NULL COMMENT '旧主键',
  `org_coop_type` int(2) DEFAULT NULL COMMENT '合作类型，区分陕西辽宁等',
  `short_name` varchar(50) DEFAULT NULL COMMENT '机构简称',
  `level` int(2) NOT NULL COMMENT '合作机构编码',
  `electronic_stamp_pic` varchar(255) DEFAULT NULL COMMENT '电子印章图片',
  PRIMARY KEY (`id`,`code`) USING BTREE,
  KEY `idx_type` (`parent_id`) USING BTREE,
  KEY `idx_parent_id` (`parent_id`) USING BTREE,
  KEY `idx_code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8 COMMENT='机构表\r\n';

-- ----------------------------
-- Table structure for za_organization_guarantee
-- ----------------------------
DROP TABLE IF EXISTS `za_organization_guarantee`;
CREATE TABLE `za_organization_guarantee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) DEFAULT NULL COMMENT '分公司机构ID',
  `guarantee_id` int(11) DEFAULT NULL COMMENT '担保主体ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`org_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分公司与担保机构关联表';

-- ----------------------------
-- Table structure for za_organization_member
-- ----------------------------
DROP TABLE IF EXISTS `za_organization_member`;
CREATE TABLE `za_organization_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `realname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '电话',
  `org_type` varchar(255) DEFAULT NULL COMMENT '类型：业务组，业务组',
  `org_id` int(11) DEFAULT NULL COMMENT '机构id',
  `org_name` varchar(255) DEFAULT NULL COMMENT '机构名称',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_org_id` (`org_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='业务组成员表';

-- ----------------------------
-- Table structure for za_role
-- ----------------------------
DROP TABLE IF EXISTS `za_role`;
CREATE TABLE `za_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime NOT NULL COMMENT '修改时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `role_code` varchar(50) DEFAULT NULL COMMENT '角色编码',
  `state` int(8) DEFAULT NULL COMMENT '使用状态',
  `role_code_un` varchar(45) DEFAULT NULL COMMENT '角色唯一标识',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Table structure for za_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `za_role_menu`;
CREATE TABLE `za_role_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `menu_id` int(11) DEFAULT NULL COMMENT '菜单ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_role_id` (`role_id`) USING BTREE,
  KEY `idx_menu_id` (`menu_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=121536 DEFAULT CHARSET=utf8 COMMENT='角色菜单关联表\r\n';

-- ----------------------------
-- Table structure for za_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `za_role_resource`;
CREATE TABLE `za_role_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统类型：CLS',
  `resource_type` varchar(255) DEFAULT NULL COMMENT '资源类型，如流程类型',
  `resource_status` varchar(255) DEFAULT NULL COMMENT '资源状态，如节点状态',
  `resource_ids` varchar(1000) DEFAULT NULL COMMENT '保留字段，资源ID列表',
  `note` varchar(255) DEFAULT NULL COMMENT '说明',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`) USING BTREE,
  KEY `idx_resource_type_resource_status` (`resource_type`,`resource_status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=44216 DEFAULT CHARSET=utf8 COMMENT='资源权限表，目前主要是节点权限';

-- ----------------------------
-- Table structure for za_sys
-- ----------------------------
DROP TABLE IF EXISTS `za_sys`;
CREATE TABLE `za_sys` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sys_type` varchar(255) DEFAULT NULL,
  `sys_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for za_sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `za_sys_menu`;
CREATE TABLE `za_sys_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '系统类型，默认为CLS，以后新加系统以此字段区分',
  `menu_name` varchar(255) DEFAULT NULL COMMENT '菜单名，如 客户管理',
  `menu_type` varchar(255) DEFAULT NULL COMMENT '菜单类型：URL,BUTTON',
  `url` varchar(255) DEFAULT NULL COMMENT '菜单链接地址',
  `parent_id` int(11) DEFAULT NULL COMMENT '父模块ID',
  `business_code` varchar(64) DEFAULT NULL COMMENT '业务编码',
  `orders` int(4) DEFAULT NULL COMMENT '序号，排序用',
  `logo_tag` varchar(255) DEFAULT NULL COMMENT 'LOGO标识',
  `menu_group` varchar(255) DEFAULT NULL COMMENT '所属按钮组',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `flag` int(8) DEFAULT NULL COMMENT '菜单类型(1、后台菜单，2、前台菜单)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_business_code` (`business_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1702 DEFAULT CHARSET=utf8 COMMENT='中安系统菜单表';

-- ----------------------------
-- Table structure for za_user
-- ----------------------------
DROP TABLE IF EXISTS `za_user`;
CREATE TABLE `za_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主ID',
  `username` varchar(40) DEFAULT NULL COMMENT '用户名，现统一为手机号',
  `job_no` varchar(50) DEFAULT NULL COMMENT '工号',
  `user_code` varchar(50) DEFAULT NULL COMMENT '身份证号',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `salt` varchar(255) DEFAULT NULL COMMENT '密码加密盐值',
  `realname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `sex` int(8) DEFAULT NULL COMMENT '性别',
  `age` int(8) DEFAULT NULL COMMENT '年龄',
  `permissions` varchar(1000) DEFAULT NULL COMMENT '保留字段，特殊权限列表，英文逗号分隔',
  `level` int(4) DEFAULT NULL COMMENT '保留字段，用户级别',
  `company_id` int(11) DEFAULT NULL COMMENT '分公司ID，因为使用场景较多，故加之',
  `department_id` int(11) DEFAULT NULL COMMENT '所属部门ID',
  `bz_group_id` int(11) DEFAULT NULL COMMENT '所属业务组ID',
  `company_name` varchar(255) DEFAULT NULL COMMENT '所属分公司名称',
  `department_name` varchar(255) DEFAULT NULL COMMENT '所属部门名称',
  `bz_group_name` varchar(255) DEFAULT NULL COMMENT '所属业务组名称',
  `addr_province` varchar(255) DEFAULT NULL,
  `addr_city` varchar(255) DEFAULT NULL,
  `addr_area` varchar(255) DEFAULT NULL,
  `addr_detail` varchar(255) DEFAULT NULL COMMENT '详情地址，带上省市区',
  `is_on_duty` int(11) NOT NULL DEFAULT '1' COMMENT '是否在岗(0-否;1-是)',
  `status` varchar(255) DEFAULT NULL COMMENT '当前状态：NORMAL,LOCKED,DEAD',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近修改时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  `sys_type` varchar(255) DEFAULT NULL COMMENT '用户系统范围（cls_1/cls_2/cs_1/cs_2）',
  `data_authority` varchar(100) DEFAULT NULL COMMENT '数据权限',
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE KEY `uniq_username` (`username`) USING BTREE,
  KEY `idx_status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=906 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Table structure for za_user_guarantee
-- ----------------------------
DROP TABLE IF EXISTS `za_user_guarantee`;
CREATE TABLE `za_user_guarantee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `guarantee_id` int(11) DEFAULT NULL COMMENT '担保主体ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户与担保机构关联表';

-- ----------------------------
-- Table structure for za_user_role
-- ----------------------------
DROP TABLE IF EXISTS `za_user_role`;
CREATE TABLE `za_user_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `realname` varchar(255) DEFAULT NULL COMMENT '姓名',
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `branch_company_id` int(11) DEFAULT NULL COMMENT '分公司ID',
  `business_group_id` int(11) DEFAULT NULL COMMENT '业务组ID',
  `note` varchar(1000) DEFAULT NULL COMMENT '说明',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `lower_limit` decimal(10,0) DEFAULT '0',
  `upper_limit` decimal(10,0) DEFAULT '0',
  `second_car_limit` decimal(10,0) DEFAULT NULL COMMENT '客户经理二手车过户流程尚未结束的贷款数量配置',
  PRIMARY KEY (`Id`),
  KEY `idx_user_id` (`user_id`) USING BTREE,
  KEY `idx_role_id` (`role_id`) USING BTREE,
  KEY `idx_business_group_id_branch_company_id` (`business_group_id`,`branch_company_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10997 DEFAULT CHARSET=utf8 COMMENT='用户角色关联表';

-- ----------------------------
-- Table structure for za_user_task_unavailable
-- ----------------------------
DROP TABLE IF EXISTS `za_user_task_unavailable`;
CREATE TABLE `za_user_task_unavailable` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户Id',
  `unavailable_start_day` int(11) DEFAULT NULL COMMENT '不稳定时间起始日-YYYYMMDD',
  `unavailable_end_day` int(11) DEFAULT NULL COMMENT '不稳定时间截止日-YYYYMMDD',
  `unavailable_time` varchar(100) DEFAULT NULL COMMENT '不稳定时间段(1400-1600|0900-1000)',
  `unavailable_reason` varchar(100) DEFAULT NULL COMMENT '不稳定原因',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for za_user_task_weight
-- ----------------------------
DROP TABLE IF EXISTS `za_user_task_weight`;
CREATE TABLE `za_user_task_weight` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户Id',
  `weight` int(11) DEFAULT NULL COMMENT '用户任务权重',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for za_user_verfication_code
-- ----------------------------
DROP TABLE IF EXISTS `za_user_verfication_code`;
CREATE TABLE `za_user_verfication_code` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) DEFAULT NULL COMMENT '用户名',
  `verification_code` varchar(10) DEFAULT NULL COMMENT '验证码',
  `create_time` datetime DEFAULT NULL COMMENT '发送时间',
  `create_user` varchar(50) DEFAULT NULL COMMENT '验证码获取用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for zd_gps_info
-- ----------------------------
DROP TABLE IF EXISTS `zd_gps_info`;
CREATE TABLE `zd_gps_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `company_id` bigint(20) DEFAULT NULL COMMENT '分公司ID',
  `company_name` varchar(255) DEFAULT NULL COMMENT '分公司名称',
  `province` varchar(6) DEFAULT NULL COMMENT '所在省编码',
  `province_name` varchar(128) DEFAULT NULL COMMENT '所在省',
  `city` varchar(6) DEFAULT NULL COMMENT '所在市编码',
  `city_name` varchar(64) DEFAULT NULL COMMENT '所在市',
  `statistics_type` int(4) DEFAULT NULL COMMENT '统计类型，1：按月，2：按季，3：按年',
  `year` int(11) DEFAULT NULL COMMENT '年份',
  `quarter` int(11) DEFAULT NULL COMMENT '季度（1到4）',
  `month` int(11) DEFAULT NULL COMMENT '月份（1到12）',
  `year_rate` decimal(10,2) DEFAULT NULL COMMENT 'gps安装量同比',
  `gps_count` int(11) DEFAULT NULL COMMENT 'gps安装量',
  `gps_rate` decimal(6,2) DEFAULT NULL COMMENT 'gps安装率',
  `month_rate` decimal(10,2) DEFAULT NULL COMMENT 'gps安装量环比',
  `note` varchar(1000) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5194 DEFAULT CHARSET=utf8 COMMENT='GPS安装情况表';

-- ----------------------------
-- Procedure structure for inserOrUpdate
-- ----------------------------
DROP PROCEDURE IF EXISTS `inserOrUpdate`;
delimiter ;;
CREATE PROCEDURE `car-loan`.`inserOrUpdate`()
BEGIN
	#--------------------
	#SQLEXCEPTION 对应存储过程执行中所有异常
	#@Auth:
	#@time:
	#--------------------
	#标志是否出错
DECLARE errno TINYINT DEFAULT '0';

#如sql异常,将errno设置为1且后续执行退出
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
BEGIN
	ROLLBACK;
SET errno = 1;
END;

#开启事务
START TRANSACTION;

#将loan_template_org数据备份到loan_template_org_bak_20180514中
CREATE TABLE loan_template_bank_bak_20180518 AS SELECT
	*
FROM
	`loan_template_bank`;

#插入新的数据
INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-信用卡分期付款业务支行调查审查表（适用授信20万以上）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-信用卡分期付款业务支行调查审查表（适用二手车新系统）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-委托书';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-汽车消费贷款购车协议20171219';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-中国工商银行信用卡购车专项分期商品订购单20170925';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-购车分期付款代理协议（@车）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-购车分期付款代理协议';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-首付证明';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-送达地址确认书';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-授权委托书（@车消费分期）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-授权委托书';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-共同偿债人承诺书';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-信用卡分期付款面谈记录';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-征信查询授权书（担保人）20171016';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-征信查询授权书20171016';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-个人税收居民身份声明';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-担保承诺函（含@车消费分期）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-担保承诺函';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-信用卡分期付款业务放款核准表（适用新系统）';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-牡丹卡购车及“@车”分期付款业务申请书';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-牡丹卡购车分期付款业务申请书（一式三联）20171213';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-婚姻证明';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-牡丹购车贷记卡用卡须知';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-委托书20180228';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-中国工商银行信用卡专项分期付款/担保（抵押、质押及保证）合同20180307';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-信用卡申请表20180309';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-牡丹卡信用卡“@车”消费分期付款业务申请书20180205';


INSERT IGNORE INTO loan_template_bank (template_id,bank_id,create_time)
SELECT id ,10,SYSDATE() from loan_template 
WHERE template_name ='印刷-工银信用卡申请表（新格式）20180319';

#errno为1,事务回滚sql
SELECT
	errno;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for search_message
-- ----------------------------
DROP PROCEDURE IF EXISTS `search_message`;
delimiter ;;
CREATE PROCEDURE `car-loan`.`search_message`()
BEGIN
		DECLARE varId INT(11);
		DECLARE varParentId INT(11);
		DECLARE varNote VARCHAR(255);
		DECLARE varStatus INT(1);

		DECLARE flag INT DEFAULT 0;
		
		DECLARE messageCursor CURSOR FOR    
		SELECT mid,parent_id,note,status from cls_message_board where parent_id IS NULL;
		DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET flag=1;

	  CREATE TEMPORARY TABLE IF NOT EXISTS temp(
				mid INT(11),
				parentId INT(11),
				note VARCHAR(255),
				state INT(1)
		);
		
		OPEN messageCursor;
		loop_label: LOOP
				FETCH messageCursor INTO varId,varParentId,varNote,varStatus;
				
				IF flag=1 THEN 
					LEAVE loop_label;
				END IF;

				INSERT INTO temp (mid,parentId,note,state) VALUES (varId,varParentId,varNote,varStatus);
				IF varStatus=1 THEN
					INSERT INTO temp SELECT mid,parent_id,note,status FROM cls_message_board where parent_id=varId;
				END IF;
		END LOOP loop_label;
		CLOSE messageCursor;
	
		SELECT * FROM temp  ;
	
		DROP TEMPORARY TABLE IF EXISTS temp ;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
