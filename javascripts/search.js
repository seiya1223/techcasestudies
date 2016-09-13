---
---

var customFilter = (function($){
    var mod = [];

    mod.applyFilter = function (filters, keywords) {
        var $articles = $(".carditem");
        var matchingArticles = [];

        $.getJSON("posts.json", function(data){

            $articles.hide();

            $.each(data, function(key, val){

                // Check if matches all the filters
                var filterMatch = true;
                $.each(filters, function(name, filter) {
                    filterMatch = filterMatch && searchByFilter(val, filter); 
                })

                // Perform a keyword search
                var keywordSearch = searchByKeyword(val, keywords);

                if (filterMatch && keywordSearch) {
                    matchingArticles.push(val.id);
                }

            });

            $.each(matchingArticles, function(key, data){
                $(".carditem#" + data).show();
            });

            // Force layout
            $("#container").packery();

        });

    }

    var searchByFilter = function(post, filter) {
        if (filter.values.length == 0) {
            return true;
        }

        var postValues = [];
        var postElement = post[filter.metadataField];
        if (Array.isArray(postElement)) {
            postValues = postElement;
        } else {
            postValues.push(postElement);
        }

        var matchingElements = arrayIntersection(postValues, filter.values);
        if (matchingElements && matchingElements.length > 0) {
            return true;
        }

        return false;
    }

    var searchByKeyword = function(post, keywords) {
        if (!keywords) {
            return true 
        }

        // TODO Implement keyboard search
        return true;
    }

    mod.removeFilters = function () {
        var $articles = $(".carditem");
        $articles.show();

        // Force layout
        $("#container").packery();

    }

    var arrayIntersection = function(array1, array2) {
        return array1.filter(function(n) {
            return array2.indexOf(n) != -1;
        });
    }

    return mod;
}(jQuery));

var customSearch = (function($){
    var search = [];

    search.applyFilters = function () {
        var selectedFilters = {};

        {% assign categories = site.data.categories %}
        {% for category in categories %}
        selectedFilters.{{ category.name }} = {};
        selectedFilters.{{ category.name }}.metadataField = '{{ category.metadataField }}';
        selectedFilters.{{ category.name }}.values = [];
        $.each( $("input[name=Isv{{ category.name }}]:checked"), function(){
            selectedFilters.{{ category.name }}.values.push($(this).val());
        });
        {% endfor %}

        var keywordSearch = $("#SearchPhraseText").val();
        
        customFilter.applyFilter(selectedFilters, keywordSearch);

        // Close search
        closeSearch();

        return false;
    }

    search.removeFilters = function(){

        customFilter.removeFilters();

        // Close search
        closeSearch();

        return false;
    }

    var closeSearch = function() {
        var navTrigger = $("#nav-trigger");
        navTrigger.prop("checked", false);
    }


    $(".search-filter-button").on("click", function () {
        var navTrigger = $("#nav-trigger");
        navTrigger.prop("checked", !navTrigger.prop("checked"));
        return false;
    });

    return search;
  }(jQuery));