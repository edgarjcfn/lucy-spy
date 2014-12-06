module.exports = function(grunt) { 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'watch': {
            game: {
                files: ['mygame/dev/game/**/*.js'],
                tasks: ['concat:game'],
                options: {
                    interrupt: true
                }
            },
            lang: {
                files: ['mygame/dev/lang/**/*.js'],
                tasks: ['concat:lang'],
                options: {
                    interrupt: true
                }
            }            
        },
        'concat': {
            game: {
                src: ['mygame/dev/game/**/*.js'],
                dest: 'mygame/dist/game.js'
            },
            lang: {
                src: ['mygame/dev/lang/**/*.js'],
                dest: 'mygame/dist/lang.js'
            }
        },
        'http-server' : {
            dev : {
                root: './',
                port: 8081
            }
        },
        'concurrent' : {
            dev : {
                tasks: ['http-server', 'watch:game', 'watch:lang'],
                options: {
                    logConcurrentOutput:true
                }
            }
        }            
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('dev', ['concat:game', 'concat:lang', 'concurrent:dev']);

};