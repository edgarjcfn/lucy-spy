var fs = require('fs');
var marked = require('marked');
var path = require('path');

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'watch': {
            lang: {
                files: ['lucy/dev/lang/*.js'],
                tasks: ['copy:skulpt'],
                options: {
                    interrupt: true
                }
            },

            game: {
                files: ['lucy/dev/game/**/*.ts'],
                tasks: ['ts:game', 'concat:game'],
                options: {
                    interrupt: true
                }
            },

            app: {
                files: ['lucy/dev/app/**/module.js', 'lucy/dev/app/**/*.js'],
                tasks: ['concat:app'],
                options: {
                    interrupt: true
                }
            },

            md: {
                files: ['lucy/dev/game/assets/levels/**/*.md'],
                tasks: ['md'],
                options: {
                    interrupt: true
                }
            }

        },

        //
        // Typescript task. Compiles changes made to the game code
        //
        'ts': {
            options: {
                'module': 'amd'
            },
            game: {
                src: ['./bower_components/phaser/typescript/phaser.d.ts', './lucy/dev/game/**/*.ts'],
                outDir: './lucy/dev/game/_compiled/'
            }
        },

        //
        // Copy task to copy skulpt changes from dev/ to dist/
        //
        'copy': {
            skulpt : {
                files : [
                    {expand:true, src:['lucy/dev/lang/*.js'], dest:'lucy/dist/', flatten:true}
                ]
            }
        },

        //
        // Concat task to join all Angular Modules into one file
        //
        'concat': {
            options: {
                process: function(src, filepath) {
                  return '//\n// ' + filepath + '\n//\n' + src;
                }
            },
            app: {
                src: ['lucy/dev/app/**/module.js', 'lucy/dev/app/**/*.js'],
                dest: 'lucy/dist/app.js'
            },
            game: {
                src: ['lucy/dev/game/**/*.js'],
                dest: 'lucy/dist/game.js'
            }
        },

        //
        // Starts the HTTP Server for local testing
        //
        'http-server' : {
            dev : {
                root: './',
                port: 8081
            }
        },

        //
        // Runs tasks concurrently
        //
        'concurrent' : {
            dev : {
                tasks: ['http-server', 'watch:lang', 'watch:game', 'watch:app'],
                options: {
                    logConcurrentOutput:true
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ts');

    grunt.registerTask('dev', ['concurrent:dev'])

    grunt.registerTask('md', 'Parse markdown files', function() {
        function getDirectories(srcpath) {
          return fs.readdirSync(srcpath).filter(function(file) {
            return fs.statSync(path.join(srcpath, file)).isDirectory();
          });
        }

        function writeParsedHtml(dir, filename) {
            grunt.log.writeln('Reading: ' + filename);
            var mdString = fs.readFileSync(dir+filename, 'utf8');
            var htmlString = marked(mdString);
            var baseName = path.basename(filename, '.md'); // filename without ext
            var newfile = dir+baseName+'.html'
            fs.writeFileSync(newfile, htmlString);
            grunt.log.writeln('Finished writing :' + newfile);
        }


        var levelsDir = './lucy/dev/game/assets/levels/';
        var folders = getDirectories(levelsDir);
        for (var folder in folders) {
            var fullpath = levelsDir + folders[folder] + '/';
            var files = fs.readdirSync(fullpath);
            for (var file in files) {
                if (path.extname(files[file]) === '.md') {
                    var filename = files[file];
                    writeParsedHtml(fullpath, filename);
                }
           }
        }

        grunt.log.writeln('finished')
    });
};
