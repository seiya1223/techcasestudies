(function ($) {
    $(document).ready(function() {
        $('#container').packery();

        if (window.interactions) {
            window.interactions.setup();
        }

        $(".search-filter-button").on("click", function () {
            var navTrigger = $("#nav-trigger");
            navTrigger.prop("checked", !navTrigger.prop("checked"));
            return false;
        });
    });
}(jQuery));