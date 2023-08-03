module.exports = function(grunt) {

    var config = require('./.screeps.json');
    var email = grunt.option('email') || config.email;
    var password = grunt.option('password') || config.password;
    var branch = grunt.option('branch') || config.branch;
    var local_path = grunt.option('local.local_path') || config.local.local_path;
    var ptr = grunt.option('ptr') ? true : config.ptr;

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        screeps: {
            options: {
                email: email,
                password: password,
                branch: branch,
                // server: 'season',
                local_path: local_path,
                ptr: ptr
            },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**/*.{js,wasm}'],
                        flatten: true
                    }
                ]
        },

        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
        },

        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
                files: [{
                    cwd: 'src/',
                    src: ['**', '!**/ScreepsAutocomplete/**'],
                    dest: 'dist/',
                    filter: 'isFile',
                    // flatten: true,
                    expand: true,
                    rename: function (dest, src) {
                        // Change the path name utilize underscores for folders
                        return dest + src.replace(/\//g,'_');
                    }
                }],
            },
        },

        // Copy files to the folder the client uses to sync to the local server.
        // Use rsync so the client only uploads the changed files.
        rsync: {
            options: {
                args: ["--verbose", "--checksum"],
                exclude: [".git*", "node_modules"],
                recursive: true
            },
            local: {
                options: {
                    src: './dist/',
                    dest: local_path,
                }
            },
        },

        // Watch local files for changes and sync them
        watch: {
            scripts: {
                files: ['./src/**/*.js'],
                tasks: ['local'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.registerTask('default',  ['clean', 'copy:screeps', 'screeps']);
    grunt.registerTask('local',  ['clean', 'copy:screeps', 'rsync:local']);
}