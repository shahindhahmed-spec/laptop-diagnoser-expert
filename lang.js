let LANG = "ar";
try { LANG = localStorage.getItem("lt_lang") || "ar"; } catch (e) {}

const UI = {
  ar: {
    appTitle: "مشخّص أعطال اللابتوب", logout: "خروج", welcome: "أهلاً بيك 👋",
    loginSub: "سجّل بياناتك البسيطة عشان نبدأ التشخيص", lblName: "الاسم",
    lblLaptop: "نوع اللابتوب (اختياري)", phName: "اكتب اسمك", phLaptop: "مثال: Dell / HP / Lenovo",
    loginErr: "من فضلك اكتب اسمك", enterBtn: "دخول",
    selTitle: "اختار الأعطال اللي عندك",
    selSub: "افتح أي فئة واختار عطل أو أكتر، وتقدر تختار من أكتر من فئة مع بعض.",
    noSel: "لم يتم اختيار أي عطل", selCount: "تم اختيار {n} عطل", startBtn: "ابدأ التشخيص ←",
    qCount: "عطل {a} من {b} — سؤال {c} من {d}",
    yes: "✅ نعم", no: "❌ لا", skip: "🤷 مش متأكد", back: "→ السؤال السابق",
    resTitle: "السبب الأقرب للعطل:", matchLbl: "نسبة التأكد", tryFix: "جرّب الحل ده:",
    fixedQ: "هل العطل اتصلح؟", fixedYes: "✅ أيوه اتصلح", fixedNo: "❌ لأ لسه موجود",
    techTitle: "🔧 محتاج فني متخصص",
    techText: "العطل ده محتاج فحص من مركز صيانة. روح لأقرب مركز صيانة ليك.",
    mapBtn: "📍 ابحث عن أقرب مركز صيانة", nextFault: "كمّل العطل اللي بعده ←",
    sumTitle: "📋 ملخص التشخيص", fixedTag: "✅ اتصلح", serviceTag: "🔧 محتاج مركز صيانة",
    causeLbl: "السبب", again: "تشخيص جديد", footer: "مشروع Expert System © 2026",
    unknownCause: "مش قادر أحدد السبب بدقة",
    notEnough1: "الإجابات مش كفاية لتحديد السبب", notEnough2: "الأفضل تعرض الجهاز على مركز صيانة",
    otherCauses: "أسباب محتملة تانية:", undetermined: "غير محدد", mapQuery: "مركز صيانة لابتوب"
  },
  en: {
    appTitle: "Laptop Fault Diagnoser", logout: "Logout", welcome: "Welcome 👋",
    loginSub: "Enter your basic info to start the diagnosis", lblName: "Name",
    lblLaptop: "Laptop brand (optional)", phName: "Enter your name", phLaptop: "e.g. Dell / HP / Lenovo",
    loginErr: "Please enter your name", enterBtn: "Login",
    selTitle: "Choose your faults",
    selSub: "Open any category and pick one or more faults. You can pick from several categories together.",
    noSel: "No faults selected", selCount: "{n} fault(s) selected", startBtn: "Start diagnosis →",
    qCount: "Fault {a} of {b} — Question {c} of {d}",
    yes: "✅ Yes", no: "❌ No", skip: "🤷 Not sure", back: "← Previous question",
    resTitle: "Most likely cause:", matchLbl: "Confidence", tryFix: "Try this fix:",
    fixedQ: "Was the fault fixed?", fixedYes: "✅ Yes, fixed", fixedNo: "❌ No, still there",
    techTitle: "🔧 You need a technician",
    techText: "This fault needs inspection at a repair center. Go to your nearest repair center.",
    mapBtn: "📍 Find the nearest repair center", nextFault: "Continue to next fault →",
    sumTitle: "📋 Diagnosis summary", fixedTag: "✅ Fixed", serviceTag: "🔧 Needs repair center",
    causeLbl: "Cause", again: "New diagnosis", footer: "Expert System Project © 2026",
    unknownCause: "Could not determine the cause precisely",
    notEnough1: "The answers are not enough to determine the cause",
    notEnough2: "It is best to take the laptop to a repair center",
    otherCauses: "Other possible causes:", undetermined: "Undetermined", mapQuery: "laptop repair shop"
  }
};

