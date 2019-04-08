const style = document.getElementById("styleLink");


window.addEventListener('resize', sizeChange);
sizeChange();


function sizeChange(){
    var aspectRatio = window.innerWidth / window.innerHeight;
    if(aspectRatio > 1){
        style.href = "css/landscape.css";
        
    }else{
        style.href = "css/portrait.css";
    }
}