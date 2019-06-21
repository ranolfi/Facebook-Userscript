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
let current_url = new URL(window.location.href);
let split_url = current_url['href'].split('/');

// ### Feed vars ###
let feed = current_url['origin'] + '?sk=h_chr';
let element = document.querySelectorAll("[data-click='bluebar_logo'] > a, ._3qcu > a#navItem_4748854339 > a");
let group = document.querySelectorAll("[data-type='type_group'] > a");
let idx = ['?sk=h_nor', '?ref=logo', 'sk=nf', '?ref=tn_tnmn'];

// ### Groups vars ###
let group_id = document.querySelectorAll("[property='al:android:url']");
let group_disc = document.querySelectorAll('._2yau');
let group_pop = ['CHRONOLOGICAL', 'RECENT_ACTIVITY'];
let group_ref = ['?ref=group_header', '?ref=bookmarks', '?ref=direct', '?fref=nf', '?ref=nf_targetfref=nf'];


// ### For Feed ###
if (current_url['href'] === current_url['origin'] + '/') {
    window.location.replace(feed);
}

idx.forEach((a) => {
    if (current_url['search'].includes(a)) {
        window.location.replace(feed);
    }
});

element.forEach(element => element.addEventListener('click', () => { // possible mistake
    window.location.replace(feed);
}), false);


// ### For Groups ###
group.forEach(shc => shc.addEventListener('click', () => {
    shc = shc.getAttribute('href');
    window.location.replace(groupSec(shc, group_pop[0]));
}, false));

if (current_url['href'].includes('groups') && ! current_url['href'].includes('permalink') && ! current_url['href'].includes('comment_id')) {
    if (split_url[5] === '' || split_url[5] === null || split_url[5] === group_ref[0] || split_url[5] === group_ref[1] || split_url[5] === group_ref[2] || split_url[5] === group_ref[3] || split_url[5] === group_ref[4] || split_url[5] !== '?sorting_setting=' + group_pop[0]) {
        window.location.replace(sortGroup(group_id, 'content', group_pop[0], current_url['origin'] + '/'));
    }
}

// # Discussion link event #
if (group_disc[1] !== undefined) {
    let abpg = document.querySelectorAll('._2yaa');
    abpg = abpg[1].getAttribute('data-key');
    if (! abpg.includes('tab_about')) {
        group_disc[1].addEventListener('click', () => { window.location.replace(sortGroup(group_id, 'content', group_pop[0], current_url['origin'] + '/')) }, false);
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
