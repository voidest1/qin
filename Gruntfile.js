module.exports = function(grunt) {
    const BANNER = [
        '/**',
        ' * Qin <%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>.',
        ' * Copyright (c) 2019 Leon Liu <voidest@hotmail.com>',
        ' *',
        ' * https://github.com/voidest1/qin',
        ' */',
    ].join('\n');
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        concat:{
            options:{
                banner:BANNER,
                separator:';'
            },
            dist:{
                src:['src/*.js'],
                dest:'releases/qin-debug.js'
            }
        },
        watch:{
            files:['src/*.js'],
            tasks:['concat'],
            options:{
                interrupt:true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['concat']);
};