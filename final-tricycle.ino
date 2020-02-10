#include <SoftwareSerial.h> //library pour utiliser RX TX
#include <LiquidCrystal.h> //ajout de la bibliotheque pour écran LCD

SoftwareSerial ScannerSerial(11, 10); // RX Carte, TX Carte
SoftwareSerial Bluetooth(7, 6); // (RX Carte, TX Carte) (Tx Bluetooth, Rx Bluetooth)

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7); //Definir les ports de l'écran LCD

boolean isConnect = false;


void setup()
{
    lcd.begin(16,2);//Initialisation de l'écran LCD
    Serial.begin(9600);
    Bluetooth.begin(9600);

    pinMode(11, INPUT); //RX on arduino
    pinMode(10, OUTPUT); //TX on arduino
    pinMode(7, INPUT); //RX on arduino
    pinMode(6, OUTPUT); //TX on arduino    

}

void loop()
{
  
   if (Bluetooth.available()&& isConnect == false) {
      lcd.clear();
      lcd.print("Connexion");
      lcd.setCursor(0, 1);
      lcd.print("Reussie");
      
      //Message de bienvenue à l'allumage de l'écran LCD
      lcd.print("Bienvenue, sur");
      lcd.setCursor(0, 1);//la prochaine ligne sera à la ligne du dessous
      lcd.print("Tricycle :)");

      isConnect = true;
    }
  else {
      lcd.clear();
      lcd.print("Connexion");
      lcd.setCursor(0, 1);
      lcd.print("Non Etablie");
    }


    
  while (Bluetooth.available()) {
    String barcode = char(ScannerSerial.read()); //Récupération du code barre
    Serial.println(barcode);
    Bluetooth.write(barcode); //Envoi du code barre au module bluetooth
    if (barcode != ''){
      lcd.print("Produit Scanné");
    }
  }
}
