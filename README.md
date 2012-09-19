infoo
=====

A simple JavaScript inline notifications module like 'toastr' or 'notifer.js'


Requirements
------------

*   jQuery >= 1.7
*   Bootstrap alert (css + js moulde) >= 2.0


Usage
-----

Link the infoo .js and .css

    <link href="infoo.css" rel="stylesheet"/>
    ...
    <script src="infoo.js"></script>

A default 'info' notification:

    infoo.info('Hola rola');

Success notificaition that will dismiss after 10 seconds:

    infoo.success('Jay, we did it!', 10);

A error notificaition with an explicit title:

    info.error('Something went wrong!', 'Uh, Oh an Error!');

Create custom notification handlers:

    var omg = infoo.handler({
        title: 'OMG',
        clss: 'alert-info',
        timeout: 3
    });

    omg('infoo is so easy');

See Options for defaults

 
Options
-------

... tbc
