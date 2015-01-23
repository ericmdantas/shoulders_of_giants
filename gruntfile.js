module.exports = function(grunt)
{
    var _package = grunt.file.readJSON('package.json');
    var _developmentDir = 'client/dev/';
    var _tempDir = 'client/temp/';
    var _distributionDir = 'client/dist/';

    var _loadTasks = function()
    {
        var _devDeps = _package.devDependencies;

        Object.keys(_devDeps)
            .filter(function(tasks)
            {
                var _isGrunt = /^grunt-/;

                return _isGrunt.test(tasks);
            })
            .forEach(function(gruntTask)
            {
                grunt.loadNpmTasks(gruntTask);
            })
    }

    grunt.initConfig({
        pkg: _package,

        karma:
        {
            unit:
            {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS']
            }
        },

        clean:
        {
            temp:
            {
                src: [_tempDir]
            },

            dist:
            {
                src: [_distributionDir]
            }
        },

        less:
        {
            dist:
            {
                files:
                {
                    "client/temp/css/frameworks_overrides.css": "client/temp/css/frameworks_overrides.less",
                    "client/temp/css/style.css": "client/temp/css/style.less",
                    "client/temp/css/position.css": "client/temp/css/position.less",
                    "client/temp/css/media_queries.css": "client/temp/css/media_queries.less",
                    "client/temp/css/events.css": "client/temp/css/events.less"
                }
            }
        },

        copy:
        {
            temp:
            {
                files:
                    [{expand: true, cwd: _developmentDir, src: ['**'], dest: _tempDir},
                     {expand: true, cwd: '', src: ['index.html'], dest: _tempDir}]
            },

            dist:
            {
                files:
                [{expand: true, cwd: _tempDir + 'js/', src: ['*.min.js'], dest: _distributionDir + 'js'},
                 {expand: true, cwd: _tempDir + 'css/', src: ['*.min.css'], dest: _distributionDir + 'css'},
                 {expand: true, cwd: _tempDir + 'img/', src: ['**'], dest: _distributionDir + 'img'},
                 {expand: true, cwd: _tempDir + 'fonts/', src: ['*'], dest: _distributionDir + 'fonts'},
                 {expand: true, cwd: _tempDir + 'partials/', src: ['**/*.html'], dest: _distributionDir + 'partials'},
                 {expand: true, cwd: _tempDir + '', src: ['index.html'], dest: _distributionDir + ''}]
            }
        },
        uglify:
        {
            build:
            {
                files:
                {
                    'client/temp/js/frameworks.min.js': [_tempDir + 'bower_components/jquery/dist/jquery.min.js',
                                                         _tempDir + 'bower_components/angular/angular.min.js',
                                                         _tempDir + 'bower_components/angular-socket-io/socket.min.js',
                                                         _tempDir + 'bower_components/angular-resource/angular-resource.min.js',
                                                         _tempDir + 'bower_components/ng-xtorage/ng-xtorage.min.js',
                                                         _tempDir + 'bower_components/bootstrap/dist/js/bootstrap.min.js',
                                                         'node_modules/socket.io-client/socket.io.js'],


                    'client/temp/js/emd-quotes.min.js': [_tempDir + 'js/modules/**/*.js',
                                                         _tempDir + 'js/application/**/*.js']
                }
            }
        },

        cssmin:
        {
            build:
            {
                files:
                {
                    'client/temp/css/estilo.min.css': [_tempDir + 'css/font-awesome.min.css',
                                                       _tempDir + 'css/bootstrap.min.css',
                                                       _tempDir + 'css/frameworks_overrides.css',
                                                       _tempDir + 'css/fonts.css',
                                                       _tempDir + 'css/style.css',
                                                       _tempDir + 'css/position.css',
                                                       _tempDir + 'css/media_queries.css',
                                                       _tempDir + 'css/events.css']
                }
            }
        },

        usemin:
        {
            html: _distributionDir + 'index.html'
        },

        replace:
        {
            dist:
            {
                options:
                {
                    patterns: [{match: 'hash', replacement: '<%= new Date().getTime() %>'}]
                },
                files: [{src: [_distributionDir + 'index.html'], dest: _distributionDir + 'index.html'}]
            }
        }
    });

    // load tasks
    _loadTasks();

    // register tasks
    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('build', ['clean:temp', 'clean:dist', 'copy:temp', 'uglify', 'less', 'cssmin', 'copy:dist', 'replace', 'usemin', 'clean:temp']);
    grunt.registerTask('dist', ['karma:unit', 'clean:temp', 'clean:dist', 'copy:temp', 'uglify', 'less', 'cssmin', 'copy:dist', 'replace', 'usemin', 'clean:temp']);
};