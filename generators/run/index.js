(function() {

    'use strict';

    var yeoman = require('yeoman-generator'),
        scaffold = {};

    module.exports = yeoman.generators.Base.extend({

        constructor: function() {
            yeoman.generators.Base.apply(this, arguments);

            this.option('skip-welcome');

            this.argument('runType', {
                type: String,
                required: false
            });

            scaffold = require('../../scaffold')(this);

            this.isBuild = typeof this.runType !== 'undefined' && this.runType.toLowerCase() === 'build';
        },

        initializing: function() {
            if (!this.options['skip-welcome']) {
                scaffold.welcomeMessage('       Running project       ', 'Starting development mode. I will start a server with BrowserSync support. :)');
            }
        },

        install: function() {
            if (this.isBuild) {
                this.spawnCommand('grunt', ['serve']);

                return false;
            }

            this.spawnCommand('grunt', ['default']);
        }

    });

})();
