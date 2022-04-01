const { default: zIndex } = require('@material-ui/core/styles/zIndex');
const fs = require('fs');
const { join } = require('path');
const path = require('path');
let types = {
    media: ["mp3"],
    video:["mp4","mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
      "pptx"
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    programming:["js","c","py","cpp","java","class"]
  };


// console.log("Please enter path of folder");
let commond = process.argv.slice(2)[0]
// console.log(commond)

let inputArr = process.argv.slice(3);
let srcPath = inputArr[0];
 console.log(srcPath)
let x = fs.readdirSync(srcPath)
let found = false;
for(let i=0;i<x.length;i++){
    if(x[i]=='organize-files'){
        found =true;
        break;
    }

}
if(found==false){
    folderCreatePromise =  fs.mkdirSync("organize-files");
}

if(commond=="organize"){
// console.log(srcPath)
function createFolder(srcPath){
if(srcPath==undefined){
    console.log("Please enter a valid directory path");
    return;
    
}

}
let folderDetail = fs.promises.readdir(inputArr[0]);
folderDetail.then(function(FolderData){
    for(let i =0;i<FolderData.length;i++){
    let fileName = FolderData[i].toString();
    let completePath =  path.join(srcPath,fileName)
    let isf = fs.stat(completePath,isFileOrFolder);

    function isFileOrFolder(err,stat){
        if(stat.isFile()){
            // let fileNameInOrganize =  path.join("organize_files",fileName);
            // console.log(copyInOrganize)
            let ext = path.extname(fileName);
            let extension = ext.slice(1);
            // console.log(extension)
            for(let type in types){
                let ctype = types[type];
                // console.log(ctype)
                for(let i=0;i<ctype.length;i++){
                    if(extension==ctype[i]){
                        // console.log(type);
                        // break;
                        let directoryName = path.join("organize-files",type);
                        // console.log(directoryName);
                        if(fs.existsSync(directoryName)==false){
                            fs.mkdirSync(directoryName)
                        }
                        let fileDataPromiss =  fs.promises.readFile(fileName);
                        fileDataPromiss.then(function(data){
                            fileNameInTarget = path.join(directoryName,fileName);
                            // console.log(fileNameInTarget)
                            // console.log(data.toString())
                            fs.writeFile(fileNameInTarget,data,function(){
                                console.log(fileName+" copied")
                                fs.promises.unlink(fileName)
                            })
                        })
                        
                        

                    }
                }
            }
        }
    }
    // console.log(fileName)

}
})
}
//for folder Structure
else if(commond=="tree"){
    
    treeHelper(srcPath, " ");


    function treeHelper(targetPath, indent) {
        let isFile = fs.lstatSync(targetPath).isFile();
        // here we have checked wheter the targetPath is a file or a folder
      
        if (isFile == true) {
          let fileName = path.basename(targetPath);
          console.log(indent + "├──" + fileName);
          // this will display the files
        } else {
          let dirName = path.basename(targetPath);
          console.log(indent + "└──" + dirName);
          // this will display the folders
      
          let children = fs.readdirSync(targetPath);
          //console.log(children)
          // here we took out all the children of test folder
      
          for (let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i]);
      
            //console.log(childPath)
            treeHelper(childPath, indent + "\t");
            // using Recursion to repeat the process for all files and Folders
          }
        }
      }



}
else if(commond=='help'){
    console.log(`use following commonds for this programm
                                                            tree   -> for tree structure
                                                            organize  -> for oorganizig files
                                                            help       ->for any help
                                                            exaMPLE OF COMMONDS ARE ->

                                                            For organize
                                                            node organize.js organize "C:/Users/Nitish Pratap/Desktop/file organizer"
                                                            for Tree
                                                            node organize.js tree "C:/Users/Nitish Pratap/Desktop/file organizer"
                                                            for Help
                                                            node organize.js help "C:/Users/Nitish Pratap/Desktop/file organizer"`);
}
else {
    console.error(`Write appropriate commond
                                tree -> 
                                organize`)
}
