// ===== أسباب جديدة =====
Object.assign(CAUSES, {
  appBug:{name:"البرنامج نفسه فيه مشكلة أو نسخته قديمة",fix:["حدّث البرنامج لآخر إصدار","امسح البرنامج وثبّته من جديد","جرّب إصدار تاني أو برنامج بديل"]},
  runtime:{name:"ملفات Runtime ناقصة (Visual C++ / .NET)",fix:["نزّل Microsoft Visual C++ Redistributable من موقع مايكروسوفت","ثبّت .NET Framework لو البرنامج بيطلبه","أعد تشغيل اللابتوب وجرّب البرنامج"]},
  wuCache:{name:"ذاكرة تحديثات ويندوز (Update Cache) تالفة",fix:["افتح Settings > Update & Security > Troubleshoot > Windows Update","افتح CMD كمسؤول واكتب: net stop wuauserv ثم امسح محتوى فولدر C:\\Windows\\SoftwareDistribution","اكتب: net start wuauserv وجرّب التحديث تاني"]},
  avConflict:{name:"برنامج حماية تاني بيتعارض مع التحديث",fix:["وقّف برنامج مضاد الفيروسات الإضافي مؤقتاً","جرّب التحديث تاني","لو نجح، استخدم Windows Security بس أو برنامج حماية واحد"]},
  btOff:{name:"البلوتوث مقفول أو وضع الطيران شغال",fix:["اضغط Win + A وفعّل Bluetooth","اتأكد إن Airplane mode مقفول","افتح Settings > Devices > Bluetooth وشغّله"]},
  btCard:{name:"كارت البلوتوث أو الواي فاي تالف أو مفكوك",fix:["اطفي اللابتوب وافصل الشاحن وشغّله تاني","لو الكارت مش ظاهر في Device Manager فالعطل هاردوير","استخدم محوّل بلوتوث USB مؤقتاً أو بدّل الكارت عند فني"]},
  btDevice:{name:"بطارية أو عطل في الملحق نفسه (سماعة/ماوس)",fix:["اشحن الجهاز أو بدّل بطاريته","جرّب الجهاز مع موبايل أو كمبيوتر تاني","لو ما اشتغلش يبقى العطل في الجهاز نفسه"]},
  btPair:{name:"بيانات الاقتران (Pairing) تالفة",fix:["افتح Settings > Bluetooth واختار الجهاز ثم Remove device","اطفي الملحق وشغّله في وضع الاقتران","اعمل Pair من جديد"]}
});

// ===== فئات جديدة =====
CATEGORIES.push(
{ id:"windows", name:"ويندوز والبرامج", icon:"🪟", faults:[
  { id:"wn1", name:"برنامج بيقفل لوحده أو مش بيفتح", qs:[
    {t:"هل المشكلة في برنامج واحد بس؟", y:{appBug:4}, n:{os:3,ram:2}},
    {t:"هل البرنامج اتحدّث أو اتثبّت قريب؟", y:{appBug:3}},
    {t:"هل استخدام الرامة عالي لما تفتح البرنامج؟", y:{ram:4}},
    {t:"هل ظهرت رسالة فيها DLL مفقود أو Runtime error؟", y:{runtime:5}}
  ]},
  { id:"wn2", name:"تحديث ويندوز بيفشل أو بيعلّق", qs:[
    {t:"هل ظهر كود خطأ زي 0x80...؟", y:{wuCache:4}},
    {t:"هل مساحة C أقل من 10 GB؟", y:{junk:3,big:2}},
    {t:"هل التحديث بيوقف عند نسبة معينة وما بيكمّلش؟", y:{wuCache:3,os:2}},
    {t:"هل في برنامج مضاد فيروسات تاني شغال غير Windows Security؟", y:{avConflict:4}}
  ]}
]},
{ id:"bluetooth", name:"البلوتوث والملحقات", icon:"🎧", faults:[
  { id:"bt1", name:"البلوتوث مش بيشتغل أو مش بيظهر", qs:[
    {t:"هل خيار Bluetooth مختفي من الإعدادات؟", y:{driver:3,btCard:3}},
    {t:"هل وضع الطيران شغال أو البلوتوث مقفول؟", y:{btOff:5}},
    {t:"هل المشكلة بدأت بعد تحديث ويندوز؟", y:{driver:4}},
    {t:"هل الواي فاي كمان بيفصل أو بيضعف؟", y:{btCard:3}}
  ]},
  { id:"bt2", name:"سماعة أو ماوس بلوتوث بيفصل أو مش بيتوصل", qs:[
    {t:"هل الجهاز بيتوصل بموبايل أو جهاز تاني عادي؟", y:{driver:2,btPair:3}, n:{btDevice:5}},
    {t:"هل بطارية السماعة أو الماوس مشحونة؟", n:{btDevice:5}},
    {t:"هل المشكلة بدأت بعد تحديث؟", y:{driver:4}},
    {t:"هل الجهاز ظاهر في القايمة بس مش بيتصل؟", y:{btPair:5}}
  ]}
]}
);

