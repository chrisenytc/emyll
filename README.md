# Emyll [![Build Status](https://secure.travis-ci.org/chrisenytc/emyll.png?branch=master)](http://travis-ci.org/chrisenytc/emyll) [![Dependency Status](https://gemnasium.com/chrisenytc/emyll.png)](https://gemnasium.com/chrisenytc/emyll) [![NPM version](https://badge.fury.io/js/emyll.png)](http://badge.fury.io/js/emyll) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/emyll/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

Virtual Hosts Manager for Apache and Nginx

## Getting Started
Install the module with: `npm install -g emyll`

Configure settings

`emyll init`

required: `apachePath` or `nginxPath`

returns

```shell
Choose your server: (apache|nginx) <server>
Apache Path: <path>
[sudo] password for chris: 
Grant Permission to /etc/apache2/
[sudo] password for chris: 
Grant Permission to /etc/apache2/sites-available/
```

## Examples

###### Create Vhosts
Create Apache or Nginx vhosts

`emyll create`

required: `domain`, `documentRoot` and `server`

returns

```shell
Domain: <domain>
DocumentRoot: <documentRoot>
Choose your server? (apache|nginx) <server>
Creating Vhost <domain>
[sudo] password for chris: 
Enable Vhost <domain>
Adding <domain> in Hosts
[sudo] password for chris: 
Restarting <server>
Vhost <domain> created successfully!
```

###### Remove Vhosts
Remove Apache or Nginx vhosts

`emyll remove <domain>`

required: `domain` and `server`

returns

```shell
Choose your server: (apache|nginx) <server>
Deleting Vhost <domain>
Deleting <domain> in Hosts
[sudo] password for chris: 
Restarting <server>
Vhost <domain> deleted successfully!
```

# Contributing

Please submit all issues and pull requests to the [chrisenytc/emyll](http://github.com/chrisenytc/emyll) repository!

## Screenshort

[![Emyll](https://raw.github.com/chrisenytc/emyll/master/screenshort.png)](https://github.com/chrisenytc/emyll)

## Release History

 * 2013-10-19    v0.1.3   Fixed #3 appendHosts in lib/emyll.js.
 * 2013-10-19    v0.1.2   Fixed #1 restartService in lib/emyll.js.
 * 2013-10-19    v0.1.1   Fixed setPaths in lib/emyll.js.
 * 2013-10-19    v0.1.0   Initial Release.

## License
Copyright (c) 2013 Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.