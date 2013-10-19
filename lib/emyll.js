/*
 * emyll
 * https://github.com/chrisenytc/emyll
 *
 * Copyright (c) 2013 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var paths = require('./paths.json');
var exec = require('exec-sync');
var async = require('async');
require('colors');

var sudo = function(command) {
	exec('sudo '+command.join(' '));
};

var grantPermission = function(path) {
	sudo([ 'chmod', '0777', path ]);
	console.log('Grant Permission to '+path.green);
};

var apacheModel = function(domain, documentRoot) {
	return '<VirtualHost *:80>\n\tServerAdmin webmaster@'+domain+'\n\tServerName '+domain+'\n\tServerAlias www.'+domain+'\n\n\tDocumentRoot '+documentRoot+'\n\n\t<Directory '+documentRoot+'>\n\t\tOptions Indexes FollowSymLinks MultiViews\n\t\tAllowOverride All\n\t\tOrder allow,deny\n\t\tAllow from all\n\t</Directory>\n</VirtualHost>\n';
};

var nginxModel = function(domain, documentRoot) {
	return 'server {\n\tlisten   80;\n\n\troot '+documentRoot+';\n\n\tindex index.php index.html index.htm;\n\n\tserver_name '+domain+';\n}';
};

var createApache = function(domain, documentRoot) {
	fs.writeFileSync(paths.apache+domain, apacheModel(domain, documentRoot));
	console.log('Creating Vhost '+domain.green);
};

var createNginx = function(domain, documentRoot) {
	fs.writeFileSync(paths.nginx+domain, nginxModel(domain, documentRoot));
	console.log('Creating Vhost '+domain.green);
};

var removeApache = function(domain) {
	fs.unlinkSync(paths.apache+domain);
	fs.unlinkSync(path.normalize(paths.apache+'../sites-enabled/'+domain));
	console.log('Deleting Vhost '+domain.red);
};

var removeNginx = function(domain) {
	fs.unlinkSync(paths.nginx+domain);
	fs.unlinkSync(path.normalize(paths.nginx+'../sites-enabled/'+domain));
	console.log('Deleting Vhost '+domain.red);
};

var createSymLink = function(domain, server) {
	switch(server)
	{
		case 'apache':
			sudo([ 'ln', '-s', paths.apache+domain, path.normalize(paths.apache+'../sites-enabled/'+domain) ]);
			console.log('Enable Vhost '+domain.green);
			break;
		case 'nginx':
			sudo([ 'ln', '-s', paths.nginx+domain, path.normalize(paths.nginx+'../sites-enabled/'+domain) ]);
			console.log('Enable Vhost '+domain.green);
			break;
		default:
			console.log('server option is required!'.red);
			break;
	}
};

var appendHosts = function(domain) {
	fs.appendFileSync('/etc/hosts', '127.0.1.1 '+domain+' www.'+domain+'\n');
	console.log('Adding '+domain.gren+' in Hosts');
};

var removeHosts = function(domain) {
	fs.readFile('/etc/hosts', 'utf-8', function (err, data) {
			if (err) 
			{
				throw err;
			}
		var content = data.replace('127.0.1.1 '+domain+' www.'+domain+'\n', '');
		fs.writeFile('/etc/hosts', content, function (err) {
			if (err) 
			{
				throw err;
			}
		});
	});
	console.log('Deleting '+domain.red+' in Hosts');
};

var restartService = function(service) {
	sudo([ 'service', service, 'restart' ]);
	console.log('Restarting '+service.yellow);
};

exports.test = function() {
	return 'tested';
};

exports.paths = paths;

exports.grantPermissions = function(path) {
	fs.exists(path, function(exists){
		if(exists)
		{
			grantPermission(path);
			return true;
		}
	});
};

exports.setPaths = function(apachePath, nginxPath) {
	var data = {
		apache: path.normalize(apachePath+'/sites-available/'),
		nginx: path.normalize(nginxPath+'/sites-available/')
	};
  fs.exists(__dirname+'/paths.json', function(){
			fs.writeFile(__dirname+'/paths.json', JSON.stringify(data, null, 4), function(err) {
					if(err) {
						console.log(err);
					}
					else {
						console.log("Paths created successfully".green);
					}
			}); 
	});
};

exports.createVhosts = function(domain, documentRoot, server){
	switch(server)
	{
		case 'apache':
			async.series([
				createApache(domain, documentRoot),
				createSymLink(domain, server),
				appendHosts(domain),
				restartService('apache2'),
				console.log('Vhost '+domain.green+' created successfully!')
			]);
			break;
		case 'nginx':
			async.series([
				createNginx(domain, documentRoot),
				createSymLink(domain, server),
				appendHosts(domain),
				restartService(server),
				console.log('Vhost '+domain.green+' created successfully!'.green)
			]);
			break;
		default:
			console.log('server option is required'.red);
			break;
	}
};

exports.removeVhosts = function(domain, server) {
	switch(server)
	{
		case 'apache':
			async.series([
				removeApache(domain),
				removeHosts(domain),
				restartService('apache2'),
				console.log('Vhost '+domain.green+' deleted successfully!')
			]);
			break;
		case 'nginx':
			async.series([
				removeNginx(domain),
				removeHosts(domain),
				restartService('nginx'),
				console.log('Vhost '+domain.grenn+' deleted successfully!')
			]);
			break;
		default:
			console.log('server option is required'.red);
			break;
	}
};