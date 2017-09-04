Vue.component('link_og_data-fieldtype', {

    template: '' +
        '<div>' +
            '<div v-if="isntBlank">' +
                '<div v-if="loading" class="loading">' +
                    '<span class="icon icon-circular-graph animation-spin"></span> {{ translate("cp.loading") }}' +
                '</div>' +
                '<div v-else>' +
                    '<div v-if="error">' +
                        '<p class="alert alert-warning" role="alert">{{ error }}</p>' +
                    '</div>' +
                    '<div v-else class="card link-og-data-preview">' +
                        '<div class="link-og-data-preview-image">' +
                            '<img src="{{ link.og.image }}" />' +
                        '</div>' +
                        '<div class="link-og-data-preview-text">' +
                            '<h2>{{ link.title }}</h2>' +
                            '<p><small>{{ link.description }}</small></p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<input type="url" class="form-control" v-model="data.url" v-on:blur="getData" v-on:keyup="getData" v-on:input="getData" />' +
        '</div>',

    props: ['data', 'config', 'name'],

    data: function() {
        return {
            loading: true,
            error: false,
            previous_url: '',
            ajax: false,
        };
    },

    computed: {
        getUrl: function() {
            return this.data.url;
        },
        link: function() {
            return this.data;
        },
        isValid: function() {
            // Is this link even posibly valid?
            return (this.getUrl.startsWith('http:\/\/') || this.getUrl.startsWith('https:\/\/')) && this.getUrl.length > 7 && this.getUrl.includes('.') && this.getUrl.split('.').slice(-1)[0].length > 0;
        },
        isntBlank: function() {
            // Make sure the field is not blank
            return this.data.url.length > 0;
        },
        urlChanged: function() {
            // Check if the url has changed
            return this.data.url !== this.previous_url;
        },
    },

    methods: {
        getData: function() {
            if (this.isValid && this.urlChanged) {
                // We are now loading ...
                this.loading = this.urlChanged ? true : false;

                var that = this;

                if (this.ajax) {
                  this.ajax.abort();
                }

                this.data = {
                    url: this.getUrl
                };

                this.ajax = $.ajax({
                    url: Statamic.cpRoot + '/addons/link-og-data?url=' + encodeURIComponent(this.getUrl)
                }).done(function(data) {
                    that.data = Object.assign(that.data, data);
                    that.error = false;
                }).fail(function() {
                    that.error = translate("addons.LinkOgData::settings.fetch_error");
                }).always(function() {
                    that.loading = false;
                    that.previous_url = that.data.url;
                });
            } else if (this.urlChanged) {
                this.data = {
                    url: this.getUrl
                };
                this.error = translate("addons.LinkOgData::settings.invalid_url");
            }
        },
    },

    ready: function() {
        $.ajaxSetup({
            cache: false,
            contentType: 'application/json; charset=utf-8',
            crossDomain: false,
            dataType : 'json',
            global: false,
            timeout: 10000,
            type: 'GET'
        });

        // Update the data as soon as Vue is ready.
        this.getData();
    },

});
