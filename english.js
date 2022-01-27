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
            
            
         <text textSize="20sp" w="*" gravity="center" textStyle="bold" >The upper right corner menu is the function treasure box, click it to find the function you need~</text>
        <text textSize="13sp">The swipe series function in the upper right menu, click to read the article in the swipe tutorial</text>
        
   
             </frame>
             <frame id="notifications">
             <text textSize="20sp" w="*" gravity="center" textStyle="bold" >Windows device support status
 Xiaomi MIX 2S (polaris)

 USB and touchscreen not working

 Xiaomi MIX 3 (perseus)

 USB works fine

 Xiaomi MI 8 (dipper)

 USB and touchscreen not working

 Xiaomi PocoPhone F1 (beryllium)

 USB works fine

 OnePlus 6 (enchilada)

 USB works fine

 The touch screen works fine

 OnePlus 6T (fajita)

 USB works fine

 The touch screen works fine

 Nubia X (nx616j)

 USB and touchscreen not working

 Meizu 16th (m1882)

 USB works fine

 Displaying Framebuffer is very slow (about 1fps)

 BlackShark One (skr-a0)

 USB works fine

 Hammer Nut R1 (trident)

 USB works fine

 LG G7 (judyln)

 USB works fine

 Automatic restart in 1 minute due to watchdog issue

 Samsung Galaxy S9+ (star2qltechn)

 USB needs external power supply to work properly

 UFS not working

 If you force it online in Disk Management, your UFS will be wiped

 Google pixel3 (Blueline)

 USB works fine

 UFS not working

 Oppo Findx (CPH1871)

 USB works fine</text>
               
             </frame>
         </viewpager>
         <bottomnaviagtion id="navigation" bg="#ffffff" />
     </vertical>
 );

 // Set the content of the bottom navigation bar
 let menuItems = [];
 let menu = ui.navigation.menu;
 menuItems.push(buildMenuItem(menu, 'brush into tutorial', ui.R.drawable.ic_home_black_48dp));
 menuItems.push(buildMenuItem(menu, 'Enter system tools', ui.R.drawable.ic_dashboard_black_48dp));
 menuItems.push(buildMenuItem(menu, 'supported phones', ui.R.drawable.ic_phone_black_48dp));

 // When the bottom button is selected, switch the ViewPager page to the page at the corresponding position
 $ui.navigation.setOnNavigationItemSelectedListener(function (item) {
     ui.viewPager.currentItem = menuItems.indexOf(item);
     return true;
 });

 // When the ViewPager page switches, switch the state of the bottom button
 $ui.viewPager.addOnPageChangeListener(new androidx.viewpager.widget.ViewPager.OnPageChangeListener({
     onPageSelected: function (position) {
         menuItems[position].setChecked(true);
     }
 }));

 $ui.emitter.on("create_options_menu", menu => {
     menu.add("Restart");
     menu.add("Reboot to Recovery")
     menu.add("Reboot to Bootloader")
     menu.add("One Plus 6T dedicated flashing tutorial")
     menu.add("Brushing tutorial for Xiaomi Mi 8")
     menu.add("mix2s dedicated brushing tutorial")
     menu.add("General 845 Flashing Tutorial")
     menu.add("About")
 });
 $ui.emitter.on("options_item_selected", (e, item) => {
     switch (item.getTitle()) {
         case "reboot to TWRP":
                 var result = shell("reboot recovery", true);
                 log(result);
                 console.show();
                 if(result.code == 0){
                 toast("Restarting");
                 }else{
                 toast("Failed to execute! Please report this problem");
                 }
             break;
           case "restart":
                 var result = shell("reboot", true);
                 log(result);
                 console.show();
                 if(result.code == 0){
                 toast("Restarting");
                 }else{
                 toast("Failed to execute! Please report this problem");
                 }
             break;
           case "Reboot to Bootloader":
                 var result = shell("reboot bootloader", true);
                 log(result);
                 console.show();
                 if(result.code == 0){
                 toast("Restarting");
                 }else{
                 toast("Failed to execute! Please report this problem");
                 }
             break;
           case "about":
               alert("About\nAPP author: xingyujie, author of this project: little sun. Problem bug report, QQ: 2072769652")
             break;
          case "Oneplus 6T dedicated flashing tutorial":
                 ui.webflash.loadUrl("https://forum.renegade-project.org/t/6-windows/194")
             break;
           case "General 845 Flashing Tutorial":
                 ui.webflash.loadUrl("https://forum.renegade-project.org/t/845-windows/36")
             break;
           case "mix2s dedicated flashing tutorial":
                 ui.webflash.loadUrl("https://blog.chrxw.com/archives/2021/07/18/1582.html")
             break;
           case "Windows10/11 mirror download site":
                 alert("The version downloaded by the computer access https://uupdump.net/ option")
             break;
                case "Brushing tutorial for Xiaomi Mi 8":
                 ui.webflash.loadUrl("https://forum.renegade-project.org/search?context=category&context_id=6&q=Xiaomi 8&skip_context=true")
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
     toast("Press again to exit Renegade Project Manager");
     e.consumed = true;
     lastPressedTime = time;
 });
 function buildMenuItem(menu, title, icon) {
     let menuItem = menu.add(title);
     menuItem.setIcon(icon);
     return menuItem;
 }
 ui.webflash.loadUrl("https://forum.renegade-project.org/")
