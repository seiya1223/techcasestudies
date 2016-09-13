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

    return search;
  }(jQuery));


(function ($) {

    $(document).ready(function() {

        $(".search-filter-button").on("click", function () {
            var navTrigger = $("#nav-trigger");
            navTrigger.prop("checked", !navTrigger.prop("checked"));
            return false;
        });

        $("input.search-value:checked").each(function (index, elem) {
            TogglePartialCheckmarks($(elem));
        })

        $("#SearchPhraseText").on("keyup", function() {
            ToggleSearchButton();
        });

        $(".treeview").delegate("label input:checkbox, label input:radio", "change", function () {
            var $checkbox = $(this);
            var $nestedList = $checkbox.parent().next().next();
            var $selectNestedListCheckbox = $nestedList.find("label:not([for]) input:checkbox");
            var $selectNestedListRadio = $nestedList.find("label:not([for]) input:radio");
            var filter = $checkbox.closest(".treeview").data("filter");

            if ($checkbox.is(":checked")) {
                $selectNestedListCheckbox.prop("checked", true);
                $selectNestedListRadio.first().prop("checked", true);

                ToggleParentInputs($checkbox);
                TogglePartialCheckmarks($checkbox);
                ToggleSearchButton();
                return;
            }
            
            $selectNestedListCheckbox.prop("checked", false);
            $selectNestedListRadio.first().prop("checked", false);		

            ToggleParentInputs($checkbox);
            TogglePartialCheckmarks($checkbox);
            ToggleSearchButton();
        });

        $('#SearchPhraseScopeSelection li a').on('click', function () {
            $("#SearchPhraseScopeString").html($(this).text());
            $("#SearchPhraseScope").val($(this).data("searchphrasescope"));
        });

        $("#ResetSearch").on("click", function () {

            resetSearchForm();

            return false;

        });

    });

    // The search button will display either a "browse all" or "search" message, depending on whether or not any filters are selected.
    function ToggleSearchButton() {
        // Because a readiness state of "All" counts as a filter, we ignore it when we check for checked filter checkboxes.
        if ($(".search-value:checked").filter(function (index, elem) { return $(elem).prop("name") != "Readiness" || ($(elem).prop("name") == "Readiness" && $(elem).val() != "0"); }).length > 0 || $("#SearchPhraseText").val().length > 0) {
            // Adding and removing the class "hide" here because of minor styling complications, this seemed the best choice.
            $(".search-refine").removeClass("hide");
            $(".search-all").addClass("hide");
        }
        else {
            $(".search-refine").addClass("hide");
            $(".search-all").removeClass("hide");
        }
    }

    // This function displays a light checkmark on all parent checkboxes if some but not all of their children are selected.
    function TogglePartialCheckmarks($elem) {
        // These are all parent checkboxes, in a reverse order to make the below code work properly.
        var $parents = $($elem.parents("li").children("label").find("input.search-value").get().reverse());

        if ($parents && $parents.length > 0) {
            $parents.each(function (index, parent) {
                var $checked = $(parent).closest("li").children("ul").find("input.search-value:checked");

                if ($checked.length == 0) {
                    $(parent).closest("li").find(".treeview-checkbox").removeClass("partial-check");
                }
                else {
                    $(parent).siblings(".treeview-checkbox").addClass("partial-check");
                }
            })
        }
    }

    // Toggles parent checkboxes on or off, depending on how many children are selected.
    function ToggleParentInputs($elem) {
        var $parents = $($elem.closest("ul").parents("li").children("label").find("input.search-value").get().reverse());

        if ($parents && $parents.length > 0) {
            $parents.each(function (index, parent) {
                var $unchecked = $(parent).closest("li").children("ul").find("input.search-value:not(checked)");

                // If all children are checked, check the parent...
                if ($unchecked.length == 0) {
                    $(parent).prop("checked", true);
                }
                else {
                    // ...otherwise uncheck the parent.
                    $(parent).parents("li").children("label").find("input.search-value").prop("checked", false);
                }
            })
        }
    }

    // Reset the changes applied to the search form
    function resetSearchForm() {
        $("#SearchPhraseText").val("");
        
        $("input:checkbox.search-value").prop("checked", false);

        $("input:checkbox.search-value + span.partial-check").removeClass("partial-check");

        ToggleSearchButton();
    }

}(jQuery));