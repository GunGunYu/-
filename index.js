Page({ 
  data:{
    newsTypeList: [
      { "text": "国内", "ab": "gn", "index": "0"},
      { "text": "国际", "ab": "gj", "index": "1" },
      { "text": "财经", "ab": "cj", "index": "2" },
      { "text": "娱乐", "ab": "yl", "index": "3" },
      { "text": "军事", "ab": "js", "index": "3" },
      { "text": "体育", "ab": "ty", "index": "4" },
      { "text": "其他", "ab": "other", "index": "5" }
    ],
    newsType:"gn",
    listNumber:[1,2,3,4,5,6],
    hotTitle:"123",
     hotTimeR:"123",
     hotSource:"123",
     hotPic:"/images/1.jpeg",
     hotID:123,
     list:[],//空列表
    
     },
     onPullDownRefresh(){
       this.getHot(()=>{
         wx.stopPullDownRefresh()
       })
     },


     onLoad() {
       this.getHot()

  },
  
  getHot(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list', //
      data: {"type":this.data.newsType}, 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let hotTitle =result[0].title
        let hotTime = result[0].date
        let hotSource = result[0].source
        let hotPic = result[0].firstImage
        let hotID = result[0].id
        console.log(hotTitle,hotTime)
        var str = hotTime;
        var pattern = "T";
        str = str.replace(new RegExp(pattern), "  ");
        //set list
        



        this.setData({
          hotTitle: hotTitle ,
          hotTimeR: str.slice(0,16),
          hotSource: hotSource,
          hotPic:hotPic,
          hotID: hotID
        })

        let list = []
        for (let i = 0; i < 7; i++) {
          list.push({
            code: i,
            title: result[i+1].title,
            picPath: result[i+1].firstImage,
            time: result[i + 1].source+result[i + 1].date.slice(0, 10) +'  '+ result[i + 1].date.slice(11, 16),
            id: result[i + 1].id,
            
          })
        }
        this.setData({
          list: list,
          
        })
      },

      complete:()=>{
        callback&&callback()
      },
   
    })
  },
  //点击跳转
  redictDetail: function (e) {
    console.log(e.currentTarget.id)
    wx.navigateTo({

      url: '../detail/detail?id=' + e.currentTarget.id
    })
   
  },
  
  selectNewsType(e){
    console.log(e.currentTarget.id)
    if (this.data.newsType == e.currentTarget.dataset.ab) {
      return;
    }
    
    this.setData({
      newsType: e.currentTarget.id,
     
      
    })
    this.getHot()
   
  },
 
   
 })
