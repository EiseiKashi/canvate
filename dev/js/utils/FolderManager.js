"use strict"

import { handleObject, handleString, handleEmptyString, handleArray, handleNumber } from '../errors/errorHandling.js';
import { Emitter } from '../events/Emitter.js';

const LINBO = {};

const NAME = 'FolderManager ';

/*
    p_ project
    w_ workspace
    i_ image
    a_ annotation
    d_ dataset
    m_ model
    f_ folder
*/

const PROJECT = 'p_';
const WORKSPACE = 'w_';
const IMAGE = 'i_';
const ANOTATION = 'a_';
const DATASET = 'd_';
const MODEL = 'm_';
const FOLDER = 'f_';

var counter = 0;

export function FolderManager(folderName){
    "use strict"
    const _self = this;
    handleEmptyString(folderName, NAME + 'constructor, argument folderName');

    const _emitter = new Emitter(this, ['open', 'remove', 'add']);

    var _currentIndex;
    var _currentFolder;
    var _folderName = folderName;
    var _path = [];
    var _parent;

    const _history = [];
    const _id = counter++;
    const _folderList = [];
    const _imageList = [];
    const _folderDictionary = {};

    const defaultName = 'New Folder';

    function convertToImageItem(data){
        return {
            id: data.id,
            name: data.logical_filename,
            url : data.physical_path,
            dataType : data.type,
            type: 'file'
        }
    }

    this.inflate = function(folderMap, imageMapList){
        handleObject(folderMap, NAME + 'constructor, argument folder');
        handleObject(imageMapList, NAME + 'constructor, argument imageMapList');
        for(let item in folderMap){
            const prefix = item.slice(0,2).toLowerCase();
            const codeName = item;
            const name = decodeURIComponent(codeName.slice(2));
            switch(prefix){
                case FOLDER:
                    const folder = folderMap[codeName];
                    handleObject(folder, NAME + `inflate, inflating folder, the folder must be a null Object but got: ${folder}`);
                    const newFolder = new FolderManager(name);
                          newFolder.inflate(folder, imageMapList);
                    this.addFolder(newFolder);
                    
                    break;
                case IMAGE:
                    const id = folderMap[codeName];
                    const image = imageMapList[id];
                    const imageItem = convertToImageItem(image);
                    this.addImageItem(imageItem);
                    handleObject(image, NAME + `inflate, inflating Image, the id: ${name} doesnt exist in the image list.`);
                    break;
            }
        }
        const folderList = this.getFolders();
    }

    this.getMap = function(){
        const selfMap = {};
        
        let iterator = _folderList.entries();
        for(const[index, folder] of iterator){
            let map = folder.getMap();
            selfMap[FOLDER + encodeURIComponent(folder.name)] = map;
        }

        iterator = _imageList.entries();
        for(const[index, image] of iterator){
            selfMap[IMAGE + encodeURIComponent(image.name)] = image.id;
        }

        return selfMap;
    }

    this.getImages = function(){
        return _imageList;
    }

    this.getFolders = function(){
        return _folderList.slice();
    }

    this.getImageById = function(id){
        handleNumber(id, NAME + ' getImageById, id argument, got:' + id);
        const iterator = _imageList.entries();
        for(const[index, imageItem] of iterator){
            if(imageItem.id == id){
                return imageItem;
            }
        }
    }

    this.renameImageById = function(id, name){
        handleNumber(id, NAME + ' renameImageById, id argument, got:' + id);
        handleEmptyString(name, NAME + ' renameImageById name argument, got:' + name);

        const iterator = _imageList.entries();
        for(const[index, imageItem] of iterator){
            if(imageItem.id == id){
                imageItem.name = name;
            }
        }
    }

    this.renameImage = function(imageItem, name){
        handleObject(imageItem, NAME + ' renameImageById, imageItem argument, got:' + imageItem);
        handleEmptyString(name, NAME + ' renameImageById name argument, got:' + name);
        this.removeImageById(imageItem.id, name);
    }

    this.getName = function(){
        return _folderName;
    }

    this.setName = function(name){
        handleString(name, NAME + ', setName: the argument name must be a String: ' + name);
        if(null != _parent){
            _parent.removeFolder(this);
            _folderName = name;
            _parent.addFolder(this);
        }else{
            _folderName = name;
        }
    }

    this.getId = function(){
        return _id;
    }

    this.getPath = function(){
        return _path.slice().join('/')+_folderName;
    }

    this.getParent = function(){
        return _parent;
    }

    // FOLDERS
    this.getFolderByName = function(searchedName){
        handleEmptyString(searchedName, NAME + ', getFolderByName: the argument searchedName must be a non empty String.');

        return _folderDictionary[searchedName];
    }

    this.addFolderList = function(list){
        handleArray(list, NAME + ', addFolderList: the argument list must be and Array of FolderManager instances.');
        let iterator = list.entries();
        for(const[index, folder] of iterator){
            this.addFolder(folder);
        }
    }

    this.addFolder = function(newFolder){
        handleObject(newFolder, NAME + ', addFolder: the argument newFolder must be a FolderManager instance but got: ' + newFolder);
        if(!(newFolder instanceof FolderManager)){
            throw new Error(NAME  + ', addFolder: the argument newFolder must be an instance of: FolderManager instance.');
        }
        if(newFolder == this){
            // Early return
            return;
        }

        const parent = newFolder.getParent();
        if(null != parent && parent != this){
            parent.removeFolder(newFolder);
        }

        let newName = newFolder.getName();
        const existingFolder = _folderDictionary[newName];

        if(null != existingFolder){
            let newFolderList = newFolder.getFolders();
            let newImageList = newFolder.getImages();
            existingFolder.addFolderList(newFolderList);
            existingFolder.addImageItemList(newImageList);
            newFolder = existingFolder;
        }else{
            let id = newFolder.getId();
            LINBO[id] = {parent: this, path: _path};
            _folderList.push(newFolder);
            _folderDictionary[newName] = newFolder;
            newFolder.update();
        }

        emitEvent('add', newFolder);
        return _folderDictionary[newName];
    }

    this.newFolder = function(){
        let name = defaultName;
        let counter = 1;
        while(_folderDictionary[name]){
            name = defaultName + ' ' + counter;
            counter++;
        }

        const existingFolder = _folderDictionary[name];
        let newFolder;
        if(null == existingFolder){
            newFolder = new FolderManager(name);
            this.addFolder(newFolder);
        }else{
            newFolder = existingFolder;
        }
        emitEvent('add', newFolder);
        return newFolder;
    }

    this.removeFolder = function(folder){
        handleObject(folder, NAME + ', removeFolder: the argument folder must be a FolderManager instance but got: ' + folder);
        if(!(folder instanceof FolderManager)){
            throw new Error(NAME  + ', removeFolder: the argument folder must be an instance of: FolderManager instance but got: ' + folder);
        }
        if(folder == this){
            throw new Error('FolderManager a folder can not be delete to him self.' + folder);
            return;
        }
        const name = folder.getName();
        const existingFolder = _folderDictionary[name];
        if(null != existingFolder){
            const index = _folderList.indexOf(existingFolder);
            _folderList.splice(index, 1);
            delete _folderDictionary[name];
            emitEvent('remove', folder);
            return true;
        }
        return false;
    }

    // IMAGES
    this.addImageItem = function(newImage){
        handleObject(newImage, NAME + ', addImageItem: the argument newImage must be an ImageItem instance but got: ' + newImage);
        const iterator = _imageList.entries();
        for(const[index, imageItem] of iterator){
            if(imageItem.id == newImage.id && newImage.type == imageItem.type){
                return;
            }
        }

        newImage.folderPath = this.getPath() + '/' + newImage.name;
        _imageList.push(newImage);
        emitEvent('add', newImage);
        return true;
    }

    this.addImageItemList = function(list){
        handleArray(list, NAME + ', addImageItemList: the list argument must be an Array but got: ' + list);
        const iterator = list.entries();
        for(const[index, imageItem] of iterator){
            this.addImageItem(imageItem);
        }
    }

    this.removeImageById = function(id){
        handleNumber(id, NAME + ' removeImageById, the argument id must be a Numnber but got: ' + id);
        const iterator = _imageList.entries();
        for(const[index, imageItem] of iterator){
            if(id == imageItem.id){
                _imageList.splice(index, 1);
            }
        }
    }

    this.removeImage = function(imageItem){
        handleObject(imageItem, NAME + ' removeImage, the argument imageItem must be an ImageItem instance but got: ' + image);
        handleNumber(imageItem.id, NAME + ' removeImage, the argument imageItem must be an ImageItem instance but got: ' + image);
        this.removeImageById(image.id);
    }

    this.open = function(folder){
        handleObject(folder, NAME + ', open the folder argument must be a FolderManager instance');
        if(!(folder instanceof FolderManager)){
            throw new Error(NAME  + ', open: the argument folder must be an instance of: FolderManager instance.');
        }

        if(folder == this || _folderList.indexOf(folder) > -1){
            _currentIndex = _folderList.length;
            _history.push(folder);
            _currentFolder = folder;
            return true;
        }

        emitEvent('open', folder);
        return false;
    }

    this.next = function(){
        if(_currentIndex + 1 < _folderList.length-1){
            _currentIndex++;
            _currentFolder = _folderList[_currentIndex];
            return true;
        }
        emitEvent('open', _currentFolder);
        return false;
    }

    this.prev = function(){
        if(_currentIndex - 1 > -1){
            _currentIndex--;
            _currentFolder = _folderList[_currentIndex];
            return true;
        }

        return false;
    }

    this.getIndex = function(){
        return _currentIndex;
    }

    this.addEventListener = function(type, methodToAdd, contextToAdd){
        _emitter.addEventListener(type, methodToAdd, contextToAdd);
    }

    this.removeEventListener = function (type, methodToAdd, contextToAdd){
        _emitter.removeEventListener(type, methodToAdd, contextToAdd);
    }

    function emitEvent (type, item){
        const event = {
            type,
            item
        }

        _emitter.emitEvent(type, event);
    }

    this.open(this);

    this.update = function(){
        const parentData = LINBO[_id];
        if(null != parentData){
            _parent = parentData.parent;
            _path = parentData.path;
            delete LINBO[_id];
        }
    }
}
