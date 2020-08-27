Control
    Loop 
        do

    Wait (hourglass)
        seconds

    Repeat
        time    [5]
        Commands

Lights
    LED (led)
        pin#    [7]
        status  [on/off]

Sounds
    TONE (speaker)
        pin#    [6]
        freq    [440]

    NO TONE (no speaker)
        pin#    [6]

Motors
    SERVO (servo)
        pin#    [9]
        angle   [180]