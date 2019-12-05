<template>
  <div class="SimpleCalculator">
    <div class="nav" v-if="this.navShow">
      <x-header :left-options="{backText: '',preventGoBack:true }" @on-click-back="customerBack()" >简易计算器</x-header>
    </div>
    <div class="calculatorBox">
      <div class="calculatorTop">
        <div class="title">选择计算器类型</div>
        <div class="chooseBox">
          <div class="choose" v-for="(item,index) in showChoose" :key="index" @click="chooseButton(index)">
            <div class="radioChoose">
              <div class="ok" v-show='item'></div>
            </div>
            <div class="radioTitle">
              {{ showButtonTxt[index] }}
            </div>
          </div>
        </div>
        <div class="calculatorInput">
          <div class="calculatorInputTitle">贷款金额（元）</div>
          <div class="calculatorInputValue">
            <input type="number" placeholder="请输入贷款金额" class="input" v-model='AA' @blur='blurAA'>
          </div>
        </div>
        <div class="calculatorInput">
          <div class="calculatorInputTitle">贷款期限（月）</div>
          <div class="calculatorInputValue" @click="openPopup()">
            <div :class="['select',{ 'select2': chooseBB}]">{{ txtBB }}</div>
            <div class="selectDot"></div>
          </div>
        </div> 
        <div class="calculatorInput" v-show='showChoose[0]'>
          <div class="calculatorInputTitle">年利率（%）</div>
          <div class="calculatorInputValue">
            <input type="number" placeholder="请输入年利率" class="input" v-model='CC'  @blur='blurCC'>
          </div>
        </div>  
        <div class="calculatorInput" v-show='showChoose[1]'>
          <div class="calculatorInputTitle">月还款金额（元）</div>
          <div class="calculatorInputValue">
            <input type="number" placeholder="请输入月还款金额" class="input" v-model='DD'  @blur='blurDD'>
          </div>
        </div>
        <div class="calculatorInput" v-show='showChoose[2]'>
          <div class="calculatorInputTitle">月息</div>
          <div class="calculatorInputValue">
            <div class="monthInterest">
              <input type="number" placeholder="0~100" class="input2" v-model='EE2'  @blur='blurEE2'>  
            </div>
            <div class="monthInterest2">分</div>
            <div class="monthInterest">
              <input type="number" placeholder="0~9.99" class="input2" v-model='EE3' @blur='blurEE3'>   
            </div> 
            <div class="monthInterest2">厘</div>           
          </div>
        </div> 
        <div class="calculatorInput" v-show='showChoose[3]'>
          <div class="calculatorInputTitle">年息（%）</div>
          <div class="calculatorInputValue">
            <div :class="['year',{ 'year2': item }]" v-for="(item,index) in showYear" :key="index" @click="chooseYear(index)">
              {{ showYearTxt[index] }}
            </div>
            <input type="number" placeholder="请输入" class="input3" v-model='GG' @blur='blurGG'>           
          </div>
        </div>
        <div class="calculatorInput" v-show='showChoose[3]'>
          <div class="calculatorInputTitle">换算为月息</div>
          <div class="calculatorInputValue">
            <div class="monthInterest">
              <input type="number" placeholder="0~100" class="input2" :value='gg4one' readonly>  
            </div>
            <div class="monthInterest2">分</div>
            <div class="monthInterest">
              <input type="number" placeholder="0~9.99" class="input2" :value='gg4two' readonly>  
            </div> 
            <div class="monthInterest2">厘</div>           
          </div>
        </div>                                             
      </div>
      <div class="calculatorCenter">
        <div class="reset" @click='resetMoney'>重置</div> 
        <div class="add" @click='addMoney'>计算</div>
      </div> 
      <div class="calculatorBottom">
        <div class="showDataTitle">计算结果</div>
        <div class="showDataList" v-show='showChoose[0]'>
          <div class="dataShow">
            <div class="dataShowLeft">日还款额</div>
            <div class="dataShowRight">{{ bb1 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">月还款额</div>
            <div class="dataShowRight">{{ aa1 }}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">总还款额</div>
            <div class="dataShowRight">{{ cc1 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">利息总额</div>
            <div class="dataShowRight">{{ dd1 }}</div>
          </div>  
          <div class="dataShow">
            <div class="dataShowLeft">手续费率</div>
            <div class="dataShowRight">{{ ee1 | percentageFilter}}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">年手续费率</div>
            <div class="dataShowRight">{{ ff1 | percentageFilter}}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">月息</div>
            <div class="dataShowRight">{{ gg1 | pointsFilter}}</div>
          </div>                                      
        </div>
        <div class="showDataList" v-show='showChoose[1]'>
          <div class="dataShow">
            <div class="dataShowLeft">月利率</div>
            <div class="dataShowRight">{{ hh2 | percentageFilter}}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">年利率</div>
            <div class="dataShowRight">{{ ii2 | percentageFilter}}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">总还款额</div>
            <div class="dataShowRight">{{ cc2 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">利息总额</div>
            <div class="dataShowRight">{{ dd2 }}</div>
          </div>  
          <div class="dataShow">
            <div class="dataShowLeft">手续费率</div>
            <div class="dataShowRight">{{ ee2 | percentageFilter}}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">年手续费率</div>
            <div class="dataShowRight">{{ ff2 | percentageFilter}}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">月息</div>
            <div class="dataShowRight">{{ gg2 | pointsFilter}}</div>
          </div>                                      
        </div> 
        <div class="showDataList" v-show='showChoose[2]'>
          <div class="dataShow">
            <div class="dataShowLeft">年利率</div>
            <div class="dataShowRight">{{ ii3 | percentageFilter}}</div>
          </div>          
          <div class="dataShow">
            <div class="dataShowLeft">日还款额</div>
            <div class="dataShowRight">{{ bb3 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">月还款额</div>
            <div class="dataShowRight">{{ aa3 }}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">总还款额</div>
            <div class="dataShowRight">{{ cc3 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">利息总额</div>
            <div class="dataShowRight">{{ dd3 }}</div>
          </div>  
          <div class="dataShow">
            <div class="dataShowLeft">手续费率</div>
            <div class="dataShowRight">{{ ee3 | percentageFilter}}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">年手续费率</div>
            <div class="dataShowRight">{{ ff3 | percentageFilter}}</div>
          </div>                                      
        </div> 
        <div class="showDataList" v-show='showChoose[3]'>
          <div class="dataShow">
            <div class="dataShowLeft">年利率</div>
            <div class="dataShowRight">{{ ii4 | percentageFilter}}</div>
          </div>          
          <div class="dataShow">
            <div class="dataShowLeft">日还款额</div>
            <div class="dataShowRight">{{ bb4 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">月还款额</div>
            <div class="dataShowRight">{{ aa4 }}</div>
          </div> 
          <div class="dataShow">
            <div class="dataShowLeft">总还款额</div>
            <div class="dataShowRight">{{ cc4 }}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">利息总额</div>
            <div class="dataShowRight">{{ dd4 }}</div>
          </div>  
          <div class="dataShow">
            <div class="dataShowLeft">手续费率</div>
            <div class="dataShowRight">{{ ee4 | percentageFilter}}</div>
          </div>
          <div class="dataShow">
            <div class="dataShowLeft">年手续费率</div>
            <div class="dataShowRight">{{ ff4 | percentageFilter}}</div>
          </div>                                      
        </div>                     
      </div> 
      <div class="calculatorPadding"></div>         
    </div>

    
    <div class="popupSelectBoxBg" v-if="showPopup" @click="closePopup()"></div>
    <div class="popupSelectBox" v-if="showPopup">
      <div class="selectBox">
        <div class="selectOne" v-for="(item,index) in showPopupMonths" :key="index" @click="closePopup(item)">{{item}}</div>
      </div>
      <div class="cacel" @click="closePopup()">取消</div>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";

//PMT算法
export const getPMT = (rate, nper, pv, fv, type) => {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv)/nper;
  
  var pvif = Math.pow(1 + rate, nper);
  var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

  if (type == 1) {
    pmt /= (1 + rate);
  };

  return -pmt;
}
//RATE算法
export const getRATE = (nper, pmt, pv, fv, type, guess) => {
    // Sets default values for missing parameters
    fv = typeof fv !== 'undefined' ? fv : 0;
    type = typeof type !== 'undefined' ? type : 0;
    guess = typeof guess !== 'undefined' ? guess : 0.1;

    // Sets the limits for possible guesses to any
    // number between 0% and 100%
    var lowLimit = 0;
    var highLimit = 1;

   // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
   // the solution as valid.
   var tolerance = Math.abs(0.00000005 * pmt);

   // Tries at most 40 times to find a solution within the tolerance.
   for (var i = 0; i < 40; i++) {
       // Resets the balance to the original pv.
       var balance = pv;

       // Calculates the balance at the end of the loan, based
       // on loan conditions.
       for (var j = 0; j < nper; j++ ) {
           if (type == 0) {
               // Interests applied before payment
               balance = balance * (1 + guess) + pmt;
           } else {
               // Payments applied before insterests
               balance = (balance + pmt) * (1 + guess);
           }
       }

       // Returns the guess if balance is within tolerance.  If not, adjusts
       // the limits and starts with a new guess.
       if (Math.abs(balance + fv) < tolerance) {
           return guess;
       } else if (balance + fv > 0) {
           // Sets a new highLimit knowing that
           // the current guess was too big.
           highLimit = guess;
       } else  {
           // Sets a new lowLimit knowing that
           // the current guess was too small.
           lowLimit = guess;
       }

       // Calculates the new guess.
       guess = (highLimit + lowLimit) / 2;
   }

   // Returns null if no acceptable result was found after 40 tries.
   return null;
}
//保留两位
export const toFixedMoney = (num) => {
  let str = num.toFixed(2) + '';
  return str
}
//保留5位
export const toFixedPoints = (num) => {
  let str = num.toFixed(5) + '';
  return str
}
//是否正浮点数
export const judgeZhengNumber = (str) => {	
  var reg = /^[1-9]\d*(\.\d*|0\.\d*[1-9]\d*)?$/
	return reg.test(str)
}
//0-100的数字
export const judge100Number = (str) => {	
	var reg = /^[0-9]{1,2}$|^100$/
	return reg.test(str)
}
//0-9.99的数字
export const judgeTenNumber = (str) => {	
	var reg = /^[0-9](\.[0-9]{1,2})?$/
	return reg.test(str)
}

export default {
  name: "simpleCalculator",
  data() {
    return {
      navShow: true,
      //按钮计算器
      chooseIndex: 0,
      showChoose: [true,false,false,false],
      showButtonTxt: ['知利率算月供','知月供算利率','知月息算利率','知年息算利率'],
      //选年限
      showYear: [false,false,true],
      showYearTxt: ['一年','二年','三年'],
      //弹窗
      showPopup: false,
      showPopupMonths: [12,24,36,48,60],
      //输入参数
      AA: '',
      BB: '',
      CC: '',
      DD: '',
      EE: '',
      EE2: '',
      EE3: '',
      FF: 3,
      GG: '',
      //输出参数1
      aa1: '0.00',
      bb1: '0.00',
      cc1: '0.00',
      dd1: '0.00',
      ee1: '0.00',
      ff1: '0.00',
      gg1: '0.00',
      //输出参数2
      cc2: '0.00',
      dd2: '0.00',
      ee2: '0.00',
      ff2: '0.00',
      gg2: '0.00',  
      hh2: '0.00',
      ii2: '0.00',          
      //输出参数3
      aa3: '0.00',
      bb3: '0.00',
      cc3: '0.00',
      dd3: '0.00',
      ee3: '0.00',
      ff3: '0.00',
      ii3: '0.00',
      //输出参数4
      aa4: '0.00',
      bb4: '0.00',
      cc4: '0.00',
      dd4: '0.00',
      ee4: '0.00',
      ff4: '0.00',
      gg4: '0.00',
      ii4: '0.00',
    };
  },
  computed: {
    //贷款期限-请选择判断start
    txtBB() {
      if(this.BB === '') {
        return '请选择';
      }
      return this.BB;
    },
    chooseBB() {
      if(this.BB === '') {
        return false;
      }
      return true;      
    },
    gg4one() {
      if(this.GG === '') {
        return ''
      }

      let str = this.gg4;
      let arr = str.split('');
      let str2 =''
      arr.splice(arr.length-3,3);

      for(let i = 0 ; i < arr.length ; i++) {
        if(arr[i] !== '0' && arr[i] !== '.') {
          str2 = str2 + arr[i];
        }
      }
      if(str2 === '') {
        str2 = 0;
      }

      return str2;
    },
    gg4two() {
      if(this.GG === '') {
        return ''
      }

      let str = this.gg4;
      let arr = str.split('');
      let str3 = arr[arr.length-3] + '.' + arr[arr.length-2] + arr[arr.length-1];

      return str3;     
    } 
  },
  filters: {
    percentageFilter(str) {
      if(str === '0.00') {
        return str;
      }
      return str + '%';
    },
    pointsFilter(str) {
      if(str === '0.00') {
        return str;
      }

      let arr = str.split('');
      let str2 =''
      let str3 = arr[arr.length-3] + '.' + arr[arr.length-2] + arr[arr.length-1];
      arr.splice(arr.length-3,3);

      for(let i = 0 ; i < arr.length ; i++) {
        if(arr[i] !== '0' && arr[i] !== '.') {
          str2 = str2 + arr[i];
        }
      }
      if(str2 === '') {
        str2 = 0;
      }

      return str2 + '分' + str3 + '厘';
    },    
  },
  components: {
    XHeader
  },
  created() {
    if (this.$route.query["navShow"] != undefined) {
      this.navShow = this.$route.query["navShow"]
    }    
  },
  mounted() {    
  },
  methods: {
    customerBack() {
      if (window.appNative == undefined) {
        this.$router.push({
          path: "/home"
        });
      } else {
        window.appNative.back();
      }
    },
    chooseButton(index) {
      let arr = [false,false,false,false];
      arr[index] = true;
      this.showChoose = arr;
      this.chooseIndex = index;
      this.resetMoney()
    },
    chooseYear(index) {
      var arr = [false,false,false];
      var arrTime = [1,2,3];
      arr[index] = true;
      this.showYear = arr;
      this.FF = arrTime[index];

      //计算换算为月息
      if(this.GG !== '') {
        this.gg4 = toFixedPoints(this.GG/100/(this.FF*12) );        
      }
    }, 
    blurAA() {
      if(this.AA !== '') {
        if(!judgeZhengNumber(this.AA)) {
          this.$vux.toast.text("请输入最多保留两位小数的贷款金额数字", "middle");
          return         
        }
        this.AA = (this.AA*1).toFixed(2) + ''; 
      }
    }, 
    blurCC() {
      if(this.CC !== '') {
        if(!judgeZhengNumber(this.CC)) {
          this.$vux.toast.text("请输入最多保留两位小数的年利率数字", "middle");
          return         
        }
        this.CC = (this.CC*1).toFixed(2) + ''; 
      }
    },
    blurDD() {
      if(this.DD !== '') {
        if(!judgeZhengNumber(this.DD)) {
          this.$vux.toast.text("请输入最多保留两位小数的月还款金额数字", "middle");
          return         
        }
        this.DD = (this.DD*1).toFixed(2) + ''; 
      }
    },
    blurEE2() {
      if(this.EE2 !== '') {
        if(!judge100Number(this.EE2)) {
          this.$vux.toast.text("请输入0-100的月息分的数字", "middle");
          return         
        }
      }
    },
    blurEE3() {
      if(this.EE3 !== '') {
        if(!judgeTenNumber(this.EE3)) {
          this.$vux.toast.text("请输入0-9.99的月息厘的数字", "middle");
          return       
        }
      }
    },                       
    blurGG() {
      if(this.GG !== '') {
        if(!judgeZhengNumber(this.GG)) {
          this.$vux.toast.text("请输入最多保留两位小数的年息数字", "middle");
          return         
        }
        if(this.FF === 1) {
          if((this.GG*1) > 14) {
            this.$vux.toast.text("1年年息不能大于14%", "middle");
            return         
          }                   
        }
        if(this.FF === 2) {
          if((this.GG*1) > 28) {
            this.$vux.toast.text("2年年息不能大于28%", "middle");
            return         
          }                   
        } 
        if(this.FF === 3) {
          if((this.GG*1) > 40) {
            this.$vux.toast.text("3年年息不能大于40%", "middle");
            return         
          }                   
        }               
        this.GG = (this.GG*1).toFixed(2) + '';
        this.gg4 = toFixedPoints(this.GG/100/(this.FF*12) );   
      }      
    },  
    openPopup() {
      this.showPopup = true;
    },
    closePopup(value = '') {
      this.showPopup = false;
      if(value !== '') {
        this.BB = value;
      }
    },
    resetMoney() {
      this.showYear = [false,false,true];
      this.AA = '';
      this.BB = '';
      this.CC = '';
      this.DD = '';
      this.EE = '';
      this.EE2 = '';
      this.EE3 = '';
      this.FF = 3;
      this.GG = '';
      //输出参数1
      this.aa1 = '0.00';
      this.bb1 = '0.00';
      this.cc1 = '0.00';
      this.dd1 = '0.00';
      this.ee1 = '0.00';
      this.ff1 = '0.00';
      this.gg1 = '0.00';
      //输出参数2
      this.cc2 = '0.00';
      this.dd2 = '0.00';
      this.ee2 = '0.00';
      this.ff2 = '0.00';
      this.gg2 = '0.00';  
      this.hh2 = '0.00';
      this.ii2 = '0.00';          
      //输出参数3
      this.aa3 = '0.00'; 
      this.bb3 = '0.00'; 
      this.cc3 = '0.00';
      this.dd3 = '0.00';
      this.ee3 = '0.00';
      this.ff3 = '0.00';
      this.ii3 = '0.00';
      //输出参数4
      this.aa4 = '0.00';
      this.bb4 = '0.00';
      this.cc4 = '0.00';
      this.dd4 = '0.00';
      this.ee4 = '0.00';
      this.ff4 = '0.00';
      this.gg4 = '0.00';
      this.ii4 = '0.00';      
    },
    addMoney() {
      if(this.AA === '') {
        this.$vux.toast.text("请输入贷款金额", "middle");
        return
      }

      if(!judgeZhengNumber(this.AA)) {
        this.$vux.toast.text("请输入最多保留两位小数的贷款金额数字", "middle");
        return         
      }      

      if(this.BB === '') {
        this.$vux.toast.text("请选择贷款期限", "middle");   
        return
      }      


      let AA = this.AA*1;
      let BB = this.BB*1;

      //输出参数1
      if(this.chooseIndex === 0) {
        if(this.CC === '') {
          this.$vux.toast.text("请输入年利率", "middle");   
          return
        }
        if(!judgeZhengNumber(this.CC)) {
          this.$vux.toast.text("请输入最多保留两位小数的年利率数字", "middle");
          return         
        }      

        let CC = this.CC*1;       

        this.aa1 = getPMT(CC/100/12,BB,AA);
        this.bb1 = this.aa1/30;
        this.cc1 = this.aa1*BB;
        this.dd1 = this.cc1-AA;
        this.ee1 = this.dd1/AA*100;
        this.ff1 = this.ee1/BB*12;
        this.gg1 = this.ff1/100/12;

        this.aa1 = toFixedMoney(this.aa1);
        this.bb1 = toFixedMoney(this.bb1);
        this.cc1 = toFixedMoney(this.cc1);
        this.dd1 = toFixedMoney(this.dd1);
        this.ee1 = toFixedMoney(this.ee1);
        this.ff1 = toFixedMoney(this.ff1);
        this.gg1 = toFixedPoints(this.gg1);        

      }
      //输出参数2
      if(this.chooseIndex === 1) {
        if(this.DD === '') {
          this.$vux.toast.text("请输入月还款金额", "middle");   
          return
        }
        if(!judgeZhengNumber(this.DD)) {
          this.$vux.toast.text("请输入最多保留两位小数的月还款金额数字", "middle");
          return         
        }        

        let DD = this.DD*1;   

        this.hh2 = getRATE(BB,-DD,AA,0)*100;
        console.info(this.hh2)
        this.ii2 = this.hh2*12;
        this.cc2 = DD*BB;
        this.dd2 = this.cc2-AA;
        this.ee2 = this.dd2/AA*100;
        this.ff2 = this.ee2/BB*12;
        this.gg2 = this.ff2/100/12;

        this.hh2 = toFixedMoney(this.hh2);
        this.ii2 = toFixedMoney(this.ii2);
        this.cc2 = toFixedMoney(this.cc2);
        this.dd2 = toFixedMoney(this.dd2);
        this.ee2 = toFixedMoney(this.ee2);
        this.ff2 = toFixedMoney(this.ff2);
        this.gg2 = toFixedPoints(this.gg2);       
        
      }               
      //输出参数3
      if(this.chooseIndex === 2) {  
        if(this.EE2 === '') {
          this.$vux.toast.text("请输入月息的分", "middle");   
          return
        } 
        if(!judge100Number(this.EE2)) {
          this.$vux.toast.text("请输入0-100的月息分的数字", "middle");
          return         
        }
        if(this.EE3 === '') {
          this.$vux.toast.text("请输入月息的厘", "middle");   
          return
        }        
        if(!judgeTenNumber(this.EE3)) {
          this.$vux.toast.text("请输入0-9.99的月息厘的数字", "middle");
          return       
        }              
        
        let EE = this.EE*1;
        let EE2 = this.EE2*1;
        let EE3 = this.EE3*1;      
        
        EE = (EE2/100 + EE3/1000).toFixed(5);

        this.ff3 = EE*12*100; 
        this.ee3 = this.ff3/12*BB; 
        this.cc3 = AA*(1+(this.ee3/100));                      
        this.aa3 = this.cc3/BB;
        this.bb3 = this.aa3/30;
        this.dd3 = this.cc3-AA;
        this.ii3 = getRATE(BB,-this.aa3,AA,0)*12*100;

        this.ff3 = toFixedMoney(this.ff3); 
        this.ee3 = toFixedMoney(this.ee3); 
        this.cc3 = toFixedMoney(this.cc3);                      
        this.aa3 = toFixedMoney(this.aa3);
        this.bb3 = toFixedMoney(this.bb3);
        this.dd3 = toFixedMoney(this.dd3);
        this.ii3 = toFixedMoney(this.ii3);        
      }
      //输出参数4
      if(this.chooseIndex === 3) {
        if(this.GG === '') {
          this.$vux.toast.text("请输入年息", "middle");   
          return
        }
        if(this.FF === 1) {
          if((this.GG*1) > 14) {
            this.$vux.toast.text("1年年息不能大于14%", "middle");
            return         
          }                   
        }
        if(this.FF === 2) {
          if((this.GG*1) > 28) {
            this.$vux.toast.text("2年年息不能大于28%", "middle");
            return         
          }                   
        } 
        if(this.FF === 3) {
          if((this.GG*1) > 40) {
            this.$vux.toast.text("3年年息不能大于40%", "middle");
            return         
          }                   
        }        
        if(!judgeZhengNumber(this.GG)) {
          this.$vux.toast.text("请输入最多保留两位小数的年息数字", "middle");
          return         
        }        
        
        let FF = this.FF*1;
        let GG = this.GG*1;        

        this.gg4 = GG/100/(FF*12);    
        this.ff4 = this.gg4*12*100;
        this.ee4 = this.ff4/12*BB;  
        this.cc4 = AA*(1+this.ee4/100); 
        this.aa4 = this.cc4/BB;
        this.ii4 = getRATE(BB,-this.aa4,AA,0)*12*100;         
        this.bb4 = this.aa4/30;
        this.dd4 = this.cc4-AA;
        
        this.gg4 = toFixedPoints(this.gg4);    
        this.ff4 = toFixedMoney(this.ff4);
        this.ee4 = toFixedMoney(this.ee4);  
        this.cc4 = toFixedMoney(this.cc4); 
        this.aa4 = toFixedMoney(this.aa4);
        this.ii4 = toFixedMoney(this.ii4);         
        this.bb4 = toFixedMoney(this.bb4);
        this.dd4 = toFixedMoney(this.dd4);        
      } 
    }
  }
};
</script>

<style lang="less" scoped>
  .vux-header{
    background-color: #4B7EFF;
    border-bottom: 1px solid #4B7EFF;
    /deep/ .vux-header-left .left-arrow:before {
      border: 1px solid #fff;
      border-width: 1px 0 0 1px;
    }
  }
  .SimpleCalculator{
    input {
      border: none;
      outline: none;
      box-shadow: none;
      -webkit-appearance: none;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #d2d5dd;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #d2d5dd;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #d2d5dd;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #d2d5dd;
    }     

    background-color: #f3f5f8;
    .calculatorBox{
      height: 320px;
      background:linear-gradient(180deg,rgba(75,126,255,1) 0%,rgba(98,161,254,0.61) 61%,rgba(255,255,255,0) 100%);
      
      .calculatorTop{
        margin: 0 auto;
        border-radius: 15px;        
        width: 345px;
        padding: 20px;
        background-color: #fff;
        .title{
          font-size: 16px;
          color: #333;
          line-height: 30px;
          height: 30px;
        }
        .chooseBox{
          padding: 20px 0;
          overflow: hidden;
          .choose{
            float: left;
            margin: 0 30px 30px 0;
            height: 20px;
            .radioChoose{
              float: left;
              position: relative;
              width: 16px;
              height: 16px;
              margin: 2px 0;
              border-radius: 8px;
              border: 1px solid #4B7EFF;
              .ok{
                position: absolute;
                width: 10px;
                height: 10px;
                top: 50%;
                left: 50%;
                margin-left: -5px;
                margin-top: -5px;
                background-color: #4B7EFF;
                border-radius: 5px;
              }
            }
            .radioTitle{
              float: left;
              margin-left: 10px;
              line-height: 20px;
              color: #666px;
              font-size: 15px;              
            }

          }
        }
        .calculatorInput{
          height: 60px;
          border-top: 1px solid #f0f0f0;
          .calculatorInputTitle{
            float: left;
            height: 60px;
            line-height: 60px;
            font-size: 16px;
            color: #333;
          }
          .calculatorInputValue{
            position: relative;
            float: right;
            height: 60px;
            .input{
              margin: 19px 0;
              width: 150px;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              text-align: right;
              color: #333;
            }
            .select{
              margin: 19px 0;
              margin-right: 15px;
              width: 135px;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              text-align: right;
              color: #d2d5dd;              
            }
            .select2{
              color: #333;
            }
            .selectDot{
              position: absolute;
              top: 50%;
              margin-top: -2.5px;
              right: 0;
              width: 9px;
              height: 5px;
              background: url('../../assets/images/simpleCalculator/selectDot.png') no-repeat center center;
              background-size: 100%;
              z-index: 900;
            }
            .monthInterest{
              float: left;
              margin: 12px 0;
              width: 50px;
              height: 36px;
              border-bottom: 1px solid #999;
              .input2{
                margin: 7px 0;
                height: 22px;
                width: 50px;
                line-height: 22px;
                font-size: 14px;
                text-align: center;
                color: #333;                
              }
              .input2::-webkit-input-placeholder {
                /* WebKit browsers */
                color: #999;
              }
              .input2:-moz-placeholder {
                /* Mozilla Firefox 4 to 18 */
                color: #999;
              }
              .input2::-moz-placeholder {
                /* Mozilla Firefox 19+ */
                color: #999;
              }
              .input2:-ms-input-placeholder {
                /* Internet Explorer 10+ */
                color: #999;
              }
            }
            .monthInterest2{
              float: left;
              margin: 0 4px;
              color: #333;
              line-height: 60px;
              font-size: 14px;              
            }
            .year{
              float: left;
              margin: 17px 0 0 5px;
              width: 46px;
              height: 26px;
              border-radius: 13px;
              border: 1px solid #c8c8c8;
              color: #666;
              line-height: 26px;
              text-align: center;
              font-size: 14px;
            }
            .year2{
              background-color: #4B7EFF;
              border: 1px solid #4B7EFF;
              color: #fff;
            } 
            .input3{
              margin: 19px 0;
              margin-right: 15px;
              height: 22px;
              width: 50px;
              line-height: 22px;
              font-size: 14px;
              text-align: right;
              color: #333;              
            }           
          }
        }
      }
      .calculatorCenter{
        margin: 15px auto;
        width: 345px;
        height: 46px;
        .reset{
          float: left;
          width: 164px;
          height: 46px;
          border-radius: 6px;
          color: #4b7eff;
          background-color: #e4effc;
          line-height: 46px;
          font-size: 16px;
          text-align: center;
        }
        .add{
          float: right;
          width: 164px;
          height: 46px;
          border-radius: 6px;
          color: #fff;
          background-color: #4b7eff;
          line-height: 46px;
          font-size: 16px;
          text-align: center;          
        }
      }
      .calculatorBottom{
        margin: 15px auto;
        border-radius: 15px;        
        width: 345px;
        padding: 0 10px;
        background-color: #fff;
        .showDataTitle{
          height: 36px;
          line-height: 36px;
          border-bottom: 1px solid #f0f0f0;
          text-align: center;
          color: #333;
          font-size: 16px;
        }
        .showDataList{
          padding: 10px 0;
          .dataShow{
            height: 40px;
            padding: 0 20px;
            .dataShowLeft{
              float: left;
              color: #999;
              font-size: 13px;
              line-height: 40px;
              height: 40px;
            }
            .dataShowRight{
              float: right;
              color: #999;
              font-size: 13px;
              line-height: 40px;
              height: 40px;              
            }            
          }
        }
      }  
      .calculatorPadding{
        height: 50px;
        width: 1px;
      }          
    }

    .popupSelectBoxBg{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #000;
      opacity: 0.6;
      z-index: 1000;
    }
    .popupSelectBox{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f0f0f0;
      z-index: 1001;
      .selectBox{
        margin-bottom: 5px;
        .selectOne{
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #f0f0f0;
          background-color: #fff;
          text-align: center;
          color: #333;
          font-size: 16px;          
        }
      }
      .cacel{
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        text-align: center;
        color: #333;
        font-size: 16px;         
      }
    }
  }
</style>