// ===== الإنجليزي للجديد =====
Object.assign(EN.cat, { windows: "Windows & Software", bluetooth: "Bluetooth & Peripherals" });
Object.assign(EN.fault, {
  wn1: "Program crashes or won't open", wn2: "Windows update fails or hangs",
  bt1: "Bluetooth not working or not showing", bt2: "Bluetooth headset/mouse disconnects or won't connect"
});
Object.assign(EN.q, {
  wn1: ["Does the problem happen in only one program?", "Was the program recently updated or installed?", "Is RAM usage high when you open the program?", "Did a message about a missing DLL or Runtime error appear?"],
  wn2: ["Did an error code like 0x80... appear?", "Is free space on drive C below 10 GB?", "Does the update stop at a certain percentage and never finish?", "Is another antivirus running besides Windows Security?"],
  bt1: ["Is the Bluetooth option missing from settings?", "Is Airplane mode on or Bluetooth turned off?", "Did the problem start after a Windows update?", "Does Wi-Fi also disconnect or get weak?"],
  bt2: ["Does the device connect normally to a phone or another device?", "Is the headset or mouse battery charged?", "Did the problem start after an update?", "Does the device show in the list but won't connect?"]
});
Object.assign(EN.cause, {
  appBug: {n: "The program itself has a problem or is outdated", f: ["Update the program to the latest version", "Uninstall it and install it again", "Try another version or an alternative program"]},
  runtime: {n: "Missing runtime files (Visual C++ / .NET)", f: ["Download Microsoft Visual C++ Redistributable from Microsoft's website", "Install .NET Framework if the program requires it", "Restart the laptop and try the program again"]},
  wuCache: {n: "Windows Update cache is corrupted", f: ["Open Settings > Update & Security > Troubleshoot > Windows Update", "Open CMD as administrator and type: net stop wuauserv, then delete the contents of C:\\Windows\\SoftwareDistribution", "Type: net start wuauserv and try the update again"]},
  avConflict: {n: "Another security program conflicts with the update", f: ["Temporarily disable the extra antivirus", "Try the update again", "If it works, use Windows Security only or a single security program"]},
  btOff: {n: "Bluetooth is off or Airplane mode is on", f: ["Press Win + A and turn on Bluetooth", "Make sure Airplane mode is off", "Open Settings > Devices > Bluetooth and turn it on"]},
  btCard: {n: "Bluetooth/Wi-Fi card damaged or loose", f: ["Shut down, unplug the charger and power on again", "If the card isn't in Device Manager, it's a hardware fault", "Use a USB Bluetooth adapter meanwhile or replace the card at a technician"]},
  btDevice: {n: "Battery or fault in the accessory itself (headset/mouse)", f: ["Charge the device or replace its battery", "Try the device with a phone or another computer", "If it still doesn't work, the device itself is faulty"]},
  btPair: {n: "Pairing data is corrupted", f: ["Open Settings > Bluetooth, choose the device then Remove device", "Turn the accessory off and on in pairing mode", "Pair it again from scratch"]}
});