function t(k, v) {
  let s = (UI[LANG] && UI[LANG][k]) || UI.ar[k] || k;
  if (v) for (const x in v) s = s.replace("{" + x + "}", v[x]);
  return s;
}

const EN = {
  cat: {
    screen: "Screen", power: "Power & Boot", battery: "Battery & Charging", sound: "Sound & Microphone",
    keyboard: "Keyboard & Touchpad", heat: "Heat & Fan", performance: "Performance & Slowness",
    wifi: "Internet & Wi-Fi", storage: "Storage & Disk", ports: "Ports & Accessories"
  },
  fault: {
    s1: "Screen turns off and on by itself", s2: "Dots or spots on the screen", s3: "Lines on the screen",
    p1: "Laptop won't turn on at all", p2: "Turns on then shuts down by itself", p3: "Stuck at logo or won't enter Windows",
    b1: "Battery drains fast", b2: "Plugged in but not charging", b3: "Battery percentage jumps or shuts off suddenly",
    sn1: "No sound at all", sn2: "Distorted or crackling sound", sn3: "Microphone not working",
    k1: "Some keys not working", k2: "Touchpad not working", k3: "Letters repeat or type by themselves",
    h1: "Laptop is very hot", h2: "Fan is loud", h3: "Fan not working",
    pf1: "Laptop is slow in general", pf2: "Laptop freezes and hangs", pf3: "Blue screen (BSOD)",
    w1: "Wi-Fi not showing", w2: "Wi-Fi keeps disconnecting", w3: "Connected but no internet",
    d1: "Disk is full", d2: "Clicking noise from the disk", d3: "Files disappear or disk errors appear",
    u1: "USB port not working", u2: "HDMI: no picture on external screen", u3: "Camera not working"
  },
  q: {
    s1: ["Does the screen come back on when you move the lid (open/close)?", "If you shine a phone flashlight on the screen, can you see a faint image?", "Did the problem start after a Windows or driver update?", "When you connect an external screen (TV/monitor), does it work normally?"],
    s2: ["Are the dots always in the same place?", "Did the dots appear after the laptop was dropped or the screen was pressed?", "Do colored squares or dots appear and increase in games or heavy programs?", "Do the dots also appear in a screenshot?"],
    s3: ["Are the lines horizontal or vertical and fixed (not moving)?", "Do the lines change or disappear when you move the lid?", "Do the lines appear in a screenshot?", "Do the lines also appear on the external screen?"],
    p1: ["Does any light turn on when you plug in the charger?", "Did you try another identical charger and it still doesn't work?", "Do you hear the fan or a beep when you power on?", "Was the laptop dropped or did water or liquid get inside it?"],
    p2: ["Does it shut down after a while and feel hot?", "Does it shut down as soon as you unplug the charger?", "Does a blue screen appear before it shuts down?", "Does it shut down randomly even when idle and not hot?"],
    p3: ["Does a message like No boot device or Operating system not found appear?", "Does it enter Automatic Repair and keep restarting?", "Did you add RAM or run a Windows update before the problem?", "Do you hear clicking sounds from the disk?"],
    b1: ["Is the laptop more than 3 years old?", "Did the battery clearly last more hours before?", "Is the screen brightness high or are many programs running in the background?", "Is Battery Saver always off?"],
    b2: ["Does the message Plugged in, not charging appear?", "Does another charger charge the laptop?", "Is the charger cable damaged or overheating?", "Does it charge when you move the cable in the port?"],
    b3: ["Does the percentage suddenly drop from 30% to 0%?", "Is the battery swollen or is the bottom cover lifted?", "Has it been a while since you fully drained and fully charged the battery?", "Did the problem start after a Windows update?"],
    sn1: ["Does the sound icon have an X or is the volume at 0?", "Do earphones or an external speaker work?", "Is there a warning sign on Audio in Device Manager?", "Did the problem start after a Windows update?"],
    sn2: ["Does the distortion also appear with earphones?", "Does it get worse at high volume?", "Are Audio Enhancements enabled?", "Was the laptop dropped before the problem appeared?"],
    sn3: ["Does the mic fail in all programs?", "Is microphone access blocked in privacy settings?", "Does a headset with an external mic work well?", "Is the mic missing from Sound > Input?"],
    k1: ["Are the broken keys in one specific area?", "Was liquid ever spilled on the keyboard?", "Does an external USB keyboard work normally?", "Does the keyboard also fail in the BIOS screen?"],
    k2: ["Does it work after pressing Fn + the touchpad key?", "Did the problem start after a Windows or driver update?", "Is only a certain part of the touchpad unresponsive?", "Is there swelling or a lift under the touchpad?"],
    k3: ["Is one specific key the one that repeats?", "Do letters type by themselves without touching the keyboard?", "Did you enable Sticky Keys or Filter Keys?", "Is the keyboard dirty, or has food or dust built up on it?"],
    h1: ["Has it been more than 2 years without internal cleaning?", "Do you use it on a bed, blanket or lap?", "Does it get hot even when nearly idle?", "Is a program using 100% CPU in Task Manager?"],
    h2: ["Is the fan loud even with light programs?", "Do you hear grinding or rattling from the fan?", "Does the noise increase only with games or heavy programs?", "Has it been more than a year since the last internal cleaning?"],
    h3: ["Do you hear no fan sound at all, even with heavy programs?", "Does a Fan error message appear at startup?", "Was there a BIOS update or reset before the problem?", "Does the laptop get very hot and shut down by itself?"],
    pf1: ["Does it take more than 2 minutes to start?", "Does Task Manager show Disk at 100%?", "Is memory (RAM) usage above 85%?", "Do strange ads or pages appear in the browser?"],
    pf2: ["Does it hang when you open many programs together?", "Does the laptop use an HDD (not an SSD)?", "Does it get hot before it hangs?", "Does it hang even with simple programs after a Windows update?"],
    pf3: ["Did it appear after installing a new driver or program?", "Does the error message contain the word MEMORY?", "Do you hear clicking from the disk or see a Disk error message?", "Does it repeat even after updating or reinstalling Windows?"],
    w1: ["Is Airplane mode on or the Wi-Fi switch off?", "Is the Wi-Fi option completely missing from settings?", "Does your phone or another device see the network normally?", "Did the problem start after a Windows update?"],
    w2: ["Do other devices disconnect too?", "Does it disconnect when you move away from the router?", "Is the option Allow the computer to turn off this device enabled?", "Did the problem start after an update?"],
    w3: ["Does your phone on the same network have internet?", "Do some websites open and others don't?", "Does the Network Troubleshooter report a DNS problem?", "Is a VPN or proxy running?"],
    d1: ["Is drive C almost full?", "Do you have many games or videos?", "Is space disappearing and you don't know why?", "Are Downloads and the Recycle Bin full?"],
    d2: ["Is the clicking repetitive (Click) and continuous?", "Is it accompanied by severe slowness?", "Is the laptop on a vibrating or unstable surface?", "Does the sound appear only at startup and then go away?"],
    d3: ["Did an S.M.A.R.T or Disk failure message appear?", "Was there a power cut or forced shutdown before the problem?", "Did your files turn into shortcuts?", "Does opening folders take a long time?"],
    u1: ["Does the same flash drive work in another port?", "Does the flash drive also fail on another computer?", "Does the message USB Device not recognized appear?", "Is the port loose or wobbly?"],
    u2: ["Did you try pressing Win + P and choosing Duplicate or Extend?", "Does the cable work with another device?", "Did the problem start after updating the display driver?", "Is the external screen on the correct HDMI input?"],
    u3: ["Is camera access enabled in privacy settings?", "Is the camera missing from Device Manager?", "Is there a camera privacy cover or switch that is closed?", "Did it work before and stop after an update?"]
  },
  cause: {
    cable: {n: "Internal screen cable (flex) loose or damaged", f: ["Unplug the charger and open/close the lid slowly to confirm the problem", "The fix is re-seating or replacing the cable", "Best done by a repair technician"]},
    backlight: {n: "Screen backlight is faulty", f: ["Connect an external screen to confirm the picture is fine", "The fix is usually replacing the backlight strip or the screen", "Needs a repair technician"]},
    driver: {n: "Driver problem", f: ["Open Device Manager and find the affected device", "Run Update Driver; if that fails, Uninstall and restart the laptop", "Download the original driver from the manufacturer's website"]},
    gpu: {n: "Graphics card (GPU) problem", f: ["Update the graphics driver from the manufacturer's website", "Make sure the temperature is normal", "If it continues, it's a hardware fault and needs a technician"]},
    panel: {n: "The screen panel itself is damaged", f: ["Fixed dots or lines are usually a panel fault", "The fix is replacing the screen", "Ask a repair center for the screen price for your model"]},
    pressure: {n: "Damage from pressure or impact on the screen", f: ["Don't press on the damaged area", "The fix is replacing the screen", "Use a protective case in the future"]},
    charger: {n: "Charger faulty or unsuitable", f: ["Try another charger with the same specs (voltage/amps)", "Check the cable for cuts or excess heat", "Buy an original or compatible charger"]},
    battery: {n: "Battery faulty or weak", f: ["Run the laptop on the charger only, without the battery (if possible)", "If it runs fine, the battery is the problem", "Replace the battery. Any swelling is dangerous, so stop using it immediately"]},
    board: {n: "Motherboard problem", f: ["Unplug the charger and battery for 30 seconds and hold the power button for 30 seconds", "Try powering it on again", "If it doesn't start, the board is at fault and you need a repair center"]},
    ram: {n: "RAM problem", f: ["Unplug the charger, remove the RAM and clean its contacts with an eraser", "Re-insert it firmly and test", "If you have two sticks, test each one alone"]},
    disk: {n: "Hard drive or SSD problem", f: ["Back up your files immediately", "Check the drive with CrystalDiskInfo", "If the condition is bad, replace it (an SSD is preferred)"]},
    os: {n: "Corrupted Windows files", f: ["Open CMD as administrator and type: sfc /scannow", "Then try: DISM /Online /Cleanup-Image /RestoreHealth", "If that doesn't help, reset Windows and keep your files"]},
    heat: {n: "Overheating causing shutdowns or slowness", f: ["Clean the vents and avoid using it on a bed", "Use a cooling pad", "Close heavy programs and monitor the temperature"]},
    wear: {n: "Old battery with reduced capacity", f: ["In CMD as administrator type: powercfg /batteryreport to check its condition", "If capacity is below 60% of the original, replace it", "Turn on Battery Saver until you replace it"]},
    apps: {n: "Background programs draining the battery", f: ["Open Task Manager and close heavy programs", "Disable unnecessary startup programs", "Open Settings > Battery and see which app uses the most"]},
    battSettings: {n: "Brightness and power settings not tuned", f: ["Lower the screen brightness", "Turn on Battery Saver", "Choose Power Mode: Best power efficiency"]},
    port: {n: "Charging or USB port damaged or loose", f: ["Carefully clean the port of dust", "Try another port", "If the port wobbles, it needs soldering or replacement by a technician"]},
    calib: {n: "Battery needs calibration", f: ["Charge the battery to 100% and leave it plugged in for two hours", "Use it on battery until it shuts down by itself", "Charge it to 100% again without interruption"]},
    mute: {n: "Sound muted or wrong default device", f: ["Right-click the sound icon and choose Sound settings", "Select the correct speakers as the Output device", "Make sure the sound isn't muted in the Mixer"]},
    speaker: {n: "Internal speaker damaged", f: ["Try earphones or an external speaker", "If sound works with them, the internal speaker is the fault", "The fix is replacing the internal speakers at a technician"]},
    enhance: {n: "Audio Enhancements causing distortion", f: ["Open Sound settings > Device properties", "Turn off Audio Enhancements", "Restart the laptop"]},
    privacyMic: {n: "Microphone permission is blocked", f: ["Open Settings > Privacy > Microphone", "Turn on Microphone access and the permission for the app", "Select the right mic in the app's settings"]},
    micHw: {n: "Internal microphone damaged", f: ["Try a headset with an external mic", "If it works, the internal mic is the fault", "Use an external mic or have it replaced by a technician"]},
    liquid: {n: "Liquids or dust affected the keyboard", f: ["Turn off the laptop immediately and unplug the charger", "Flip it upside down and clean it without too much water", "Let it dry for 48 hours; if lots of liquid got in, go to a repair center"]},
    flex: {n: "Internal keyboard cable is loose", f: ["The fix is usually re-seating the internal cable", "The laptop needs to be opened", "Go to a repair technician"]},
    kbHw: {n: "Keyboard hardware fault", f: ["Try an external USB keyboard", "If it works, the internal keyboard is the fault", "Replace the keyboard at a technician"]},
    disabledTp: {n: "Touchpad disabled from settings or shortcut", f: ["Try pressing Fn + the touchpad key in the F-row", "Open Settings > Devices > Touchpad and enable it", "Unplug any external mouse, since it may disable it automatically"]},
    tpHw: {n: "Touchpad hardware fault", f: ["Check under the touchpad; any swelling may come from the battery", "Use an external mouse temporarily", "Replace the touchpad or check the battery at a technician"]},
    dirt: {n: "Dust or dirt under the keys", f: ["Turn off the laptop and clean the keyboard with compressed air", "Use a soft brush between the keys", "If a key is stuck, remove it and clean it carefully"]},
    sticky: {n: "Sticky/Filter Keys is on", f: ["Open Settings > Accessibility > Keyboard", "Turn off Sticky Keys, Filter Keys and Toggle Keys", "Press Shift five times and make sure the window doesn't appear"]},
    dust: {n: "Dust built up inside the laptop", f: ["Turn off the laptop and clean the vents with compressed air", "Internal cleaning by a technician is best", "Repeat the cleaning every 6 to 12 months"]},
    paste: {n: "Thermal paste is old", f: ["You most likely need to replace the CPU thermal paste", "The job requires opening the laptop", "Go to a repair technician to replace it"]},
    vents: {n: "Vents blocked by the way you use it", f: ["Use the laptop on a hard, flat surface", "Use a cooling pad", "Don't place anything that blocks the vents"]},
    load: {n: "A program is overusing the CPU", f: ["Open Task Manager (Ctrl+Shift+Esc)", "Find the program using high CPU and close it", "Scan the laptop with antivirus"]},
    fan: {n: "Fan damaged or not working", f: ["Open Task Manager and monitor the temperature", "If the fan isn't running or makes a grinding sound, it must be replaced", "Go to a technician and avoid long use meanwhile"]},
    bios: {n: "BIOS settings changed or need an update", f: ["Enter the BIOS (usually F2 or Del at startup)", "Choose Load Default Settings", "Update the BIOS from the manufacturer's site carefully"]},
    startup: {n: "Too many programs launching at Windows startup", f: ["Open Task Manager > Startup", "Disable any program you don't need", "Restart the laptop and compare the speed"]},
    virus: {n: "Viruses or malware", f: ["Scan with Windows Security (Full Scan)", "Use Malwarebytes as an extra scan", "Remove any strange programs or browser extensions"]},
    router: {n: "Router or internet line problem", f: ["Unplug the router for a minute and turn it on again", "Try another device on the same network", "If it continues, call your internet provider"]},
    dns: {n: "DNS or network settings problem", f: ["Open CMD as administrator and type: ipconfig /flushdns", "Then: netsh winsock reset and restart", "Change DNS to 8.8.8.8 and 8.8.4.4"]},
    wifiSwitch: {n: "Airplane mode on or Wi-Fi switch off", f: ["Press Fn + the Wi-Fi key", "Open Settings > Network and make sure Airplane mode is off", "Turn on Wi-Fi from settings"]},
    wifiPower: {n: "Power saving settings turn off the Wi-Fi card", f: ["Open Device Manager > Network adapters", "Click the Wi-Fi card > Properties > Power Management", "Uncheck Allow the computer to turn off this device"]},
    wifiCard: {n: "Wi-Fi card damaged or loose", f: ["Shut down, unplug the charger and power on again", "If the card isn't in Device Manager, it's a hardware fault", "Replace the Wi-Fi card at a technician, or use a USB adapter meanwhile"]},
    junk: {n: "Temporary files and clutter on the disk", f: ["Open Disk Cleanup or Storage Sense", "Delete Downloads and temporary files and empty the Recycle Bin", "Delete Windows.old if present"]},
    big: {n: "Large files (games/videos) using the space", f: ["Open Settings > Storage and see the biggest files", "Move videos and photos to an external drive or the cloud", "Delete games and programs you don't use"]},
    failing: {n: "The disk is about to fail", f: ["Back up your files now, before anything else", "Check the drive with CrystalDiskInfo", "Replace the drive quickly (an SSD is preferred)"]},
    vibration: {n: "Vibration or an unstable surface", f: ["Use the laptop on a stable surface", "Avoid moving it while it's on", "If the noise continues, check the disk"]},
    normal: {n: "Normal operating sound of an HDD", f: ["This is most likely the normal startup sound", "If the sound is frequent and annoying, check the disk", "Consider upgrading to an SSD"]},
    filesystem: {n: "File system errors", f: ["Open CMD as administrator and type: chkdsk C: /f /r", "Agree to the scan at restart", "Then back up your files"]},
    device: {n: "The external device itself has a problem", f: ["Try the device on another computer", "Try another cable", "If it still doesn't work, the device is at fault"]},
    display: {n: "Screen projection settings are wrong", f: ["Press Win + P", "Choose Duplicate or Extend", "Make sure the screen/TV is on the correct HDMI input"]},
    hdmiCable: {n: "HDMI cable damaged", f: ["Try another HDMI cable", "Try another HDMI port on the screen", "Make sure the cable is firmly connected"]},
    privacyCam: {n: "Camera permission blocked or camera covered", f: ["Open Settings > Privacy > Camera", "Turn on Camera access and the app permission", "Make sure the camera cover is open or the physical switch isn't off"]},
    camHw: {n: "Camera damaged or its cable is loose", f: ["Open Device Manager and see if the camera appears", "If it's missing after a driver update, it's hardware", "Use an external camera or have the camera replaced"]}
  }
};

// دوال مساعدة للعرض حسب اللغة
const catName = c => (LANG === "en" && EN.cat[c.id]) || c.name;
const faultName = f => (LANG === "en" && EN.fault[f.id]) || f.name;
const qText = (f, i) => (LANG === "en" && EN.q[f.id] && EN.q[f.id][i]) || f.qs[i].t;
const causeName = id => (LANG === "en" && EN.cause[id]) ? EN.cause[id].n : CAUSES[id].name;
const causeFix = id => (LANG === "en" && EN.cause[id]) ? EN.cause[id].f : CAUSES[id].fix;