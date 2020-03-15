/**
 * El objetivo del ejercicio es crear un nuevo array que contenga
 * todos los hashtags del array `tweets`, pero sin repetir
 * 
 */

tweets = [
    'aprendiendo #javascript en  Vigo', 
    'empezando el segundo módulo del bootcamp!',
    'hack a boss bootcamp vigo #javascript #codinglive'];

hastags = [];
finalHastags = [];

for(i=0;i<tweets.length;i++){
    start=tweets[i].indexOf('#');
    end=tweets[i].indexOf(' ',start);
    //La variable hastag almacena el primer hastag de cada tweet
    hastag = tweets[i].slice(start,end);
    //La variable rest almacena el resto del tweet desde donde acaba el primer hastag más un espacio en blanco
    rest = tweets[i].slice(end +1, tweets[i].length);
    //Rellenamos el array con cada hastag que se encuentra 
    if(start!=-1){
        hastags.push(hastag);
    }
    //Bucle interior para buscar un segundo hastag en el resto del tweet y guardarlo en el array
    for(j=0;j<rest.length;j++){
        start=rest[j].indexOf('#');
        end=rest.length;
        
        hastag=rest.slice(start,end);
        if(start!=-1){
            hastags.push(hastag);
        }
    }     
}
//En el array hastags están almacenados todos los hastags encontrados en el bucle for
console.log(hastags);
//Bucle final para descartar hastags repetidos
for (i=0;i<hastags.length;i++){
    if(finalHastags.indexOf(hastags[i])==-1){
        finalHastags.push(hastags[i]);
    }
}

console.log(finalHastags);