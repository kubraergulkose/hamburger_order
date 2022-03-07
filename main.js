
let stock =  {               // the Stock defined
    meat: 5,
    chicken: 5,
    patatoes: 5,
    coke: 5,
    pickles: 5,
    onion: 5,
    lettuce: 5,
    tomatoes: 5,
    bread: 5,
    packetSauce: 5,
};

function stock_control (prefers) {  // 
    let result=0;
    console.log ("Doing stock control"); //3 sn beklemeden önce yaptığı işi yazsın.
                                        //console.log (stock);
    const myArray = prefers.split(" "); // müşteri malzeme tercihlerini arrayle aldık ve parçaladık
    myArray.forEach(element => { 
        if (stock[element] == 0) { //eğer stokta eleman yoksa işlemi sonlandırsın.
       
            result= 1;
        }
        
    });
    return result;
    
}

function stock_minus (prefers) {         //müşteri tercihlerine göre malzemeleri stoktan düşsün
    const myArray = prefers.split(" ");  // myarray ile tercihleri bir arraye aldık
    myArray.forEach(element => { 
        stock[element] = stock[element] -1; //malzemelerden bir azaltsın.
        
    });
    console.log (stock); //elimizdeki stokları yazsın.
    
}

const input = require('console-read-write');

async function do_a_work(time, work) {               //İş yapıcı ana fonksiyon oluşturdum. time ve work alsın.         
    return new Promise((resolve, reject) => {        //Tüm adımları burdan çağırdım.                                             //Daha düzenli bir kod olmuş oldu.
        setTimeout(() => {                                          
            resolve(work());                            
        }, time);                                    //time adlı değişkenle tüm beklemeleri kontrol edebildim.               
                                                        
    });
}

do_a_work(1000, () => console.log("Welcome.\n"))   //hoşgeldin ve sipariş alma işlemi
    .then(() => {
        return do_a_work(0, () => {
            console.log(`Please choose indgrates: pickles, onion, lettuce, tomatoes\n`);  // \n ile alt satıra geçebiliyoruz. daha okunaklı.
        });
    })
    .then( async () => {
        let customer_prefers = await input.read();  //customer_prefers adlı değişkene aldığımız inputu atayalım.
        if(stock_control(customer_prefers)>0){          //ürünler stokta yoksa                      
            return do_a_work(3000, () => {}).then(() => {       
              console.log("Your order canceled, because there are not enough material.\n"); // 3sn stok kontrolü, ardından sipariş iptal
            }).then(()=> {
                return do_a_work(0, () => {throw "we are sorry\n";}) //sistemden çıkış için throw komutu kullandım.
            })                                                                       
            
        }else{                                                     //eğer ürünler stokta varsa
            return do_a_work(3000, () => {}).then(() => {          //3 sn sonra stok okey desin
                console.log("Stock is okey."); 
                stock_minus(customer_prefers);                     //stoktan seçtiklerimizi düşssün.
              })
        }
    })
    .then(async() => {
        console.log(`\nChicken or meatball?\n`);          //köfte mi tavuk mu sorsun?    
        let customer_meat_prefers =await input.read();    //et tercihini aldık.
        return do_a_work(1000, async() => {               //1 sn sonra et tercihini söylesin.
            console.log(`\nYour prefer is ${customer_meat_prefers}`);
            let delay_cook=0;                              //pişme derecesşne göre gecikme değişkeni
            if (customer_meat_prefers=='meatball') {       //eğer köfteyse
                stock_minus ("meat patatoes coke bread packetSauce") ;  //stoklardan eti ve sabit malzemleri düşsün.
                console.log(`\nHow do you get your meat cooked? undercooked/mediumcooked/overcooked \n`); //pişme derecesi?
                let customer_degree_prefer = await input.read(); //pişme derecesini consoledan alalım
                if (customer_degree_prefer=='undercooked') {         //az pişmişse          
                      delay_cook=2000;                               //bekleme süresi 2 sn olsun
                }
                else if (customer_degree_prefer=='mediumcooked') {   //orta pişmişse     
                      delay_cook=3000;                               //bekleme süresi 3 sn olsun
                }
                else if (customer_degree_prefer=='overcooked') {     //çok pişmisse
                    delay_cook=4000;                                 //bekleme süresi 4 sn olsun
                }
            }

            else {                                                   // et seçimi tavuksa
                stock_minus ("chicken patatoes coke bread packetSauce") ; //stoktan tavuk ve sabit malzemeleri çıkarsın.
                delay_cook=3000;                                          //bekleme süresi 3 sn olsun

            }

            do_a_work(5000, () => {}).then(() => {                  //köfte ve tavuk pişmesini beklemeden
                console.log("Patatoes ready\n");         //patatesleri kızartsın
              });

            do_a_work(2000, () => {}).then(() => {                  //köfte ve tavuk pişirmesini beklemeden  
                console.log("Drink is ready\n");                      //içecekleri hazırlasın
              });
                return do_a_work(delay_cook, () => {}).then(() => {   //delay_cook değerini atayarak et pişme süresini belirleyeceğiz.
                    console.log(`Meat is ready\n`); 
                  }) .then(() => {
                    return do_a_work(2000, () => {
                        console.log(`Meatball Hamburger is ready`); 
                    });
                });

            
            




        });                                              
    }).then(() => {
        return do_a_work(1000, () => {
            console.log("The sauce is ready\n"); 
        });
    })
  
    .then(() => {
        return do_a_work(1000, () => {
            console.log("Your hamburger is ready. Bon appétit\n"); 
        });
    })
    
    
    .catch((err) => console.log(err))                   //catch ile hata yakalayalım.
    .finally(()=> {  
            console.log("Thank you for choose us..\n"); 
    });  
  