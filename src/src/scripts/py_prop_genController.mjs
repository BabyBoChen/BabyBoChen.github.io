/** @param {angular.IModule} app  */
function py_prop_genController(app){
    app.controller("py_prop_genController", function($scope) {
        $scope.pyPropsPlaceHolder = `def __init__(self, args):
    self._field:type = value

@property
def field(self) -> type:
    return self._field

@field.setter
def field(self, val:type):
    self._field = val
        `;
        let regex = new RegExp("self[.]([^=^:]+)(?:(?:[:])([^=]+))?[=](.+)");
        $scope.pyFields = "";
        $scope.pyProps = "";
        $scope.genProps = function(){
            let fields = [];
            let lines = $scope.pyFields.split(/\r?\n/);
            for(let i = 0; i < lines.length; i++){
                let field = {
                    fieldName : "",
                    fieldType : "",
                    initialValue: "",
                    propertyName : "",
                };
                let line = lines[i];
                let res = regex.exec(line);
                //console.log(res);
                field.propertyName = res[1];
                if(field.propertyName){
                    field.propertyName.trim();
                }
                if(field.propertyName[0] == "_"){
                    field.propertyName = field.propertyName.substring(1);
                }
                field.fieldName = "_" + field.propertyName;
                field.fieldType = res[2];
                if(field.fieldType){
                    field.fieldType.trim();
                }
                field.initialValue = res[3];
                if(field.initialValue){
                    field.initialValue.trim();
                }
                fields.push(field);
            }
            //console.log(fields);
            $scope.pyProps = "def __init__(self, args):\n";
            for(let i = 0; i < fields.length; i++){
                let field = fields[i];
                let typeHint = "";
                if(field.fieldType){
                    typeHint = `:${field.fieldType}`;
                }
                $scope.pyProps += `    self.${field.fieldName}${typeHint} = ${field.initialValue}\n`;
            }
            for(let i = 0; i < fields.length; i++){
                let field = fields[i];
                let typeHint = ":";
                let typeHintIn = "";
                if(field.fieldType){
                    typeHint = ` -> ${field.fieldType}:`;
                    typeHintIn = `: ${field.fieldType}`;
                }
                let getter = `
@property
def ${field.propertyName}(self)${typeHint}
    return self._${field.propertyName}
`;
                $scope.pyProps += getter;
                let setter = `
@${field.propertyName}.setter
def ${field.propertyName}(self, val${typeHintIn}):
    self._${field.propertyName} = val
`
                $scope.pyProps += setter;
            }
        };
        $scope.copyToClipboard = function(){
            if ($scope.pyProps) {
                navigator.clipboard.writeText($scope.pyProps);
                let btnCopy = document.querySelector(".py-prop-gen #btnCopy");
                let btnWidth = btnCopy.getBoundingClientRect().width;
                let btnText = btnCopy.innerHTML;
                btnCopy.innerHTML = "✓";
                btnCopy.classList.remove("btn-outline-success");
                btnCopy.classList.add("btn-success");
                btnCopy.style.width = btnWidth + "px";
                window.setTimeout(function(){
                    btnCopy.innerHTML = btnText;
                    btnCopy.classList.remove("btn-success");
                    btnCopy.classList.add("btn-outline-success");
                }, 2000);
            }
        };
    });
}
export { py_prop_genController };