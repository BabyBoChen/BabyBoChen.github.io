function py_prop_genController(app){app.controller("py_prop_genController",function($scope){$scope.pyPropsPlaceHolder=`def __init__(self, args):
    self._field:type = value

@property
def field(self) -> type:
    return self._field

@field.setter
def field(self, val:type):
    self._field = val
        `;let regex=new RegExp("self[.]([^=^:]+)(?:(?:[:])([^=]+))?[=](.+)");$scope.pyFields="";$scope.pyProps="";$scope.genProps=function(){var fields=[],lines=$scope.pyFields.split(/\r?\n/);for(let i=0;i<lines.length;i++){var field={fieldName:"",fieldType:"",initialValue:"",propertyName:""},line=lines[i],line=regex.exec(line);field.propertyName=line[1];field.propertyName&&field.propertyName.trim();"_"==field.propertyName[0]&&(field.propertyName=field.propertyName.substring(1));field.fieldName="_"+field.propertyName;field.fieldType=line[2];field.fieldType&&field.fieldType.trim();field.initialValue=line[3];field.initialValue&&field.initialValue.trim();fields.push(field)}$scope.pyProps="def __init__(self, args):\n";for(let i=0;i<fields.length;i++){let field=fields[i],typeHint="";field.fieldType&&(typeHint=":"+field.fieldType);$scope.pyProps+=`    self.${field.fieldName}${typeHint} = ${field.initialValue}
`}for(let i=0;i<fields.length;i++){let field=fields[i],typeHint=":",typeHintIn="";if(field.fieldType){typeHint=` -> ${field.fieldType}:`;typeHintIn=": "+field.fieldType}var getter=`
@property
def ${field.propertyName}(self)${typeHint}
    return self._${field.propertyName}
`,getter=($scope.pyProps+=getter,`
@${field.propertyName}.setter
def ${field.propertyName}(self, val${typeHintIn}):
    self._${field.propertyName} = val
`);$scope.pyProps+=getter}};$scope.copyToClipboard=function(){if($scope.pyProps){navigator.clipboard.writeText($scope.pyProps);let btnCopy=document.querySelector(".py-prop-gen #btnCopy");var btnWidth=btnCopy.getBoundingClientRect().width;let btnText=btnCopy.innerHTML;btnCopy.innerHTML="✓";btnCopy.classList.remove("btn-outline-success");btnCopy.classList.add("btn-success");btnCopy.style.width=btnWidth+"px";window.setTimeout(function(){btnCopy.innerHTML=btnText;btnCopy.classList.remove("btn-success");btnCopy.classList.add("btn-outline-success")},2e3)}}})}export{py_prop_genController};