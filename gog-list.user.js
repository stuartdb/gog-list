// ==UserScript==
// @name goglist
// @version 1.0.0
// @namespace http://stuartdb.com
// @author Stuart Baker
// @description Extracts a list of owned games from gog library
// @include *://www.gog.com/account
// @downloadURL https://github.com/stuartdb/gog-list/raw/master/gog-list.user.js
// @run-at document-end
// ==/UserScript==

var cruncher = (function () {
    'use strict';

    var get_game_elements,
        get_game_list,
        create_game_title_list,
        run;

    get_game_elements = function() {
        return document.getElementsByClassName("product-title__text"); 
    }

    get_game_list = function() {
        return document.getElementsByClassName("account__products--games")[0];
    }

    create_game_title_list = function(game_titles) {
        var i = 0,
            li,                      
            ul;
        
        ul = document.createElement("ul");
        ul.id = "gog-list-titles";

        for (i = 0; i < game_titles.length; i = i + 1) {
            li = document.createElement("ul");
            li.textContent = game_titles[i]
            ul.appendChild(li);
        }

        return ul;        
    }

    run = function () {
        var current_list_element,
            i = 0,
            game_titles = [],
            game_elements,
            game_title_list;

        game_elements = get_game_elements();
        for (i = 0; i < game_elements.length; i = i + 1) {
            game_titles[i] = game_elements[i].textContent;            
        }

        game_title_list = create_game_title_list(game_titles);

        current_list_element = get_game_list();
        current_list_element.parentElement.appendChild(game_title_list);
    }

    run();
}());
