Control
    DO WHILE ? vs until
        Commands
        test    [pick_a_test]

Tests
    and / or  ? stack
    equals
    is empty
    isInt

Math Operators
    operations [+,-,*,/,%]  ? add modulus to 
    random
        min [0]
        max [10]
    map
        value
        from    [0]
                [1023]
        to      [0]
                [255]

Communication
    SERIAL PRINTLN  [message]
    glue <
    glue (

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

Sensors
    BUTTON (button?)
        pin#    [2]
        status  [pressed/unpressed]
    ULTRASONIC (sonar)
        trigger #   [3]
        echo #      [4]