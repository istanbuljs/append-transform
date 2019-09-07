'use strict';

const ModuleSystem = require('fake-module-system');
const appendTransform = require('..');

ModuleSystem.prototype.installConventionalTransform = function (transformFn, ext = '.js') {
	const originalExtension = this.extensions[ext];

	this.extensions[ext] = function (module, filename) {
		const originalCompile = module._compile;
		module._compile = function (code, filename) {
			module._compile = originalCompile;
			module._compile(transformFn(code, filename), filename);
		};

		originalExtension(module, filename);
	};
};

ModuleSystem.prototype.appendTransform = function (transform, ext) {
	return appendTransform(transform, ext, this.extensions);
};

module.exports = ModuleSystem;

