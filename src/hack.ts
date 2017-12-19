const socket = io.connect('http://localhost:3000');

declare const chrome: any;

const validValues: any = {
    0 : [
        { 'Id' : 'Fast bredband', Aliases: ['Fast bredband', 'Fastbredband' ]}, 
        { 'Id' : 'Fast telefoni',  Aliases: ['Fast telefoni', 'Fasttelefoni' ]}, 
        { 'Id' : 'Tv', Aliases: ['Tv']}, 
        { 'Id' : 'Mobil telefoni', Aliases: ['Mobiltelefoni', 'Mobil telefoni']},
        { 'Id' : 'E-post', Aliases: ['E-post', 'epost']},
        { 'Id' : 'Mobilt bredband', Aliases: ['Mobiltbredband', 'Mobilt bredband']}
    ],
    1 : [
        { 'Id' : 'Ingen uppkoppling', Aliases: ['Ingen uppkoppling', 'Ingenuppkoppling' ]}, 
        { 'Id' : 'Tappar uppkoppling', Aliases: ['Tappar uppkoppling', 'Tapparuppkoppling' ]}, 
        { 'Id' : 'Långsamt bredband', Aliases: ['Långsamt bredband', 'Långsamtbredband', 'Langsamt bredband', 'Langsamtbredband' ]}
    ]
};

const step0Elements: any = {
    'Fast bredband' : '[href="/privat/support/felanmalan/bredband"]',
    'Fast telefoni' : '[href="/privat/support/felanmalan/telefoni]',
    'Tv' : '[href="/privat/support/felanmalan/tv]',
    'Mobil telefoni' : '[href="/privat/support/felanmalan/mobiltelefoni]',
    'E-post' : '[href="/privat/support/felanmalan/e-post]',
    'Mobilt bredband' : '[href="/privat/support/felanmalan/mobiltbredband]'
};

const step1Elements: any = {
    'Ingen uppkoppling' : '[src="/.resources/support-troubleshooting/resources/images/multi-choice/ingen-uppkoppling.png"]',
    'Tappar uppkoppling' : '[src="/.resources/support-troubleshooting/resources/images/multi-choice/tappar-uppkoppling.png"]',
    'Långsamt bredband' : '[src="/.resources/support-troubleshooting/resources/images/multi-choice/langsamt-bredband.png"]',
};

const checkIfValid = (input: string, currentStep: number) : [boolean, string] => {
    
    let found: { Id: string } = { Id: '' };
    
    validValues[currentStep].forEach((category: any) => {
        
        input = input.toLowerCase();
        
        category.Aliases.forEach((alias: string) => {
            if(input.indexOf(alias.toLowerCase()) !== -1) {
                found = { Id: category.Id };
            }            
        });
        
        let splittedInput = input.split(' ');
        
        splittedInput.forEach((word: string) => {
            category.Aliases.forEach((alias: string) => {
                if(word.indexOf(alias.toLowerCase()) !== -1) {
                    found = { Id: category.Id };
                }                
            });
        })
    });
    
    if(found.Id !== '') {
        return [true, found.Id];
    }
    
    return [false, ''];
}

if(window.location.pathname === '/privat/support/felanmalan/' || window.location.pathname === '/privat/support/felanmalan') {
   
    socket.emit('init', {});
    
    socket.on('step_0', function (data: any) {
        
        let found: [boolean, string] = checkIfValid(data.text, 0);
        
        if(found[0] === true) {
            socket.emit('step_update', {});
            document.querySelector(step0Elements[found[1]]).click();
        }
    });
}

if(window.location.pathname === '/privat/support/felanmalan/bredband' || window.location.pathname === '/privat/support/felanmalan/bredband/') {
    
    socket.on('step_1', function (data: any) {
        
        let found: [boolean, string] = checkIfValid(data.text, 1);
        
        if(found[0] === true) {
            socket.emit('step_update', {});
            
            document.querySelector(step1Elements[found[1]]).parentNode.click();
        }
    });
    
}
