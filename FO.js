// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

//js mein input Array ke from mein jaata hai and that is array is process.argv Array

const fs = require("fs");

const path = require("path");

let input = process.argv.slice(2);
// console.log(input);

let inputArr = input; // [organzie , folderpath]

let command = inputArr[0];

console.log(inputArr[1])
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "pptx",
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
    ],
    app: ["exe", "dmg", "pkg", "deb"],
    Image:["jpg","png"],
  };
switch (command) {
  case "tree":
    console.log("Tree Implemented");
    break;
  case "organize":
    organizeFn(inputArr[1]);
    break;
  case "help":
    helpFn();
    break;
  default:
    console.log("Please enter a Valid command");
    break;
}

// Help Function will list all the ways by which you can run the commands of this project
function helpFn() {
  console.log(`List of all the commands->
                                 1)Tree - node FO.js tree <dirPath>
                                 2) organize - node FO.js organize <dirPath>
                                 3)help - node FO.js help`);
}

// Organize Function will organize all your target folder's files in a different folders acc to their extensions
function organizeFn(dirPath) {
  let destPath="";
  if (dirPath == undefined) {
    console.log("Please enter a valid Directory Path");
    return;
  } // check whether directory path is passed or not and if not simply return

  let doesExist = fs.existsSync(dirPath);

  // this doesExist will tell the Target Folder exists or not

  if (doesExist == true) {
    destPath = path.join(dirPath, "organized_Files");

    // we created a path for organized_Files Folder

    // check whether in the given destPath does a folder exist with same name and if does not make a folder
    if (fs.existsSync(destPath) == false) {
      fs.mkdirSync(destPath);
    } else {
      console.log("Folder Already Exists");
    }
  } else {
    console.log("Please Enter A valid Path");
  }
   organizeHelper(dirPath,destPath);
// category=getCatogary()

}
function organizeHelper(dirPath,destPath)
{
    let childNamess = fs.readdirSync(dirPath)
    // console.log(childNames)

    for(let i=0;i<childNamess.length;i++){
        let childaddress=path.join(dirPath,childNamess[i])
        // console.log(childaddress)
        let isfile =fs.lstatSync(childaddress).isFile();
        if(isfile==true)
        {
            // console.log(childaddress)
            let filecategory= getCatogary(childNamess[i]);
            // console.log(childNamess[i]+" ->"+ filecategory)
             send_files(childaddress,destPath,filecategory)

        }
    }

}
function getCatogary(name)
{
    let ext= path.extname(name).slice(1);
    // return catogary;



    for(let key in types){
        let cTypeArr =types[key];
        // console.log(cTypeArr)

        for(let i=0;i<cTypeArr.length;i++)
        {
            if(ext== cTypeArr[i]){
                return key;

            }
        }
    }
    return "other"
}
// category=getCatogary()
function send_files(src,destPath,category)
{
    let catPath =path.join(destPath,category);
    if(fs.existsSync(catPath)==false)
    {
        fs.mkdirSync(catPath);
    }


    let fileName =path.basename(src)
    let destfilepath= path.join(catPath,fileName);
    fs.copyFileSync(src,destfilepath);
    fs.unlinkSync(src);
    console.log("Files organized")
}


//     D:\Batches\FJP-4\testFolder\organized_files- we are ready to create folder her
