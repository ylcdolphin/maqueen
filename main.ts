function control2 () {
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 30)
        preE = 0
        cuE = cuE + preE
    } else {
        PID()
    }
}
function PID () {
    E = maqueen.readPatrol(maqueen.Patrol.PatrolLeft) - maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    cuE = cuE + E
    dE = E - preE
    preE = E
    VD = P * E + I * cuE + D * dE
    VL = V + VD
    VR = V - VD
    activate()
}
IR.IR_callbackUser(function (message) {
    if (message == 1) {
        Mode = 1
    } else {
        Mode = 0
    }
})
function activate () {
    if (VL < 0) {
        maqueen.motorStop(maqueen.Motors.M1)
    } else if (VL > 255) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
    } else {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, VL)
    }
    if (VR < 0) {
        maqueen.motorStop(maqueen.Motors.M2)
    } else if (VL > 255) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
    } else {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, VR)
    }
}
let VR = 0
let VL = 0
let VD = 0
let dE = 0
let E = 0
let Mode = 0
let preE = 0
let cuE = 0
let D = 0
let I = 0
let P = 0
let V = 0
V = 110
P = 90
I = 0
D = 50
cuE = 0
preE = 0
Mode = 0
while (Mode == 0) {
    basic.pause(100)
}
while (Mode == 1) {
    control2()
}
maqueen.motorStop(maqueen.Motors.All)
