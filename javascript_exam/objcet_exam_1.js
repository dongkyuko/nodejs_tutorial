var grades = {
    'list' : { 'egoing' :10, 'k8805': 8, 'dongkyu':1 },
    'show' : function() {
        for(var name in this.list){
            console.log(name, this.list[name]);
        }
        console.log(this.list);
    }
}

grades.show();