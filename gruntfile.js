module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        karma:
        {
            unit:
            {
                configFile: 'karma.conf.js'
            }
        },

        clean:
        {
            temp:
            {
                src: ['temp/']
            },

            dist:
            {
                src: ['dist/']
            }
        },

        copy:
        {
            temp:
            {
                files:
                    [{expand: true, cwd: 'public/', src: ['**'], dest: 'temp/'},
                     {expand: true, cwd: '', src: ['index.html'], dest: 'temp/'}]
            },

            dist:
            {
                files:
                [{expand: true, cwd: 'temp/js/', src: ['*.min.js'], dest: 'dist/js'},
                 {expand: true, cwd: 'temp/css/', src: ['*.min.css'], dest: 'dist/css'},
                 {expand: true, cwd: 'temp/img/', src: ['**'], dest: 'dist/img'},
                 {expand: true, cwd: 'temp/fonts/', src: ['*'], dest: 'dist/fonts'},
                 {expand: true, cwd: 'temp/partials/', src: ['**/*.html'], dest: 'dist/partials'},
                 {expand: true, cwd: 'temp/', src: ['index.html'], dest: 'dist/'}]
            }
        },
        uglify:
        {
            build:
            {
                options: {banner: '/* js minificado ' + new Date().toString() + ' */ '},

                files:
                {
                    'temp/js/frameworks.min.js': ['temp/js/frameworks/jquery-2.1.1.min.js',
                                                         'temp/js/frameworks/angular.min.js',
                                                         'temp/js/frameworks/angular-resource.min.js',
                                                         'temp/js/frameworks/bootstrap.min.js',
                                                         'temp/js/frameworks/socket.io.js'],

                    'temp/js/emd-quotes.min.js': ['temp/js/application/**/*.js'],

                    'temp/js/emd-modules.min.js': ['temp/js/modules/**/*.js']
                }
            }
        },

        cssmin:
        {
            build:
            {
                options: { banner: '/* css minificado ' + new Date().toString() + ' */ ' },

                files:
                {
                    'temp/css/estilo.min.css': ['temp/css/font-awesome.min.css',
                                                       'temp/css/bootstrap.min.css',
                                                       'temp/css/frameworks_overrides.css',
                                                       'temp/css/style.css',
                                                       'temp/css/position.css',
                                                       'temp/css/media_queries.css',
                                                       'temp/css/events.css']
                }
            }
        },

        usemin:
        {
            html: 'dist/index.html'
        },

        replace:
        {
            dist:
            {
                options:
                {
                    patterns: [{match: 'hash', replacement: '<%= new Date().getTime() %>'}]
                },
                files: [{src: ['dist/index.html'], dest: 'dist/index.html'}]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-replace');


    grunt.registerTask('build', ['karma:unit', 'clean:temp', 'clean:dist', 'copy:temp', 'uglify', 'cssmin', 'copy:dist', 'replace', 'usemin', 'clean:temp']);
};