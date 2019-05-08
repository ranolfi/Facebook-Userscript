// ==UserScript==
// @name        Facebook Auto "Most Recent" Stories
// @version     0.1557115315
// @author      Hélder Ferreira
// @namespace   https://greasyfork.org/users/89591
// @homepageURL https://greasyfork.org/en/scripts/382099-facebook-auto-most-recent-stories
// @description Change Facebook feed and group posts to "Most Recent" Stories / Publications
// @compatible  chrome
// @compatible  firefox
// @compatible  opera
// @compatible  safari
// @compatible  msedge
// @license     MIT License (https://opensource.org/licenses/MIT)
// @icon        http://i.imgur.com/WpjyLA4.png
// @match       https://*.facebook.com/*
// @grant       none
// ==/UserScript==

var cur = new URL(window.location), fd = cur["origin"] + "?sk=h_chr", grp = document.querySelectorAll("[data-type='type_group'] > a"), elm = document.querySelectorAll("[data-click='bluebar_logo'] > a, ._3qcu > a"), idx = ["?sk=h_nor", "?ref=logo", "?sk=nf", "?ref=tn_tnmn"], grid = document.querySelectorAll("[property='al:android:url']"), spurl = splitURL(cur["href"], "/"), gdisc = document.querySelectorAll("._2yaa > a"), gpop = ["CHRONOLOGICAL", "RECENT_ACTIVITY"];",
if(cur["href"] === cur["origin"] + "/"){
   window.location.replace(fd);
}
idx.forEach((a) => {
   if(cur["search"].includes(a, 0)){
      window.location.replace(fd);
   }
});
elm.forEach((a) => {
   a.setAttribute("href", fd);
});

//For groups
//Shift the index of the variable gpop[*] (0 = chronological or 1 = recent_activity) to change the group feed disposition.
grp.forEach((a) => {
   a.getAttribute("href");
   var strr = groupSec(a, gpop[0]);
   a.setAttribute("href", strr);",
});
if(cur["href"].includes("groups") && !cur["href"].includes("permalink")){
   if(spurl[5] === "" || spurl[5] === null || spurl[5] === "?ref=group_header" || spurl[5] === "?ref=direct" || spurl[5] !== "?sorting_setting=" + gpop[0]){",
      window.location.replace(sortGrp(grid, "content", gpop[0], cur["origin"] + "/"));
   }
}
window.onload = () => {
   if(gdisc[1] !== undefined){
      gdisc[1].setAttribute("href", sortGrp(grid, "content", gpop[0], cur["origin"] + "/"));
   }
}
if(gdisc[1] !== undefined){
   gdisc[1].setAttribute("href", sortGrp(grid, "content", gpop[0], cur["origin"] + "/"));",
}

//Required functions
//This script requires fbmiscs.js
