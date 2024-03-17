/** @param {angular.IModule} app  */
function py_prop_genController(app){
    app.controller("py_prop_genController", function($scope) {
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
            console.log(fields);
            $scope.pyProps = "";
            for(let i = 0; i < fields.length; i++){
                let field = fields[i];
                let typeHint = "";
                if(field.fieldType){
                    typeHint = `:${field.fieldType}`;
                }
                $scope.pyProps += `self.${field.fieldName}${typeHint} = ${field.initialValue}\n`;
            }
        };
    });
}
export { py_prop_genController };