Control
    LOOP 
        do

    WAIT (hourglass)
        seconds

    REPEAT
        time    [5]
        Commands
    
    DELAY
        microseconds    [1000]
    
    PROGRAM
        SETUP
        LOOP
    
    IF
        test
        then
    
    IF/ELSE
        test
        then
        else
    
    WHILE
        test
        Commands
    
    DO WHILE
        Commands
        test    [pick_a_test]

Tests
    comparisons [<,==,!=,>]
    and / or
    not
    equals
    is empty
    isInt

Math Operators
    operations [+,-,*,/,%]
    abs
    power
        base
        exponent
    sqrt
    sin
    cos
    tan
    random
        min [0]
        max [10]
    map
        value
        from    [0]
                [1023]
        to      [0]
                [255]

Variables / Constants
    int
    set interger variable
        variable    [int_var_name]
        value       [1]
    int_var_name
    millis
    set digital variable
        variable    [dig_var_name]
        value       [HIGH]
    HIGH
    LOW
    TRUE
    FALSE
    set decimal variable
        variable    [dec_var_name]
        value       [3.1415927]
    dec_var_name
    PI
    set character variable
        variable    [char_var_name]
        value       ['A']
    char_var_name
    A
    String name
    set String variable
        variable    [str_var_name]
        value       [message]  #print?
    str_var_name
    message

Communication
    SERIAL PRINTLN  [message]
    glue <
    glue (

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

Sensors
    BUTTON (button?)
        pin#    [2]
        status  [pressed/unpressed]
    ULTRASONIC (sonar)
        trigger #   [3]
        echo #      [4]