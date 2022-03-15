// 1primeira coisa a fazer é prevenir as ações padrões do sistema
//1No caso aqui seria a parte de mandar

document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    // 2 pega o que ele digitou
    let input = document.querySelector('#searchInput').value;
    //3 saber se o cara digitou alguma coisa
    if(input !== ''){
        //mostrar pro cara que a gente vai fazer alguma coisa
        showWarning('Carregando...');
        //usar o encodeURI no input para gerar url na pesquisa e foi agregado dois itens depois do & comercial
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;
        // para fazer requisição usando o fetch
        let results = await fetch(url);
        // pegar o resultas e transformar em objeto do javascript
        let json = await results.json();
        //requisição precisa colocar async na função de await dps no elemento
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle:json.wind.deg
            })
        }else{
            clearInfo();
            showWarning('Não encotramos esta localização.')
        }
        }else{
            clearInfo();
    }
});
function clearInfo () {
    showWarning();
    document.querySelector('.resultado').style.display = 'none';
}

function showInfo(json){
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}
//21:24