
# **BEEBEA Documents**

## Hardware

- [x] NodeMCU - ESP8266 - [Datasheet](https://components101.com/development-boards/nodemcu-esp8266-pinout-features-and-datasheet)
- [x] 8 x 8 LED Matrix - WS2812B-64 - [NeoPixel LED Matrix](https://www.sparkfun.com/products/retired/12662)
- [ ] 3.7v 3000mh Lithium Battery - [Amazon](https://www.amazon.com/3000mAh-103665-Lithium-Replacement-Bluetooth/dp/B091Y3TW9F/ref=sr_1_7?keywords=3.7v%2b3000mah%2bbattery&qid=1648569307&sr=8-7&th=1)
- [ ] Switching dual power charger with load and batter charging - [Amazon](https://smile.amazon.com/Mudder-Pieces-Charging-Battery-Protection/dp/B087Q915LF/?_encoding=UTF8&pd_rd_w=4Z4fU&pf_rd_p=bb56b41f-df49-41e1-be0a-6aa8b5f2799c&pf_rd_r=EECAHA0BQM81P1Z66KKD&pd_rd_r=1864a4ee-4007-4e6c-be51-417aa7c7649d&pd_rd_wg=f20mC&ref_=pd_gw_ci_mcx_mr_hp_atf_m)
- [ ] 5v Power supply with USB b

## Software

### Hardware Programming

 [Arduino IDE](https://www.arduino.cc/en/software) OR  [PlatformIO](https://platformio.org/)
  Used to program the NodeMCU MCB
  
## Arduino Libraries -

- [FastLED](https://github.com/FastLED/FastLED) - Used to control the LED Matrix at the lowest level
- [LEDMatrix](https://github.com/DblBee/RGBLEDS) - Used to control the LED Matrix abstracted from FastLED
- [LEDText](https://github.com/DblBee/BeeBea-Docs) - Used to scroll text on the LED Matrix abstracted from FastLED

**Description**
The hardware has four display modes.

 1. The first mode is the BeeBea genome color display (Default).  
 2. The second mode is the BeeBea genome animation display (Animation).  
 3. The third mode is text scrolling (Text).
 4. Interaction with other BB

An Arduino sketch will be created to handle the following features:

- WIFI Connectivity
- API Calls / JSON processing
- LED Matrix display and execution

Notes:
Each bb is unique based on the 68 led genome assigned 64  + 4 animation

They must know where they are at all times - Location based on ip, gps, wifi???

They should die if left off for a period of time - They should have a life span that should expire / renew. It should renew the lifespan every time it checks into the base

Could be revived by some type of process - kind of like digital CPR but there should be some type of degradation in the genome from being brought back to life

They should change behavior when around other bb - After knowing where it is at all times, it should be aware there is another one near or able to connect because they are on the same network. This should all happen on the server.

Should they auto Sire if they meet once twice or so?

Links for research

<https://github.com/sausheong/ga>
<https://github.com/FastLED/FastLED>
<https://learn.adafruit.com/fancyled-library-for-circuitpython/palettes>
