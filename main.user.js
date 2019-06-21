// ==UserScript==
// @name        Facebook Auto "Most Recent" Stories
// @version     0.1559010793
// @author      Hélder Ferreira
// @namespace   https://greasyfork.org/users/89591
// @homepageURL https://greasyfork.org/en/scripts/382099-facebook-auto-most-recent-stories
// @description Change Facebook and groups feed to "Most Recent
// @compatible  chrome
// @compatible  firefox
// @compatible  opera
// @compatible  safari
// @compatible  msedge
// @license     MIT
// @icon        https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png
// @match       https://*.facebook.com/*
// @grant       none
// ==/UserScript==

// ### Global vars ###
let currentUrl = new URL(window.location.href);

// ### Feed ###
let feedUrl = currentUrl['origin'] + '?sk=h_chr';

if (currentUrl['href'] === currentUrl['origin'] + '/') {
    window.location.replace(feedUrl);
}

let idx = ['?sk=h_nor', '?ref=logo', 'sk=nf', '?ref=tn_tnmn'];
idx.forEach(a => {
    if (currentUrl['search'].includes(a)) {
        window.location.replace(feedUrl);
    }
});

let element = document.querySelectorAll("[data-click='bluebar_logo'] > a, ._3qcu > a#navItem_4748854339 > a");
element.forEach(x => x.addEventListener('click', () => {
    window.location.replace(feedUrl);
}), false);


// ### Groups ###
let group = document.querySelectorAll("[data-type='type_group'] > a");
let groupPop = ['CHRONOLOGICAL', 'RECENT_ACTIVITY'];
group.forEach(shc => shc.addEventListener('click', () => {
    shc = shc.getAttribute('href');
    window.location.replace(groupSec(shc, groupPop[0]));
}, false));

if (currentUrl['href'].includes('groups') && ! currentUrl['href'].includes('permalink') && ! currentUrl['href'].includes('comment_id')) {
    let splitUrl = currentUrl['href'].split('/');

    let groupRef = ['?ref=group_header', '?ref=bookmarks', '?ref=direct', '?fref=nf', '?ref=nf_targetfref=nf'];

    if (splitUrl[5] === '' || splitUrl[5] === null || splitUrl[5] === groupRef[0] || splitUrl[5] === groupRef[1] || splitUrl[5] === groupRef[2] || splitUrl[5] === groupRef[3] || splitUrl[5] === groupRef[4] || splitUrl[5] !== '?sorting_setting=' + groupPop[0]) {
        let groupId = document.querySelectorAll("[property='al:android:url']");
        window.location.replace(sortGroup(groupId, 'content', groupPop[0], currentUrl['origin'] + '/'));
    }
}

// # Discussion link event #
let groupDisc = document.querySelectorAll('._2yau');
if (groupDisc[1] !== undefined) {
    let abpg = document.querySelectorAll('._2yaa');
    abpg = abpg[1].getAttribute('data-key');
    if (! abpg.includes('tab_about')) {
        groupDisc[1].addEventListener('click', () => { window.location.replace(sortGroup(groupId, 'content', groupPop[0], currentUrl['origin'] + '/')) }, false);
    }
}

// # 'post time' & 'comment time' link event #
let postime = document.querySelectorAll('._5pcq');
postime.forEach(ptm => ptm.addEventListener('click', () => {
    ptm = ptm.getAttribute('href');
    window.location.replace(ptm);
}, false));

let comtime = document.querySelectorAll('._6qw7');
comtime.forEach(cmt => cmt.addEventListener('click', () => {
    cmt = cmt.getAttribute('href');
    window.location.replace(cmt);
}, false));


// ### Required functions ###
// # Arguments: a = element where group ID is located, b = atribute where group ID is, c = type of group disposition(CHRONOLOGICAL or RECENT_ACTIVITY), d = Facebook domain, rs = a resource variable #
function sortGroup(a, b, c, d, rs) {
    a = a[0].getAttribute(b);
    rs = a.split('/');
    return d + 'groups/' + rs[3] + '/?sorting_setting=' + c;
}

// # Arguments: a = href attribute, b = type of group disposition (CHRONOLOGICAL or RECENT_ACTIVITY), rs = a resource variable #
function groupSec(a, b, rs) {
    rs = a.toString().replace(/(.?)ref=bookmarks/gi, "");
    return rs + "?sorting_setting=" + b;
};
