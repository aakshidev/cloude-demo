self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const u=(e.notification.data&&e.notification.data.url)||"signin.html#actions";
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{
    for(const c of l){if("focus" in c){if(c.navigate)c.navigate(u);return c.focus()}}
    return clients.openWindow(u);
  }));
});
// Ready for server-sent Web Push later
self.addEventListener("push",e=>{
  let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||"Cloude",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",vibrate:[200,100,200],data:{url:d.url||"signin.html#actions"}}));
});
