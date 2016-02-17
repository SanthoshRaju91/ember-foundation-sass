/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-foundation-sass',
  ncluded: function(app) {
    this._super.included(app);
    //this.app.import(app.bowerDirectory);
    var options = app.options['ember-foundation-sass'] || {};;
    var emberCLIVersion = app.project.emberCLIVersion();
    if (semver.lt(emberCLIVersion, '1.0.0')) {
      throw new Error('ember-foundation-sass requires ember-cli version 1.0.0 or greater.\n');
    }

    if (semver.lt(emberCLIVersion, '1.0.0')) {
      //Using old form to add sassOptions for old ember-clis
      //Make sure the ember-cli-sass options are set/appended in the right way (and not just overwriting)
      if(options['sassOptions'] && options['sassOptions']['includePaths']) {
        options['sassOptions']['includePaths'].push('bower_components/foundation/scss');
      } else {
        options['sassOptions'] = options['sassOptions'] || {};
        options['sassOptions']['includePaths'] = ['bower_components/foundation/scss'];
      }
    }

    if (options['foundation-sass']) {
      throw new Error('Using "foundation-sass" in your Brocfile is deprecated.  Please use "ember-cli-foundation-sass" instead.');
    }

    var foundationJSPath = path.join(app.bowerDirectory, 'foundation', 'js', 'foundation');
    var modernizrPath    = path.join(app.bowerDirectory, 'modernizr');
    var fastclickPath    = path.join(app.bowerDirectory, 'fastclick', 'lib');

    if (options.modernizr) {
      app.import(path.join(modernizrPath, 'modernizr.js'));
    }

    if (options.fastclick) {
      app.import(path.join(fastclickPath, 'fastclick.js'));
    }

    //Includes the foundation js depending on the given option 'all', true, ['topbar']
    if (options.foundationJs) {
      if (typeof options.foundationJs == 'string' || options.foundationJs instanceof String) {
        if (options.foundationJs === 'all') {
          app.import(path.join(app.bowerDirectory, 'foundation', 'js', 'foundation.js'));
        }
      } else {
        app.import(path.join(foundationJSPath, 'foundation.js'));
      }

      if (options.foundationJs instanceof Array) {
        options.foundationJs.forEach(function(componentName) {
          app.import(path.join(foundationJSPath, 'foundation.' + componentName + '.js'));
        });
      }
    }
  }
};
