"ui";

let androidx = Packages.androidx;
let Snackbar = com.google.android.material.snackbar.Snackbar;

$ui.layout(
   <vertical>
        <appbar>
            <toolbar id="toolbar" title="Renegade Project APP" />
        </appbar>
 
        <viewpager id="viewPager" layout_weight="1">
            <frame id="home">
            <webview id="webflash" h="600" margin="0 16"/>
              
            </frame>
            
            <frame id="dashboard">
            
            
        <text textSize="20sp" w="*" gravity="center" textStyle="bold" >右上角菜单是功能大宝箱，点击它来查找需要的功能~</text>
       <text textSize="13sp">右上角菜单的刷入系列功能，点击后在刷入教程看文章</text>
        
   
            </frame>
            <frame id="notifications">
            <text textSize="20sp" w="*" gravity="center" textStyle="bold" >Windows设备支持状态
Xiaomi MIX 2S (polaris)

USB和触摸屏不工作

Xiaomi MIX 3 (perseus)

USB正常工作

Xiaomi MI 8 (dipper)

USB和触摸屏不工作

Xiaomi PocoPhone F1 (beryllium)

USB正常工作

OnePlus 6 (enchilada)

USB正常工作

触摸屏正常工作

OnePlus 6T (fajita)

USB正常工作

触摸屏正常工作

Nubia X (nx616j)

USB和触摸屏不工作

Meizu 16th (m1882)

USB正常工作

显示Framebuffer非常慢 (大约1fps)

BlackShark One (skr-a0)

USB正常工作

锤子坚果R1 (trident)

USB正常工作

LG G7 (judyln)

USB正常工作

由于watchdog问题，1分钟内自动重启

Samsung Galaxy S9+ (star2qltechn)

USB需外接供电才能正常工作

UFS不工作

如果你在磁盘管理中使其强制联机，你的UFS将会被擦除

Google pixel3 (Blueline)

USB正常工作

UFS不工作

Oppo Findx (CPH1871)

USB正常工作</text>
               
            </frame>
        </viewpager>
        <bottomnaviagtion id="navigation" bg="#ffffff" />
    </vertical>
);

// 设置底部导航栏的内容
let menuItems = [];
let menu = ui.navigation.menu;
menuItems.push(buildMenuItem(menu, '刷入教程', ui.R.drawable.ic_home_black_48dp));
menuItems.push(buildMenuItem(menu, '进入系统工具', ui.R.drawable.ic_dashboard_black_48dp));
menuItems.push(buildMenuItem(menu, '支持的手机', ui.R.drawable.ic_phone_black_48dp));

// 当底部按钮被选中时，切换ViewPager页面为相应位置的页面
$ui.navigation.setOnNavigationItemSelectedListener(function (item) {
    ui.viewPager.currentItem = menuItems.indexOf(item);
    return true;
});

// 当ViewPager页面切换时，切换底部按钮的状态
$ui.viewPager.addOnPageChangeListener(new androidx.viewpager.widget.ViewPager.OnPageChangeListener({
    onPageSelected: function (position) {
        menuItems[position].setChecked(true);
    }
}));

$ui.emitter.on("create_options_menu", menu => {
    menu.add("重启");
    menu.add("重启到Recovery")
    menu.add("重启到Bootloader")
    menu.add("一加6T专用刷入教程")
    menu.add("小米8专用刷入教程")
    menu.add("mix2s专用刷入教程")
    menu.add("通用845刷入教程")
    menu.add("关于")
});
$ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "重启到TWRP":
                var result = shell("reboot recovery", true);
                log(result);
                console.show();
                if(result.code == 0){
                toast("正在重启");
                }else{
                toast("执行失败！请报告这个问题");
                }
            break;
          case "重启":
                var result = shell("reboot", true);
                log(result);
                console.show();
                if(result.code == 0){
                toast("正在重启");
                }else{
                toast("执行失败！请报告这个问题");
                }
            break;  
          case "重启到Bootloader":
                var result = shell("reboot bootloader", true);
                log(result);
                console.show();
                if(result.code == 0){
                toast("正在重启");
                }else{
                toast("执行失败！请报告这个问题");
                }
            break;
          case "关于":
              alert("About\nAPP作者:xingyujie，此项目作者:小太阳。问题Bug报告，QQ:2072769652")
            break;
         case "一加6T专用刷入教程":
                ui.webflash.loadUrl("https://forum.renegade-project.org/t/6-windows/194")
            break;
          case "通用845刷入教程":
                ui.webflash.loadUrl("https://forum.renegade-project.org/t/845-windows/36")
            break;
          case "mix2s专用刷入教程":
                ui.webflash.loadUrl("https://blog.chrxw.com/archives/2021/07/18/1582.html")
            break;
          case "Windows10/11镜像下载网站":
                alert("电脑访问https://uupdump.net/选项下载的版本")
            break;
               case "小米8专用刷入教程":
                ui.webflash.loadUrl("https://forum.renegade-project.org/search?context=category&context_id=6&q=小米8&skip_context=true")
            break;
       
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);


let lastPressedTime = 0;
ui.emitter.on("back_pressed", (e) => {
    let time = Date.now();
    if (time - lastPressedTime < 500) {
        return;
    }
    toast("再按一次退出Renegade Project Manager");
    e.consumed = true;
    lastPressedTime = time;
});
function buildMenuItem(menu, title, icon) {
    let menuItem = menu.add(title);
    menuItem.setIcon(icon);
    return menuItem;
}
ui.webflash.loadUrl("https://forum.renegade-project.org/")