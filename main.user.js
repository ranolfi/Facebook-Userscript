// ==UserScript==
// @name        Facebook Auto "Most Recent" Stories
// @version     0.1559010793
// @author      Hélder Ferreira
// @namespace   https://greasyfork.org/users/89591
// @homepageURL https://greasyfork.org/en/scripts/382099-facebook-auto-most-recent-stories
// @description Change Facebook and groups feed to "Most Recent"
// @compatible  chrome
// @compatible  firefox
// @compatible  opera
// @compatible  safari
// @compatible  msedge
// @license     MIT
// @icon        https://en.facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png
// @match       https://*.facebook.com/*
// @grant       none
// @run-at document-end
// ==/UserScript==

// ### Global vars ###
let currentUrl = new URL(window.location.href);

// ### Feed ###
let feedUrl = currentUrl['origin'] + '?sk=h_chr';

if (currentUrl['href'] === currentUrl['origin'] + '/') {
    window.location.replace(feedUrl); // TODO: allow manual override
}

let feedOptions = ['?sk=h_nor', '?ref=logo', 'sk=nf', '?ref=tn_tnmn'];
feedOptions.forEach(x => {
    if (currentUrl['search'].includes(x)) {
        window.location.replace(feedUrl);
    }
});

let homepageLinks = document.querySelectorAll("[data-click='bluebar_logo'] > a, ._3qcu > a#navItem_4748854339 > a"); // fragile (hardcoded obfuscated identifiers may not work in the future)
homepageLinks.forEach(x => x.addEventListener('click', () => { // TODO: should change the href instead
    window.location.replace(feedUrl);
}), false);


// ### Groups ###
let groupLinks = document.querySelectorAll("[data-type='type_group'] > a");

let groupSortOptions = ['CHRONOLOGICAL', 'RECENT_ACTIVITY'];
let groupSortBy = groupSortOptions[0];

groupLinks.forEach(x => x.addEventListener('click', () => { // TODO: should change the href instead
    let groupUrl = x.getAttribute('href');
    window.location.replace(groupSec(groupUrl, groupSortBy));
}, false));

let groupIdElement = document.querySelectorAll("[property='al:android:url']"); // TODO: no need; 'sorting_setting' also works with default group url (group name)

if (currentUrl['href'].includes('groups') && ! currentUrl['href'].includes('permalink') && ! currentUrl['href'].includes('comment_id')) {
    let splitUrl = currentUrl['href'].split('/');
    let urlArg = splitUrl[5];

    if (urlArg !== '?sorting_setting=' + groupSortBy) { // TODO: allow manual override
        window.location.replace(getGroupUrlWithSortParameter(groupIdElement, 'content', groupSortBy, currentUrl['origin'] + '/'));
    }
}

// # Discussion link #
let groupDiscussionLinks = document.querySelectorAll('._2yau'); // fragile (hardcoded obfuscated identifiers may not work in the future)
if (groupDiscussionLinks[1] !== undefined) {
    let abpg = document.querySelectorAll('._2yaa'); // fragile (hardcoded obfuscated identifiers may not work in the future)
                                                    // TODO: find a more suitable name (WTH does 'abpg' mean?)
    let abpgDataKey = abpg[1].getAttribute('data-key');
    if (! abpgDataKey.includes('tab_about')) {
        groupDiscussionLinks[1].addEventListener('click', () => { window.location.replace(getGroupUrlWithSortParameter(groupIdElement, 'content', groupSortBy, currentUrl['origin'] + '/')) }, false); // TODO: should change the href instead
    }
}

// # 'post time' link #
let postTimestampElement = document.querySelectorAll('._5pcq');
postTimestampElement.forEach(x => x.addEventListener('click', () => { // TODO: should change the href instead
    let url = x.getAttribute('href');
    window.location.replace(url);
}, false));

// # 'comment time' link #
let commentTimestampElement = document.querySelectorAll('._6qw7');
commentTimestampElement.forEach(x => x.addEventListener('click', () => { // TODO: should change the href instead
    let url = x.getAttribute('href');
    window.location.replace(url);
}, false));


// ### Required functions ###
// # Arguments: #
// - groupIdElement = element where group ID is located
// - groupIdAttributeName = atribute where group ID is
// - sortBy = type of group disposition (CHRONOLOGICAL or RECENT_ACTIVITY)
// - url = Facebook domain
function getGroupUrlWithSortParameter(groupIdElement, groupIdAttributeName, sortBy, url) {
    let groupIdElementAttributeValue = groupIdElement[0].getAttribute(groupIdAttributeName); // TODO: why is this done here? (shouldn't)
    let groupId = groupIdElementAttributeValue.split('/')[3];
    return url + 'groups/' + groupId + '/?sorting_setting=' + sortBy;
}

// # Arguments: a = href attribute, b = type of group disposition (CHRONOLOGICAL or RECENT_ACTIVITY), rs = a resource variable #
function groupSec(a, b, rs) {
    rs = a.toString().replace(/(.?)ref=bookmarks/gi, "");
    return rs + "?sorting_setting=" + b;
};
