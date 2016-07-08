var path = require('path');
var fs = require('fs');
var del = require('del');
var media = fis.project.currentMedia();

function getOutputPath(){
	var projectConf = fis.config.get('projectConf');
	var outputPath = '';
	if(media == 'dev'){
		outputPath = '../local';
	}else if(media == 'build'){
		outputPath = projectConf.outputPath || '../dist';	
	}

	return path.resolve(outputPath+'/'+projectConf.name+'/'+projectConf.terminal);

}

var deleteFolderRecursive = function(path) {

    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);

        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }
        });

        fs.rmdirSync(path);

    }

};

module.exports = function(){
	var outputPath = getOutputPath();
	var jsonPath = outputPath + '/components.json';
	var folderPath = outputPath + '/components';
	deleteFolderRecursive(folderPath);
	if( fs.existsSync(jsonPath) ) {
    	fs.unlinkSync(jsonPath);
    }
};
